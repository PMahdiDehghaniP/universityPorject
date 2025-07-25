const preLesson_LessonTable = ` CREATE TABLE IF NOT EXISTS preLesson_Lesson(
    lesson_id CHAR(36) NOT NULL,
    prerequisite_id CHAR(36) NOT NULL
)`;
const lessonInTermTable = `CREATE TABLE IF  NOT EXISTS Lesson_in_term(
    id CHAR(36) NOT NULL PRIMARY KEY,
    term_id CHAR(36) NOT NULL,
    lesson_id CHAR(36) NOT NULL,
    teacher_id CHAR(36) NOT NULL,
    college_id CHAR(36) NOT NULL,
    lesson_time TIME NOT NULL,
    class_id CHAR(36) NOT NULL,
    registered_count TINYINT NOT NULL,
    empty_capacity TINYINT NOT NULL
)`;

const lessonTermStudentsTable = `CREATE TABLE IF NOT EXISTS Lesson_Term_Students(
    lesson_term_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    status ENUM('passed', 'failed', 'Deleted', 'notCompleted') NOT NULL,
    grade TINYINT NOT NULL
)`;

const joinTables = [
  preLesson_LessonTable,
  lessonInTermTable,
  lessonTermStudentsTable,
];

module.exports = joinTables;
