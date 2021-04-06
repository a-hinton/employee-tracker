// Import the mysql package
const mysql = require('mysql2');
var inquirer = require("inquirer");

// Import Constants Choice Variables
const [
    ADD_MANAGER,
    ADD_EMPLOYEE,
    ADD_DEPT,
    ADD_ROLE,
    VIEW_EMPLOYEES,
    VIEW_ROLES,
    VIEW_DEPTS,
    UPDATE_EMPLOYEE_ROLE,
] = require('./lib/const');

// Import Prompt Functions
const {promptChoices, promptEmployeeName, promptEmployeeRole, promptAddRole, promptSalary, promptDepartment, promptManager} = require('./lib/prompts');

// Import Query Functions
const  {getEmployees, getManagers, getRoles,  getDepartments, getEmployeeByManager, AddEmployee, AddRole, AddDepartments} = require('./lib/queries');


// Connect to the employee_trackerDB database using a localhost connection
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
    await editEmployeeDB();
    connection.end();
});

async function editEmployeeDB() {
    console.log("whassup")
    let answer, employee_name, range;

    answer = await promptChoices();
    console.log(answer)
    // AddEmployee(connection);
    switch (answer.menu) {
        case ADD_EMPLOYEE:
            AddEmployee(connection);
            break;

        case ADD_DEPT:
            range = await promptRange();
            AddDepartments(connection);
            break;

        case ADD_ROLE:
            role = await promptAddRole();
            AddRole(connection);
            break;

        // case VIEW_EMPLOYEES:
        //     // artist = await promptArtistName();
        //     songAndAlbumSearch(connection, artist.name);
        //     break;
        
        // case VIEW_ROLES:
        //     // artist = await promptArtistName();
        //     songAndAlbumSearch(connection, artist.name);
        //     break;
        
        // case VIEW_DEPTS:
        //     // artist = await promptArtistName();
        //     songAndAlbumSearch(connection, artist.name);
        //     break;
        
        // case UPDATE_EMPLOYEE_ROLE:
        //     // artist = await promptArtistName();
        //     songAndAlbumSearch(connection, artist.name);
        //     break;
    };
}