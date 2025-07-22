const preLesson_LessonTable = ` CREATE TABLE IF NOT EXISTS preLesson_Lesson(
    lesson_id INT NOT NULL,
    prerequisite_id INT NOT NULL
)`;
const lessonInTermTable = `CREATE TABLE IF  NOT EXISTS Lesson_in_term(
    lesson_term_id CHAR(36) NOT NULL PRIMARY KEY,
    term_id CHAR(36) NOT NULL,
    lesson_id INT NOT NULL,
    teacher_id INT NOT NULL,
    college_id INT NOT NULL,
    lesson_time  DATETIME NOT NULL,
    class_id INT NOT NULL
)`;

const lessonTermStudentsTable = `CREATE TABLE IF NOT EXISTS Lesson_Term_Students(
    lesson_term_id CHAR(36) NOT NULL PRIMARY KEY,
    student_id INT NOT NULL,
    status ENUM('passed,failed,Deleted') NOT NULL,
    grade TINYINT NOT NULL
)`;

const joinTables = [
  preLesson_LessonTable,
  lessonInTermTable,
  lessonTermStudentsTable,
];

module.exports = joinTables;
