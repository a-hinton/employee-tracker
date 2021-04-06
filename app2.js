// ================================PACKAGE DEPENDECIES=================================
const mysql = require('mysql2');
const inquirer = require("inquirer");
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
] = require('./lib/const2');

// Import Prompt Functions
const { 
    promptAddDepartment,
    promptAddRole,
    promptChoices,
    promptEmployeeInfo
} = require('./lib/prompts2') ;

// Import Query Functions
const {
    getDepts,
    getManagers,
    getRoles,
    viewDepts,
    viewEmployees,
    viewRoles,
    addDepartment,
    addEmployee,
    addRole,
} = require('./lib/queries2');
// ================================FILE REQUIREMENTS===================================

// ================================APP INITIALIZATION==================================
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',

    database: 'employee_trackerDB',
});

connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    await editHRDB();
    connection.end();
});
// ================================APP INITIALIZATION==================================

// ================================FETCH FUNCTIONS=====================================
async function fetchDepts() {
    const deptList = await getDepts(connection); //queries database for existing departments
    return deptList
}


async function fetchManagers() {
    const managerList = await getManagers(connection); //queries database for existing managers
    return managerList
}

async function fetchRoles() {
    const roleList = await getRoles(connection); //queries database for existing roles
    return roleList
}
// ================================FETCH FUNCTIONS====================================

// =================================EDIT FUNCTION=====================================
async function editHRDB() {

    let deptList, //declare variables used in fetch functions
        managerList,
        roleList;

    const answer = await promptChoices();

    switch (answer.menu) {
        case ADD_DEPT:
            const { dept } = await promptAddDepartment();
            await addDepartment(connection, dept);
        break;

        case ADD_EMPLOYEE:
            deptList = await fetchDepts();
            managerList = await fetchManagers();
            roleList = await fetchRoles()
            const {
                first_name, 
                last_name, 
                role_id, 
                salary,  
                manager, 
                isManager
            } = await promptEmployeeInfo(roleList, deptList, managerList);

            await addEmployee(
                connection, 
                first_name, 
                last_name, 
                role_id, 
                salary, 
                manager, 
                isManager
            )
        break;

        case ADD_ROLE:
            deptList = await fetchDepts();
            const { title, department_id } = await promptAddRole(deptList);
            await addRole(connection, title, department_id)
        break;

        case VIEW_DEPTS:
            await viewDepts(connection);
        break;

        case VIEW_EMPLOYEES:
            await viewEmployees(connection);
        break;

        case VIEW_ROLES:
            await viewRoles(connection);
        break;
    }
}
// =================================EDIT FUNCTION=====================================