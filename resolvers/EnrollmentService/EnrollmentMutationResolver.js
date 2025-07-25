const grpc = require("@grpc/grpc-js");
const { isDataExists } = require("../../utils/SQLHelperFunctions");
const { v4: uuid } = require("uuid");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewLessonInTerm = async (call, callback) => {
  try {
    const {
      Term_id,
      Lesson_id,
      College_id,
      Class_id,
      Teacher_id,
      Lesson_time,
    } = call.request;

    const isTermIdValid = await isDataExists("Term", "id", Term_id);
    if (!isTermIdValid) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Term not found",
      });
    }

    const isCollegeIdValid = await isDataExists("College", "id", College_id);
    if (!isCollegeIdValid) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "College not found",
      });
    }

    const isLessonIdValid = await isDataExists("Lesson", "id", Lesson_id);
    if (!isLessonIdValid) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Lesson not found",
      });
    }

    const isClassIdValid = await isDataExists("Class", "id", Class_id);
    if (!isClassIdValid) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Class not found",
      });
    }

    const isTeacherIdValid = await isDataExists("Teacher", "id", Teacher_id);
    if (!isTeacherIdValid) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Teacher not found",
      });
    }
    const [teachersInCollege] = await dbConnection.query(
      `SELECT id FROM Teacher WHERE college_id=?`,
      [College_id]
    );
    const [lessonsInCollege] = await dbConnection.query(
      `SELECT id FROM Lesson WHERE college_id=?`,
      [College_id]
    );
    const [classesInCollege] = await dbConnection.query(
      `SELECT id FROM Class WHERE college_id=?`,
      [College_id]
    );
    if (!lessonsInCollege.some((lesson) => lesson.id === Lesson_id)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Lesson not found in the specified college",
      });
    }
    if (!classesInCollege.some((cls) => cls.id === Class_id)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Class not found in the specified college",
      });
    }
    if (!teachersInCollege.some((teacher) => teacher.id === Teacher_id)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Teacher not found in the specified college",
      });
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!timeRegex.test(Lesson_time)) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Lesson_time must be in the format HH:MM:SS (e.g., 14:30:00)",
      });
    }
    const [classLessonTimesResult] = await dbConnection.query(
      `SELECT lesson_time AS lessonTime FROM
      Lesson_in_term WHERE class_id=? AND term_id=?`,
      [Class_id, Term_id]
    );
    if (
      classLessonTimesResult.some((lesson) => lesson.lessonTime === Lesson_time)
    ) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: "Another Lesson Exists In this Time",
      });
    }

    const [classCapacityResult] = await dbConnection.query(
      `SELECT capacity FROM Class WHERE id=?`,
      [Class_id]
    );
    const classCapacity = classCapacityResult[0]?.capacity;

    const lessonInTermId = uuid();
    await dbConnection.query(
      `INSERT INTO Lesson_in_term(id,term_id,lesson_id,college_id,class_id,teacher_id,lesson_time,register_count,empty_capacity)
       VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        lessonInTermId,
        Term_id,
        Lesson_id,
        College_id,
        Class_id,
        Teacher_id,
        Lesson_time,
        classCapacity,
        classCapacity,
      ]
    );
    return callback(null, {
      Lesson_in_term_id: lessonInTermId,
      Message: "Lesson in term successfully added.",
      Start_time: Lesson_time,
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};
const AddNewLessonTermForStudent = async (call, callback) => {
  const transactionConnection = await dbConnection.getConnection();
  try {
    const { Lesson_in_term_id, Student_id } = call.request;
    await transactionConnection.beginTransaction();

    const isStudentExists = await isDataExists("student", "id", Student_id);
    if (!isStudentExists) {
      await transactionConnection.rollback();
      transactionConnection.release();
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Student Doesnt Exists",
      });
    }

    const isLessonExists = await isDataExists(
      "lesson_in_term",
      "id",
      Lesson_in_term_id
    );
    if (!isLessonExists) {
      await transactionConnection.rollback();
      transactionConnection.release();
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Lesson In Selected Term Doesnt Exists",
      });
    }

    const [studentInfoRes] = await transactionConnection.query(
      "SELECT college_id FROM student WHERE id=?",
      [Student_id]
    );

    const [selectedLessonInfo] = await transactionConnection.query(
      "SELECT college_id AS lessonCollegeId, lesson_time, empty_capacity AS lessonEmptyCapacity FROM lesson_in_term WHERE id=?",
      [Lesson_in_term_id]
    );

    const { lessonCollegeId, lesson_time, lessonEmptyCapacity } =
      selectedLessonInfo[0];
    const studentCollegeId = studentInfoRes[0]?.college_id;

    if (lessonCollegeId !== studentCollegeId) {
      await transactionConnection.rollback();
      transactionConnection.release();
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Student CollegeId And Lesson CollegeId Is Incompatible",
      });
    }

    if (lessonEmptyCapacity === 0) {
      await transactionConnection.rollback();
      transactionConnection.release();
      return callback({
        code: grpc.status.UNAVAILABLE,
        message: "Class Is Full",
      });
    }
    const [duplicateCheck] = await transactionConnection.query(
      "SELECT 1 FROM lesson_term_students WHERE lesson_term_id = ? AND student_id = ?",
      [Lesson_in_term_id, Student_id]
    );
    if (duplicateCheck.length > 0) {
      await transactionConnection.rollback();
      transactionConnection.release();
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: "Student Already Enrolled In This Lesson",
      });
    }

    await transactionConnection.query(
      "UPDATE lesson_in_term SET empty_capacity=? WHERE id=?",
      [lessonEmptyCapacity - 1, Lesson_in_term_id]
    );

    await transactionConnection.query(
      "INSERT INTO lesson_term_students (lesson_term_id, student_id, status, grade) VALUES (?, ?, ?, ?)",
      [Lesson_in_term_id, Student_id, "notCompleted", 0]
    );

    await transactionConnection.commit();
    transactionConnection.release();

    return callback(null, {
      Message: `Lesson SucessFully Added For Student With Id = ${Student_id}`,
    });
  } catch (error) {
    await transactionConnection.rollback();
    transactionConnection.release();
    return callback({
      code: grpc.status.INTERNAL,
      message: error.message || "Internal error",
    });
  }
};

module.exports = {
  AddNewLessonInTerm,
  AddNewLessonTermForStudent,
};
