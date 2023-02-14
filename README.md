# RCC - React Create Component (CLI)

Simple React CLI script

### Features

1. Create react component with props and style file
2. Script remember a settings for you projects

### How to install

````bash
git clone https://github.com/luxal99/react-cc.git
````
When you clone a repository then open the source directory and open file

````bash
vi .env
````
and write a content

````env
RCC_PATH=/path/where/you/clone/repository
````
Now, you're almost done just few steps....

If you're using default bash terminal then create file .bash_aliases,
and inside that file put alias f.e

````bash
cd && vi .bash_aliases
````

````bash
alias rcc='node /path/where/you/clone/repository/index.js'
````

If you're using zsh terminal then write alias above to **.zshrc file**

**Now you're ready to use RCC**

### How to use ?

1. Open you react project and write in terminal

````bash
rcc test-component
````

If you run RCC for the first time they will ask you for the type of project and type of style you're using in your project. After first running your settings should be saved and after rcc command script will just create the component.

If you want to change default settings type next command 

````bash 
rcc --reset
````