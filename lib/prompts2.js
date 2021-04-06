// ================================PACKAGE DEPENDECIES=================================
// Import Inquirer package
const inquirer = require('inquirer');
// ================================PACKAGE DEPENDECIES=================================


// ================================FILE REQUIREMENTS===================================
const [
    ADD_EMPLOYEE,
    ADD_DEPT,
    ADD_ROLE,
    VIEW_EMPLOYEES,
    VIEW_ROLES,
    VIEW_DEPTS,
    UPDATE_EMPLOYEE
] = require('./const2')

// ================================FILE REQUIREMENTS===================================


// =====================================FUNCTIONS======================================
async function promptChoices() {
    try {
        const answer = await inquirer
            .prompt(
                {
                    type: "list",
                    name: "menu",
                    message: "How do you want to edit your Human Resources Data?",
                    choices: [
                        ADD_EMPLOYEE,
                        ADD_DEPT,
                        ADD_ROLE,
                        VIEW_EMPLOYEES,
                        VIEW_ROLES,
                        VIEW_DEPTS,
                        "EXIT MENU"
                    ]
                }
            );
        return answer;
    } catch (error) {
        return error
    }
}

async function promptEmployeeInfo(roleList, deptList, managerList) {
    try {
        let employee_info = await inquirer
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
                },

                {
                    type: "list",
                    name: "role_id",
                    message: "What position does the employee fill?",
                    choices: roleList.map(({ id, title }) => {
                        return { name: title, value: id }
                    }), 
                },

                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for this position?",
                    validate: checkSalary => {
                        checkSalary = parseInt(checkSalary);
                        if (isNaN(checkSalary)) {

                            console.log('You need to provide a number');
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                },

                {
                    type: "list",
                    name: "department",
                    message: "What department is this position assigned to?",
                    choices: deptList.map(({ id, name }) => {
                        return { name: name, value: id }
                    }),
                },

                {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's assigned manager?",
                    choices: managerList.map(({ id, first_name, last_name }) => {
                        return { name: `${first_name} ${last_name}`, value: id }
                    }),
                },

                {
                    type: "confirm",
                    name: "isManager",
                    message: "Is this employee a manager?",
                },
            ]);

        return employee_info;
    } catch (error) {
        return error;
    }
}

async function promptAddDepartment() {
    try {
        const dept = await inquirer
            .prompt({
                type: "input",
                name: "dept",
                message: "What is the department you want to create?",
            });

        return dept;
    }
    catch (error) {
        return error;
    }
}

async function promptAddRole(deptList) {
    try {
        const role = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of this position?",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "What department is this position in?",
                    choices: deptList.map(({ id, name }) => {
                        return { name: name, value: id }
                    })
                },
            ]);
        return role;
    }
    catch (error) {
        return error;
    }
}

// =====================================FUNCTIONS======================================

// =====================================EXPORTS======================================
module.exports = {
    promptAddDepartment,
    promptAddRole,
    promptChoices,
    promptEmployeeInfo
}

// =====================================EXPORTS======================================