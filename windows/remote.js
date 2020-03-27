require("dotenv").config();
const fs = require("fs");
const { exec } = require("child_process");

const chalk = require("chalk");
const inquirer = require("inquirer");
const Github = require("github-api");

const path = process.env.DIRECTORY;
const project_name = process.argv[2];
const _dir = path + "\\" + project_name;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_PASSWORD;

const create = async () => {
  let repository_description;
  let repository_homepage;
  let repository_private;
  let auto_init;
  let gitignore_template;

  const questions = [
    {
      type: "input",
      name: "repository_description",
      message: "Please type the repository description:"
    },
    {
      type: "input",
      name: "repository_homepage",
      message: "Please type a homepage url or leave it blank:"
    },
    {
      type: "confirm",
      name: "repository_private",
      message: "Is it a private repository?"
    },
    {
      type: "list",
      name: "gitignore_template",
      message: "Do you want to add a gitignore template?",
      choices: ["Node", "Python", "Laravel", "None"]
    }
  ];

  await inquirer
    .prompt(questions)
    .then(
      ({
        repository_description,
        repository_homepage,
        repository_private,
        gitignore_template
      }) => {
        repository_description;
        repository_homepage;
        repository_private;
        gitignore_template;
      }
    );

  try {
    const client = new Github({
      username: username,
      password: password
    });
    const me = client.getUser(username);

    await me.createRepo({
      name: project_name,
      description: repository_description,
      homepage: repository_homepage,
      private: repository_private,
      auto_init: true,
      gitignore_template: gitignore_template
    });

    console.log(chalk.greenBright("Successfully created the repository!"));

    console.log(chalk.redBright("Adding it to GitHub..."));

    if (!fs.existsSync(path + "\\" + project_name)) {
      fs.mkdirSync(path + "\\" + project_name);
      console.log(
        chalk.green("Successfully created project folder in: " + path)
      );
    }

    process.chdir(_dir);

    exec("git init");
    exec("git status");
    exec("git add .");
    exec("git status");
    exec(`git commit -m "initial commit"`);
    exec(`git status`);
    exec(
      `git remote add origin https://github.com/${username}/${project_name}.git`
    );
    exec(`git push -u origin master`);
    console.log(chalk.whiteBright(project_name + " created successfully."));
    exec("code .");
  } catch (error) {
    console.error(error.message);
  }
};

create();
