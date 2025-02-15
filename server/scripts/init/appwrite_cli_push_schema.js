import { exec, spawn } from 'child_process';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';

// paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientEnvPath = path.resolve(__dirname, '../../../client/.env');
const serverEnvPath = path.resolve(__dirname, '../../.env');
const serverDefaultsEnvPath = path.resolve(__dirname, '../../.env.defaults');

// Load environment variables from .env file
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: serverEnvPath });
dotenv.config({ path: serverDefaultsEnvPath });

// Check if required environment variables are set
const requiredEnvVars = ['VITE_APPWRITE_ENDPOINT', 'VITE_APPWRITE_PROJECT_ID', 'DEFAULT_ADMIN_EMAIL', 'DEFAULT_ADMIN_PASSWORD', 'DEFAULT_ORG_ID', '_APP_DOMAIN'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables:\n${missingEnvVars.join('\n')}\n`);
    console.error('Check that the .env and .env.default files exist in ./server and ./client directories.\nThen check filepaths in ./server/scripts/init/appwrite_cli_push_schema.js');
    console.error(`\nPaths resolve to:\nclient     .env      : ${clientEnvPath}\nserver     .env      : ${serverEnvPath}\nserver .env.defaults : ${serverDefaultsEnvPath}\n`);
    process.exit(1);
}

// Function to execute a non-interactive shell command and return it as a Promise
const execCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
            }
            resolve(stdout);
        });
    });
};

// Function to spawn a shell command interactively
const spawnCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { stdio: 'inherit' });

        child.on('error', (error) => {
            reject(`error: ${error.message}`);
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(`Command failed with exit code ${code}`);
            } else {
                resolve();
            }
        });
    });
};

const loginArgs = ['login', '--endpoint', process.env.VITE_APPWRITE_ENDPOINT, '--email', process.env.DEFAULT_ADMIN_EMAIL, '--password', process.env.DEFAULT_ADMIN_PASSWORD];
// const initProjectArgs = ['init', 'project', '--organization-id', process.env.DEFAULT_ORG_ID, '--project-id', process.env.VITE_APPWRITE_PROJECT_ID, '--project-name', `Designer's Kit`];
const initProjectArgs = ['projects', 'create', '--project-id', process.env.VITE_APPWRITE_PROJECT_ID, '--team-id', process.env.DEFAULT_ORG_ID, '--name', `Designer's Kit`];
const pushSchemaArgs = ['push', 'all', '--all', '--verbose'];
const addPlatformArgs = ['projects', 'create-platform', '--project-id', process.env.VITE_APPWRITE_PROJECT_ID, '--type', 'web', '--name', `Designer's Kit Web`, '--hostname', process.env._APP_DOMAIN];

// Execute the commands
(async () => {
    try {
        console.log(`\nLogging in to Appwrite...`);
        await spawnCommand('appwrite', loginArgs);

        console.log(`\nInitializing Appwrite project...`);
        await spawnCommand('appwrite', initProjectArgs);

        console.log(`\nPushing schema to Appwrite...`);
        await spawnCommand('appwrite', pushSchemaArgs);

        console.log(`\nAdding a new web platorm key...`);
        await spawnCommand('appwrite', addPlatformArgs);

        console.log(`\nLogout of Appwrite...`);
        await spawnCommand('appwrite', ['logout']);

        console.log(`\nCommands executed successfully.\nPlease remember to change the default admin password in the Appwrite console.`);
    } catch (error) {
        console.error(`Error executing commands: ${error}`);
    }
})();