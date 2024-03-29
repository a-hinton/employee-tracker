// =========================PACKAGE DEPENDECIES=======================

// Import the mysql package
const mysql = require('mysql2');
// Import Inquirer package
const inquirer = require('inquirer');
// =========================PACKAGE DEPENDECIES=======================

// =========================FILE REQUIREMENTS=========================
const [
    ADD_EMPLOYEE,
    ADD_DEPT,
    ADD_ROLE,
    VIEW_EMPLOYEES,
    VIEW_ROLES,
    VIEW_DEPTS,
    UPDATE_EMPLOYEE_ROLE,
] = require('./const');
// =========================FILE REQUIREMENTS=========================

// =============================FUNCTIONS=============================
async function promptChoices() {
    try {
        let answer = await inquirer.prompt(
                {
                    type: "list",
                    name: "menu",
                    message: "How do you want to edit your Human Resources data?",
                    choices: [
                        ADD_EMPLOYEE,
                        ADD_DEPT,
                        ADD_ROLE,
                        VIEW_EMPLOYEES,
                        VIEW_ROLES,
                        VIEW_DEPTS,
                        UPDATE_EMPLOYEE_ROLE,
                        "EXIT"
                    ]
                }
            );
        return answer;
    } catch (error) {
        return error;
    }
}

async function promptEmployeeName() {
    try {
        let employee_name = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the employee's first name?"
                },

                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee's last name?"
                }
            ]);

        return employee_name;
    } catch (error) {
        return error;
    }
}

async function promptEmployeeRole() {
    try {
        let role_choices = await getRoles();
        console.log(role_choices);

        if (role_choices.length === 0) {
            console.log("There are no employee roles currently defined. Please add a role through the main menu.")
        }
        else {
            let role = await inquirer
                .prompt({
                    type: "rawlist",
                    name: "role",
                    message: "What is the employee's role title?",
                    choices: role_choices
                });

            return role;
        }

    } catch (error) {
        return error;
    }
}

async function promptAddRole() {

    try {
      answer = await inquirer.prompt([
        {
          name: "roleName",
          type: "input",
          message: "What is the name of this role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "department_name",
          type: "list",
          message: "What department is this role in?",
          choices: depNames,
        },
      ]);
    }
    catch (error) {
        return error;
    }
}

async function promptSalary() {
    try {
        let salary = await inquirer
            .prompt({
                type: "input",
                name: "salary",
                message: "What is the employee's salary?",
            });

        return salary;
    }

    catch (error) {
        return error;
    }
}

async function promptDepartment() {
    try {
        let dept_choices = await getDepartments();
        console.log(dept_choices);

        if (dept_choices.length === 0) {
            console.log("There are no departments currently defined. Please add a department through the main menu.")
        }
        else {
            let dept = await inquirer
                .prompt({
                    type: "rawlist",
                    name: "dept",
                    message: "What is the employee's department?",
                    choices: dept_choices
                });

            return dept;
        }

    } catch (error) {
        return error;
    }
}

async function promptManager() {
    try {
        let manager_choices = await getManagers();
        console.log(manager_choices);

        if (manager_choices.length === 0) {
            console.log("There are no managers currently defined. Please add a manager through the main menu.")
        }
        else {
            let manager = await inquirer
                .prompt({
                    type: "rawlist",
                    name: "manager",
                    message: "Who is the employee's manager? Choose 'NULL' if the employee is a manager.",
                    choices: [
                        manager_choices,
                        "NULL"
                    ]
                });

            return manager;
        }

    } catch (error) {
        return error;
    }
}

module.exports = {
    promptChoices,
    promptEmployeeName,
    promptEmployeeRole,
    promptAddRole,
    promptSalary,
    promptDepartment,
    promptManager
};