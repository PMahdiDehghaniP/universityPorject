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

module.exports = {
  AddNewLessonInTerm,
};
