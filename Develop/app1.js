const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];


function askForEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is your name?"

        },
        {
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "list",
            message: "What is your occupation?",
            name: "occupation",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(dealWithAnswers);
}

function dealWithAnswers(answers) {
    var newOccupation;

    switch (answers.occupation) {
        case 'Manager':
            inquirer.prompt([{
                type: "input",
                name: "OfficeNumber",
                message: "What is the Office Number?"
            }]).then(mgmtAnswer => {
                (answers.name, answers.id, answers.email, mgmtAnswer.OfficeNumber);
                buildEmployee(new Manager(answers.name, answers.id, answers.email, mgmtAnswer.OfficeNumber))


            });

            break;
        case 'Engineer':
            inquirer.prompt([{
                type: "input",
                name: "github",
                message: "What is your gitHub account?"
            }]).then(engAnswer => {


                buildEmployee(new Engineer(answers.name, answers.id, answers.email, engAnswer.github));

            })

            break;
        case 'Intern':
            inquirer.prompt([{
                type: "input",
                name: "School",
                message: "What is the School?"
            }]).then(intAnswer => {

                buildEmployee(new Intern(answers.name, answers.id, answers.email, intAnswer.School));

            });

            break
        default:
            break;
    }
}

function saveToFile() {

    const html = render(teamMembers);
    console.log(html);
    fs.writeFile(outputPath, html, err => {
        if (err) throw err;
    });
}

function buildEmployee(employee) {
    teamMembers.push(employee);
    askForMoreEmployee();
}

function askForMoreEmployee() {
    inquirer
        .prompt([{

            type: 'confirm',
            name: 'moreEmployee',
            message: 'Would you like to enter another employee?',
            default: true

        }])
        .then(answers => {
            if (answers.moreEmployee) {
                askForEmployee();
            } else {
                saveToFile();
            }
        });
}

askForEmployee();