
import { PROMPT_MESSAGE_KEY, prompt } from "../helpers/prompt.js";
import chalk from 'chalk';



/**
* Manual/ Auto setups
* ==================================================
*/
export function promptAlgodSetupType() {
  return prompt([
    {
      prefix: '📡',
      message: `Let's start by connecting to your node's REST API.
        ${ chalk.reset(`Hit any key to start!`) }
      `,
      name: PROMPT_MESSAGE_KEY,
    },
    {
      message: `Allow this script to automatically get Algod settings
        from your node data folder and add them to the environment file?
      `,
      type: 'list',
      name: 'auto',
      default: true,
      choices: [
        { value: true, name: `Automatic (get the settings from your data folder)` },
        { value: false, name: `Manual (enter the settings yourself)` },
      ],
    },
  ]);
}

export function promptDashboardSetupType() {
  return prompt([
    {
      prefix: '🖥️ ',
      message: `Now let's configure your dashboard.
        ${ chalk.reset(`Hit any key to continue...`) }
      `,
      name: PROMPT_MESSAGE_KEY,
    },
    {
      message: `Is the default dashboard url good for you (http://127.0.0.1:3333)? 
      `,
      type: 'list',
      name: 'useDefaults',
      default: true,
      choices: [
        { value: true, name: `Yes. Let's go with 127.0.0.1:3333` },
        { value: false, name: `No. I need a custom HOST:PORT configuration` },
      ],
    },
  ]);
}




/**
* Manual Algod API setup
* ==================================================
*/
export function promptAlgodConfigs() {
  return prompt([
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
  ]);
}


/**
* Features flags
* ==================================================
*/
export function promptFeaturesConfigs() {
  return prompt([
    {
      prefix: '📋',
      message: `One last step. Enable your dashboard's features.
        ${ chalk.reset(`Hit any key to continue...`) }
      `,
      name: PROMPT_MESSAGE_KEY,
    },
    {
      message: `Check the latest node versions on Algorand's GITHUB?
        ${ chalk.reset(`(default: Yes)`) }
      `,
      name: 'PUBLIC_CHECK_VERSION_ON_GITHUB',
      type: 'confirm',
      default: true,
    },
    {
      message: `Allow external API calls to fetch statistics about your node?
        ${ chalk.reset(`(default: Yes)`) }
      `,
      name: 'PUBLIC_ALLOW_EXTERNAL_API',
      type: 'confirm',
      default: true,
    },
  ]);
}