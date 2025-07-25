const { dbConnection } = require("../../config/createConnectionToDB");
const grpc = require("@grpc/grpc-js");

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

module.exports = {
  GetLessonsInTerm,
};
