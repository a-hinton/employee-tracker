// Import the mysql package
const mysql = require('mysql2');

// Import Constants Choice Variables
const [
    ADD_EMPLOYEE,
    ADD_DEPT,
    ADD_ROLE,
    VIEW_EMPLOYEES,
    VIEW_ROLES,
    VIEW_DEPTS,
    UPDATE_EMPLOYEE_ROLE,
] = require('./lib/const');

// Import Prompt Functions
const {
    promptChoices, 
    promptEmployeeName,
    promptEmployeeRole,
    promptSalary,
    promptDepartment,
    promptManager
} = require('./lib/prompts');

// Import Query Functions
const  {
    getEmployees,
    getManagers,
    getRoles, 
    getDepartments,
    getEmployeeByManager,
    AddEmployee,
    AddRole,
    AddDepartments
} = require('./lib/queries');


// Connect to the employee_trackerDB database using a localhost connection
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3306,

    // Your MySQL username
    user: 'root',

    // Your MySQL password (leave blank for class demonstration purposes; fill in later)
    password: 'password',

    // Name of database
    database: 'employee_trackerDB',
});

connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    await editEmployeeDB();
    connection.end();
});

async function editEmployeeDB() {

    let answer, employee_name, range;

    answer = await promptChoices();

    switch (answer.name) {
        case ADD_EMPLOYEE:
            AddEmployee(connection);
            break;

        case ADD_DEPT:
            range = await promptRange();
            rangeSearch(connection, range.start, range.end);
            break;

        case ADD_ROLE:
            song = await promptEmployeeRole();
            songSearch(connection,song.title);
            break;

        case VIEW_EMPLOYEES:
            artist = await promptArtistName();
            songAndAlbumSearch(connection, artist.name);
            break;
        
        case VIEW_ROLES:
            artist = await promptArtistName();
            songAndAlbumSearch(connection, artist.name);
            break;
        
        case VIEW_DEPTS:
            artist = await promptArtistName();
            songAndAlbumSearch(connection, artist.name);
            break;
        
        case UPDATE_EMPLOYEE_ROLE:
            artist = await promptArtistName();
            songAndAlbumSearch(connection, artist.name);
            break;
    };
}