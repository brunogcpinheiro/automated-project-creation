require("dotenv").config();
const chalk = require("chalk");
const fs = require("fs");
const { execSync } = require("child_process");

const project_name = process.argv[2];
const path = process.env.DIRECTORY;
const _dir = path + "\\" + project_name;

const create = () => {
  try {
    if (!fs.existsSync(_dir)) {
      fs.mkdirSync(_dir);
      console.log(
        chalk.green("Successfully created project folder in: " + path)
      );
    }

    process.chdir(_dir);
    execSync("git init");
    execSync("echo # " + project_name + " > README.md");
    console.log(chalk.yellowBright(project_name + " created locally."));
    execSync("code .");
  } catch (error) {
    console.log(chalk.red("An error occured!"));
  }
};

create();
