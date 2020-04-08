const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");​
const render = require("./lib/htmlRenderer");​​



var teamMembers = [];

//var engineeringTeam = createEngineeringTeam();
//employee.push(engineeringTeam);


//console.log(employee)

//function createEngineeringTeam() {
//function buildTeam() {
//   if (!fs.existsSync(OUTPUT_DIR)) {
//    fs.mkdirSync(OUTPUT_DIR)
// }
// fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
//}
return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Whai is your name?"
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
]).then(answers => {
    let newOccupation;
    switch (answers.occupation) {
        case 'Manager':
            newOccupation = new Manager(answers.name, answers.id, answers.email);
            break;
        case 'Engineer':
            newOccupation = new Engineer(answers.name, answers.id, answers.email);
            break;
        case 'Intern':
            newOccupation = new Intern(answers.name, answers.id, answers.email);
            break
        default:
            break;
    }
    if (answers.occupation === 'Manager') {
        inquirer.prompt([{
            type: "input",
            name: "OfficeNumber",
            message: "What is the Office Number?"
        }]).then(mgmtAnswer => {
            newOccupation.addOfficeNumber(mgmtAnswer.OfficeNumber);
            //console.log(newOccupation)
        })

    }
    if (answers.occupation === 'Engineer') {
        inquirer.prompt([{
            type: "input",
            name: "github",
            message: "What is your gitHub account?"
        }]).then(engAnswer => {
            newOccupation.setGitHub(engAnswer.github);
            //console.log(newOccupation)
        })

    }
    if (answers.occupation === 'Intern') {
        inquirer.prompt([{
            type: "input",
            name: "School",
            message: "What is the School?"
        }]).then(intAnswer => {
            newOccupation.setSchool(intAnswer.School);
            //console.log(newOccupation)
        })
    }
    teamMembers.push(newOccupation);

    //function buildTeam() {
    //   if (!fs.existsSync(OUTPUT_DIR)) {
    //   fs.mkdirSync(OUTPUT_DIR)
    // }
    // fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    //}

    console.log(teamMembers)
        //render(teamMembers);

    //render(teamMembers);

    //buildTeam();
    //return newOccupation

})