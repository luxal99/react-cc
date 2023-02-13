const fs = require("fs");
const prompt = require('prompt-sync')();
const processAttr = process.argv[2];
let componentNamesArray = []
const SUFFIX = "Component";
let applicationType = ''
let applicationStyle = ''
let componentName = ''

if (processAttr.includes('--reset')){
    fs.unlink('./settings.txt',()=>{})
    console.log(
        "\x1b[36m%s\x1b[0m",
        `RCC successfully reset`
    );
}else{
    componentNamesArray = processAttr.split("-");
    componentName = componentNamesArray
        .toString()
        .split(",")
        .map((attr) => attr[0].toUpperCase() + attr.substring(1, attr.lenght))
        .join("") + SUFFIX;
    rcc()
}



function createComponentFolder() {
    try {
        fs.mkdirSync("./" + processAttr);
        createComponentStyle();
    } catch (e) {
        if (e.code === "EEXIST") {
            console.log(
                "\x1b[31m",
                `Component ${componentName} already exists!`
            );
        }
    }
}

function createComponentStyle() {
    fs.appendFile(`./${processAttr}/${processAttr}.component${applicationType === 'NEXT' ? '.module' : ''}.${applicationStyle.toLowerCase()}`, ``, () => {
        createComponentProps();
    });
}

function createComponentProps() {
    fs.appendFile(
        `./${processAttr}/${componentName}Props.ts`,
        `export interface ${componentName}Props{}`,
        () => {
            createComponent();
        }
    );
}

function createComponent() {
    fs.appendFile(
        `./${processAttr}/${processAttr}.component.tsx`,
        `
import './${processAttr}.component.module.scss';
import {${componentName}Props} from './${componentName}Props';
export const ${componentName} = ({}:${componentName}Props) => {
return (<div></div>)
}
`,
        () => {
            console.log(
                "\x1b[36m%s\x1b[0m",
                `Component ${componentName} successfully created`
            );
        }
    );
}


function setDefaultSettings() {
    const applicationTypeInput = prompt('Type of project? \n 1.React \n 2.Next \n')
    const styleTypeInput = prompt('Type of style? \n 1.CSS \n 2.SCSS \n 3. SASS \n 4.LESS \n')

    const typeOfProject = applicationTypeInput === '1' ? 'REACT' : 'NEXT'
    const typeOfStyle = getStyleDependsOnInput(styleTypeInput)

    applicationType = typeOfProject
    applicationStyle = typeOfStyle
    fs.appendFile('./settings.txt', `${typeOfProject} ${typeOfStyle}`, () => {
        console.log(
            "\x1b[36m%s\x1b[0m",
            `Settings has been saved to settings.txt`
        );
    })
}

function getStyleDependsOnInput(input) {
    switch (input) {
        case "1":
            return "CSS"
        case "2":
            return "SCSS"
        case "3":
            return "SASS"
        case "4":
            return "LESS"

    }
}

function rcc(){
    fs.readdir('./', (err, files) => {
        const hasSettings = files.includes('settings.txt')
        if (!hasSettings) {
            setDefaultSettings()
            createComponentFolder();
        } else {
            const settings = fs.readFileSync('./settings.txt', 'utf8')
            const splitSettings = settings.split(" ")
            applicationStyle = splitSettings[1]
            applicationType = splitSettings[0]

            createComponentFolder();

        }
    })
}