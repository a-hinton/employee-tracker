const inquirer = require('inquirer');

// ================================FILE REQUIREMENTS===================================
const {

} = require('./prompts2')
// ================================FILE REQUIREMENTS===================================


// ================================GETTER FUNCTIONS====================================
async function getDepts(connection) {
    const SQL_STATEMENT = `SELECT *
    FROM department;`;
  
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      return rows;
    } catch (error) {
      console.log(error);
    }
}

async function getManagers(connection) {
    const SQL_STATEMENT = `SELECT * FROM employee WHERE is_manager = true;`;
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      return rows;
    } catch (error) {
      console.log(error);
    }
}

async function getRoles(connection) {
    const SQL_STATEMENT = `SELECT *
    FROM role;`;
  
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      return rows;
    } catch (error) {
      console.log(error);
    }
}

async function viewDepts(connection) {
    const SQL_STATEMENT = `SELECT *
    FROM department;`;
  
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      console.table(rows);
    } catch (error) {
      console.log(error);
    }
}

async function viewEmployees(connection) {
    const SQL_STATEMENT = `SELECT *
    FROM employee;`;
  
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      console.table(rows);
    } catch (error) {
      console.log(error);
    }
}

async function viewRoles(connection) {
    const SQL_STATEMENT = `SELECT *
    FROM role;`;
  
    try {
      const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
      console.table(rows);
    } catch (error) {
      console.log(error);
    }
}
// ================================GETTER FUNCTIONS====================================


// ================================SETTER FUNCTIONS====================================
async function addDepartment(connection, name) {
    const SQL_STATEMENT = `INSERT INTO department
    (name) VALUES (?);`;

    try {
        const [rows, fields] = await connection
            .promise()
            .query(SQL_STATEMENT, [
              name
            ]);
            console.table(`New department added.`);
    } catch (error) {
        console.log(error);
    }
}

async function addEmployee(connection, firstName, lastName, role, salary, managerId, isManager) {
    const SQL_STATEMENT = `INSERT INTO employee
    (first_name, last_name, role_id, salary, manager_id, is_manager)
    VALUES (?, ?, ?, ?, ?, ?);`;

    try {
        const [rows, fields] = await connection
            .promise()
            .query(SQL_STATEMENT, [
                firstName, lastName, role, salary, managerId, isManager
            ]);
            console.table(`New employee added!`);
    } catch (error) {
        console.log(error);
    }
}

async function addRole(connection, title, department_id) {
    const SQL_STATEMENT = `INSERT INTO role
    (title, department_id) VALUES (?, ?);`;

    try {
        const [rows, fields] = await connection
            .promise()
            .query(SQL_STATEMENT, [
                title,
                department_id
            ]);
            console.table(`New job title added.`);
    } catch (error) {
        console.log(error);
    }
}
// ================================SETTER FUNCTIONS====================================


// ====================================EXPORTS=========================================
module.exports = {
    getDepts,
    getManagers,
    getRoles,
    viewDepts,
    viewEmployees,
    viewRoles,
    addDepartment,
    addEmployee,
    addRole
}

// ====================================EXPORTS=========================================