const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const render = require("./lib/htmlRenderer");


let teamMembers = [];

const firstQuestion = {
    type: 'list',
    message: 'Do you wish to add a new member or generate a team?',
    name: 'Add',
    choices: ['Add new Member', 'Generate Team'],
};

const fileNameCreate = {
    type: 'input',
    message: 'Please enter a file name for your team',
    name: 'fileName',
};

const Questions = {
    Manager: [
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'fileName',
        },
        {
            type: 'input',
            message: 'Please enter your id',
            name: 'id',
        },
        {
            type: 'input',
            message: 'Please enter your email address',
            name: 'email',
        },
        {
            type: 'input',
            message: 'Please enter your office number',
            name: 'officeNumber',
        },
    ],
    Engineer: [
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Please enter your id',
            name: 'id',
        },
        {
            type: 'input',
            message: 'Enter your email address',
            name: 'email',
        },
        {
            type: 'input',
            message: 'Enter your Github',
            name: 'github',
        },
    ],
    Intern: [
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Please enter your id',
            name: 'id',
        },
        {
            type: 'input',
            message: 'Enter your email address',
            name: 'email',
        },
        {
            type: 'input',
            message: 'Enter your school name',
            name: 'school',
        },
    ],
};

const startApp = () => {
    selectRole();
};

const addOrFinish = () => {
    inquirer.prompt(firstQuiestion).then((answer) => {
        if (answer.Add === 'Add Member') {
            selectRole();
        } else {
            getFileName();
        }
    });
};

const selectRole = () => {
    inquirer.prompt(questions).then((answer) => {
    roleQuestions(Questions[answer.role], answer.role);
    });
};
const roleQuestions = (questions, role) => {
    inquirer.prompt(questions).then((answer) => {
        let member = {};
        if (role === 'Manager'){
            member = new Manager(
                answer.name,
                answer.id,
                answer.email,
                answer.officeNumber
            );
        } else if (role === 'Engineer') {
            member = new Engineer(
                answer.name,
                answer.id,
                answer.email,
                answer.github,
            );
        } else if (role === 'Intern') {
            member = new Intern(
                answer.name,
                answer.id,
                answer.email,
                answer.school,
            );
        }
        teamMembers.push(member);
        addOrFinish();
    });
};

const generateTeam = (fileName) => {
    const outputPath = path.join(OUTPUT_DIR, fileName + ".html");
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), (err) => {
        if (err) {
            console.log(err);
            getFileName();
        }
    });
};

startApp();

    
        









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
