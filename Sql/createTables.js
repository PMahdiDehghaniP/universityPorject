const createStudentTable = `CREATE TABLE IF NOT EXISTS Student(
    id INT NOT NULL,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    age TINYINT NOT NULL,
    phonenumber VARCHAR(16) NOT NULL,
    code_meli INT NOT NULL,
    college_id INT NOT NULL,
    gpa TINYINT NOT NULL,
    PRIMARY KEY(id)
)`;

const createClassTable = `CREATE TABLE IF NOT EXISTS Class(
    id SERIAL PRIMARY KEY,
    college_id INT NOT NULL,
    capacity TINYINT NOT NULL
)`;

const createLessonTable = `CREATE TABLE IF NOT EXISTS Lesson(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_units TINYINT NOT NULL,
    college_id SMALLINT NOT NULL)
`;
const createTeacherTable = `CREATE TABLE IF NOT EXISTS Teacher (
    id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL, college_id SMALLINT NOT NULL
)`;

const createCollegeTable = `CREATE TABLE IF NOT EXISTS College (
        id SERIAL PRIMARY KEY,
    number_of_classes TINYINT NOT NULL,
    number_of_floors TINYINT NOT NULL
)`;

const createTermTable = `CREATE TABLE IF NOT EXISTS Term (
    id CHAR(36) NOT NULL PRIMARY KEY,
    year DATE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    season ENUM('spring', 'summer', 'autumn', 'winter') NOT NULL,
    status ENUM("passed","active") NOT NULL
)`;

const ModelsTables = [
  createStudentTable,
  createClassTable,
  createLessonTable,
  createTeacherTable,
  createCollegeTable,
  createTermTable,
];

module.exports = ModelsTables;
