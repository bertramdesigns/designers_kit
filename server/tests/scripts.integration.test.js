import { exec } from 'child_process';
import path from 'path';
import { describe, it, expect } from 'vitest';

const runScript = (script) => {
    return new Promise((resolve, reject) => {
        exec(`pnpm run ${script}`, { cwd: path.resolve(__dirname) }, (error, stdout, stderr) => {
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

describe('Integration Tests for server setup Scripts', () => {
    it('id script', async () => {
        const output = await runScript('id');
        console.log('id script output:', output);

        // Extract the ID from the output
        const idMatch = output.match(/^[0-9a-f]{20,}$/m);
        const id = idMatch ? idMatch[0] : '';

        expect(id).toMatch(/^[0-9a-f]{20,}$/); // Check if the extracted ID is a valid hex ID
    });

    it('init:user script', async () => {
        const output = await runScript('init:user');
        console.log('output:', output);
        expect(output).toContain('Session cookie:');
        // expect(output).toContain('Organization ID:');
        // expect(output).toContain('Associated user with organization.');
        // expect(output).toContain('Please remember to change your password after login.');
        // expect(output).toContain('User creation script executed and cleaned up.');
    });

    it('init:schema script', async () => {
        const output = await runScript('init:schema');
        expect(output).toContain('appwrite.json has been generated successfully.');
    });

    it('init:db script', async () => {
        const output = await runScript('init:db');
        expect(output).toContain('✓ Success: Successfully signed in as ');
        // expect(output).toContain('✓ Success: Successfully pushed all project settings.');
        // expect(output).toMatch(/✓ Success: Successfully pushed \d+ collections\./);
        // expect(output).toContain('✓ Success: Logging out');
        // expect(output).toContain('Commands executed successfully.');

    });
});