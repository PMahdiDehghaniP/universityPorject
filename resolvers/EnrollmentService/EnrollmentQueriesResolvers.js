const { dbConnection } = require("../../config/createConnectionToDB");
const grpc = require("@grpc/grpc-js");
const { isDataExists } = require("../../utils/SQLHelperFunctions");

const GetLessonsInTerm = async (call, callback) => {
  try {
    const { Term_id, Lesson_id, Class_id, Teacher_id, College_id } =
      call.request;
    let whereClauses = [`college.id = ?`, `term.id = ?`];
    let values = [College_id, Term_id];
    if (Teacher_id) {
      whereClauses.push(`teacher.id = ?`);
      values.push(Teacher_id);
    }
    if (Lesson_id) {
      whereClauses.push(`lesson.id = ?`);
      values.push(Lesson_id);
    }
    if (Class_id) {
      whereClauses.push(`class.id = ?`);
      values.push(Class_id);
    }
    const whereSQL = `WHERE ${whereClauses.join(" AND ")}`;
    const getLessonsInTermQuery = `
    SELECT 
      college.name AS collegeName, 
      lesson.name AS lessonName, 
      lesson.number_of_units AS TedadVahed,
      class.id AS ClassId, 
      LessonInTerm.lesson_time AS lessonTime,
      teacher.name AS teacherName,
      teacher.lastname AS teacherLastname,
      term.year AS termYear,
      term.season AS termSeason
    FROM 
      college 
      JOIN lesson ON lesson.college_id = college.id 
      JOIN lesson_in_term AS LessonInTerm ON LessonInTerm.lesson_id = lesson.id
      JOIN class ON LessonInTerm.class_id = class.id
      JOIN teacher ON LessonInTerm.teacher_id = teacher.id
      JOIN term ON LessonInTerm.term_id = term.id
    ${whereSQL}
  `;
    const [result] = await dbConnection.query(getLessonsInTermQuery, values);

    return callback(null, {
      lessons: result.map((row) => ({
        College_name: row.collegeName,
        Lesson_name: row.lessonName,
        Tedad_vahed: row.TedadVahed,
        Class_id: row.ClassId,
        Lesson_time: row.lessonTime,
        Teacher_name: row.teacherName,
        Teacher_lastname: row.teacherLastname,
        Term_year: row.termYear,
        termSeason: row.termSeason.toUpperCase(),
      })),
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};
const GetStudentLessons = async (call, callback) => {
  const GetStudentLessonsQuery = `
SELECT student.firstname AS studentName , student.lastname AS studentLastname,lesson.name AS lessonName,
lesson.number_of_units AS TedadVahed,lessonInterm.lesson_time AS lessonTime ,studentLessons.grade AS grade,
studentLessons.status AS lessonStatus,teacher.name AS teacherName,teacher.lastname AS teacherLastname,
college.name AS collegeName,term.year AS termYear , term.season AS termSeason
FROM
  student JOIN lesson_term_students AS studentLessons ON student.id=studentLessons.student_id
  JOIN lesson_in_term AS lessonInterm ON lessonInterm.id=studentLessons.lesson_term_id
  JOIN lesson ON lesson.id=lessonInterm.lesson_id
  JOIN teacher ON teacher.id=lessonInterm.teacher_id
  JOIN college ON college.id=lessonInterm.college_id
  JOIN term ON term.id = lessonInterm.term_id
WHERE student.id=?`;
  try {
    const { Student_id } = call.request;
    const isStudentExists = await isDataExists(
      dbConnection,
      "student",
      "id",
      Student_id
    );
    if (!isStudentExists) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Student Not Found!",
      });
    }
    const [studentLessons] = await dbConnection.query(GetStudentLessonsQuery, [
      Student_id,
    ]);

    return callback(null, {
      Student_lessons: studentLessons.map((row) => ({
        Student_name: row.studentName,
        Student_lastname: row.studentLastname,
        Lesson_name: row.lessonName,
        TedadVahed: row.TedadVahed,
        Lesson_time: row.lessonTime,
        Grade: row.grade,
        status: row.lessonStatus.toUpperCase(),
        Teacher_name: row.teacherName,
        Teacher_lastname: row.teacherLastname,
        College_name: row.collegeName,
        Term_year: row.termYear,
        TermSeason: row.termSeason.toUpperCase(),
      })),
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};
module.exports = {
  GetLessonsInTerm,
  GetStudentLessons,
};
