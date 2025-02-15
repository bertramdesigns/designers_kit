import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const projectName = 'designers-kit-server'; // test container name

const isContainerInstalled = async (projectName) => {
    try {
        const { stdout } = await execPromise(`docker compose -p ${projectName} ps --services`);
        console.log(`"${projectName}" # of containers:`, stdout.trim().length);
        return stdout.trim().length > 0;
    } catch (error) {
        console.log(`"${projectName}" container not found. error: ${error.message}`);
        return false;
    }
};

const startContainer = async (projectName) => {
    try {
        await execPromise(`docker compose -p ${projectName} -f docker-compose.yml up -d --remove-orphans --quiet-pull`);
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
    console.log('isRunning:', isInstalled);

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