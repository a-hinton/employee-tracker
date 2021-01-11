// =========================FILE REQUIREMENTS=========================
const {
    promptChoices, 
    promptEmployeeName,
    promptEmployeeRole,
    promptSalary,
    promptDepartment,
    promptManager
} = require('./lib/prompts');
// =========================FILE REQUIREMENTS=========================

// =========================Getter Functions========================
async function getEmployees(connection) {
    const SQL_STATEMENT = `SELECT * FROM employee`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}

async function getManagers(connection) {
    const SQL_STATEMENT = `SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}

async function getManagerID(connection) {
    const SQL_STATEMENT = `SELECT id FROM employee WHERE manager_id IS NULL`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}

async function getRoles(connection) {
    const SQL_STATEMENT = `SELECT title FROM role`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}

async function getDepartments(connection) {
    const SQL_STATEMENT = `SELECT id, name FROM department`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}

async function getEmployeeByManager(connection, manager_id) {
    const SQL_STATEMENT = `SELECT * FROM employee WHERE manager_id = ?`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
        console.table(rows);
    } catch (error) {
        console.log(error);
    }
}
// =========================Getter Functions========================

// =========================Setter Functions========================
async function AddEmployee(connection) {
    // const SQL_STATEMENT = `SELECT * FROM department`;

    try {
        employee = await inquirer
            .prompt([
                {
                    promptEmployeeName()
                },

                {
                    promptEmployeeRole()
                },

                {
                    promptDepartment()
                },

                {
                    promptManager()
                }
            ])
            .then(function(employee) {
                // once prompt finished, insert employee into employee table
                connection.query("INSERT INTO employee SET ?",
                {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    role_id: employee.role,
                    manager_id: employee.manager[0]
                },
                function (err) {
                    if (err) throw err
                    console.table(employee)
                })
            });

        return employee;
    } catch (error) {
        console.log(error);
    }
}

async function AddRole(connection) {
    // const SQL_STATEMENT = `SELECT * FROM department`;

    try {
        role = await inquirer
            .prompt([
                {
                    promptEmployeeRole()
                },

                {
                    promptSalary()
                },

                {
                    promptDepartment()
                }
            ])
            .then(function(role) {
                // once prompt finished, insert employee into employee table
                connection.query("INSERT INTO role SET ?",
                {
                    title: role.role,
                    salary: role.salary,
                    department_id: role.dept[0]
                },
                function (err) {
                    if (err) throw err
                    console.table(role)
                })
            });

        return role;
    } catch (error) {
        console.log(error);
    }
}

async function AddDepartments(connection) {
    // const SQL_STATEMENT = `SELECT * FROM department`;

    try {
        dept = await inquirer
            .prompt([
                {
                    promptDepartment()
                }
            ])
            .then(function(dept) {
                // once prompt finished, insert employee into employee table
                connection.query("INSERT INTO department SET ?",
                {
                    name: dept.dept,
                },
                function (err) {
                    if (err) throw err
                    console.table(department)
                })
            });

        return dept;
    } catch (error) {
        console.log(error);
    }
}
// =========================Setter Functions========================

module.exports = {
    getEmployees,
    getManagers,
    getManagerID,
    getRoles, 
    getDepartments,
    getEmployeeByManager,
    AddEmployee,
    AddRole,
    AddDepartments
};