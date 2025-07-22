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

module.exports = {
  createStudentTable,
};
