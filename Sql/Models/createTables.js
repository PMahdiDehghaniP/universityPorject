const createStudentTable = `CREATE TABLE IF NOT EXISTS Student(
    id CHAR(36) NOT NULL,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    age TINYINT NOT NULL,
    phonenumber VARCHAR(16) NOT NULL UNIQUE,
    code_meli INT NOT NULL UNIQUE,
    college_id CHAR(36) NOT NULL,
    gpa TINYINT NOT NULL,
    PRIMARY KEY(id)
)`;

const createClassTable = `CREATE TABLE IF NOT EXISTS Class(
    id CHAR(36) PRIMARY KEY,
    college_id CHAR(36) NOT NULL,
    capacity TINYINT NOT NULL
)`;

const createLessonTable = `CREATE TABLE IF NOT EXISTS Lesson(
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    number_of_units TINYINT NOT NULL,
    college_id CHAR(36) NOT NULL)
`;
const createTeacherTable = `CREATE TABLE IF NOT EXISTS Teacher (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    college_id CHAR(36) NOT NULL
)`;

const createCollegeTable = `CREATE TABLE IF NOT EXISTS College (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
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
