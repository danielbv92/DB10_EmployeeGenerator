const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const render = require("./lib/htmlRenderer");
const outputPath = path.join(OUTPUT_DIR, "team.html");



let teamMembers = [];
//function CreateManager()
{
    const questions = [
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Please enter your id',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Please enter your email',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter your office number',
            name: 'officeNumber'
        }
    ];
    inquirer.prompt(questions).then(function (response){
        console.log(response);
        const manager = new Manager(response.name,response.id,response.email,response.officeNumber);
        teamMembers.push(manager);
        CreateEmployee();
    });
}

function createEmployee(){
    const createEmployee = [
        {
            type: 'list',
            message: 'Select Type of Employee',
            name: 'employeeType',
            choices: ['Engineer', 'Intern', 'I do not wish to add anymore members.']
        }
    ];
    inquirer.prompt(createEmployee).then(function (response){
        console.log(response);
        if (response.employeeType === "Engineer") {
            CreateEngineer();
        } else if (response.employeeType === "Intern") {
            CreateIntern();
        } else {
            console.log ('Stopped creating employee');
            console.log ('---------');
            render(teamMembers);
        }
    });
}
function CreateEngineer(){
    const questions = [
        {
            type: 'input',
            message: 'What is your Engineers name?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'What is your Engineer id?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is your Engineer github?',
            name: 'github'
        }
    ];
    inquirer.prompt(questions).then(function (res){
        console.log(res);
        const engineer = new Engineer(res.name,res.id,res.email,res.github);
        teamMembers.push(engineer);
        CreateEmployee();
    });
}

function CreateIntern(){
    const questions = [
        {
            type: 'input',
            message: 'What is Your Intern Name?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'What is your id?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is your email?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is your Intern school?',
            name: 'school'
        }
    ];
    inquirer.prompt(questions).then(function(res){
        console.log(res);
        const intern = new Intern(res.name,res.id,res.email,res.school);
        teamMembers.push(intern);
        createEmployee();
    });
}









// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
