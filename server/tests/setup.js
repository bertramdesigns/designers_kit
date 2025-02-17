import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const projectName = 'designers-kit-server'; // test container name

const isContainerInstalled = async (projectName) => {
    try {
        const { stdout } = await execPromise(`docker compose -p ${projectName} ps --services`);
        console.log(`"${projectName}" # of services:`, stdout.trim().length);
        return stdout.trim().length > 0;
    } catch (error) {
        console.log(`"${projectName}" container not found. error: ${error.message}`);
        return false;
    }
};

const startContainer = async (projectName) => {
    // if running in GitHub Actions, use the .env file doesn't exist. Use example file instead.
    const envFilename = process.env.GITHUB_ACTIONS ? '.env.example' : '.env';
    const startCMD = `docker compose --env-file ${envFilename} -p ${projectName} -f docker-compose.yml up -d --remove-orphans --quiet-pull`;
    try {
        await execPromise(startCMD);
        console.log('Docker container started successfully.');
    } catch (error) {
        console.error('Failed to start Docker container:', error.message);
        throw error;
    }
}

const uninstallContainer = async (projectName) => {
    try {
        await execPromise(`docker compose -p ${projectName} -f docker-compose.yml down -v`);
        console.log('Docker container was stopped and removed successfully.');
    } catch (error) {
        console.error('Failed to stop Docker container:', error.message);
        throw error;
    }
}

beforeAll(async () => {
    const isInstalled = await isContainerInstalled(projectName);

    if (isInstalled) {
        console.log('Container is already installed. Stopping and removing it...');
        await uninstallContainer(projectName);
    }

    console.log('Starting a clean install of Docker server container...');
    await startContainer(projectName);
});

afterAll(async () => {
    console.log('Stopping Docker container...');
    await uninstallContainer(projectName);
});