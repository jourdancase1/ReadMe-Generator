var inquirer = require("inquirer")
var fs = require("fs")
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
   return inquirer.prompt([
            // title, description, table of contents, installation, usage, license, contributing, test, questions 
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your application?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a brief description about your application.'
            },
            {
                type: 'input',
                name: 'installation',
                message: 'How does a user install the application?'
            },
            {
                type: 'input',
                name: 'usage',
                message: 'How does a user use the application?'
            },
            {
                type: 'list',
                name: 'license',
                message: 'Would you like to use a license?',
                choices: ['ISC', 'MIT', 'None']
            },
            {
                type: 'input',
                name: 'contributors',
                message: 'Who else contributed to this project?'
            },
            {
                type: 'input',
                name: 'tests',
                message: 'Explain how to run any tests for the application:'
            },
            {
                type: 'input',
                name: 'questions',
                message: 'Questions? contact me: (email address)'
            },
            {
                type: 'input',
                name: 'github',
                message: 'Github link:'
            }   
        ]).then(response => {
            return response;
            async (response)=>{
                await fs.writeFileSync("readme.md")
            }
         });
}
            // title, description, table of contents, installation, usage, license, contributing, test, questions 
function generateReadMe(answers) {
    return `
# ${answers.title}
${answers.description}

### Installation
${answers.installation}

### Usage
${answers.usage}
    
### License
${answers.license}

### Contributors
${answers.contributors}

### Tests
${answers.tests}
     
### Questions? Contact me at: 
${answers.questions}
${answers.github}         
`;
  }

async function init(){
    try{
        const answers = await promptUser();

        const text = generateReadMe(answers);

        await writeFileAsync("readme.md", text);
        
        console.log("successfully wrote to readme.md");
    } catch(err) {
        console.log(err);
    }
}

init()





