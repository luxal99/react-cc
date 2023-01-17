
const fs = require("fs");
const processAttr = process.argv[2];
const componentNamesArray = processAttr.split("-");
const SUFFIX = "Component";
const componentName =
    componentNamesArray
        .toString()
        .split(",")
        .map((attr) => attr[0].toUpperCase() + attr.substring(1, attr.lenght))
        .join("") + SUFFIX;

createComponentFolder();
function createComponentFolder() {
    fs.mkdirSync("./" + processAttr);
    createComponentStyle();
}

function createComponentStyle() {
    fs.appendFile(`./${processAttr}/${processAttr}.component.module.scss`, ``, () => {
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
