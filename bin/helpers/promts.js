import chalk from 'chalk';
import inquirer from "inquirer";

export const PROMPT_MESSAGE_KEY = '_';

/**
* Prompt for configs
* ==================================================
*/
export async function prompt(prompts = []) {
  prompts = prompts.map(prompt => ({
    ...prompt,
    prefix: prompt.prefix || '↳ ',
    // Standardized indent spaging (keeps chalk styles)
    message: prompt.message.replace(/\n+\s*(\\x1B\[[0-9]+m)*\s*/g, '\n   $1'),
  }))
  console.log(''); // empty line before prompts starts
  const configs = await inquirer.prompt(prompts);
  delete configs[PROMPT_MESSAGE_KEY]; // Message blocks
  return configs;
}



/**
* Manual Algod API setup
* ==================================================
*/
export function promptAlgodConfigs() {
  return prompt([
    {
      prefix: '📡',
      message: `Let's start by connecting to your node's REST API.
        ${ chalk.reset(`Hit any key to start!`) }
      `,
      name: PROMPT_MESSAGE_KEY,
    },
    {
      message: `What HOST is your node's REST API listening to? 
        ${ chalk.reset(`(leave blank for default)`) }
      `,
      name: 'PUBLIC_ALGOD_HOST',
      default: '127.0.0.1',
      type: 'input',
    },
    {
      message: `What PORT is your node's REST API listening to? 
        ${ chalk.reset(`(leave blank for default)`) }
      `,
      name: 'PUBLIC_ALGOD_PORT',
      default: '8080',
      type: 'input',
    },
    {
      message: `What is your ALGOD ADMIN API token?
        ${ chalk.reset( 'You can find your ADMIN token in <your data folder>/algod.admin.token')}
        ${ chalk.reset('Note: Your token will never be exposed to the browser.' )}
      `,
      name: 'SECRET_ALGOD_ADMIN_TOKEN',
      type: 'input',
    },
  ]);
}


/**
* Dashboard configs
* ==================================================
*/
export function promptDashboardConfigs() {
  return prompt([
    {
      prefix: '🖥️ ',
      message: `Now let's configure your dashboard.
        ${ chalk.reset(`Hit any key to continue.`) }
      `,
      name: PROMPT_MESSAGE_KEY,
    },
    {
      message: `The HOST used to access the dashboard?
        ${ chalk.reset(`(leave blank for default)`) }
      `,
      name: 'HOST',
      default: '127.0.0.1',
      type: 'input',
    },
    {
      message: `The PORT used to access the dashboard?
        ${ chalk.reset(`(leave blank for default)`) }
      `,
      name: 'PORT',
      default: '3333',
      type: 'input',
    },
    {
      message: `Allow the dashboard connect to GitHub to check the latest versions?
        ${ chalk.reset(`(leave blank for default)`) }
      `,
      name: 'PUBLIC_CHECK_VERSION_ON_GITHUB',
      type: 'confirm',
      default: true,
    },
  ]);
}

