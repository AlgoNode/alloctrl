import inquirer from "inquirer";
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

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

  const configs = await inquirer.prompt(prompts);
  delete configs[PROMPT_MESSAGE_KEY]; // remove message blocks
  return configs;
}
