import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ID } from '../random_id/id.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientEnvBasePath = '../../../client/.env';
const clientEnvPath = path.resolve(__dirname, clientEnvBasePath);
const clientEnvExamplePath = path.resolve(__dirname, `${clientEnvBasePath}.example`);
const templatePath = path.resolve(__dirname, '../../template.appwrite.json');

// Check if the client environment file exists
if (fs.existsSync(clientEnvPath)) {
    // Load environment variables
    dotenv.config({ path: clientEnvPath });
} else if (fs.existsSync(clientEnvExamplePath)) {
    // default back to the example file. Probably running in a CI environment
    console.log('No client .env file found. Using the example file.');
    console.log('Please make sure to create a .env file in the client directory.');
    dotenv.config({ path: clientEnvExamplePath });
} else {
    console.error(`File ${clientEnvPath} not found.`);
    process.exit(1);
}

// Read the template file
const template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders with environment variables
const output = template.replace(/\$\{(\w+)\}/g, (_, key) => {
    if (key === 'unique') {
        const id = ID.unique();
        return id;
    }
    const value = process.env[key];
    if (value === undefined) {
        console.error(`Environment variable ${key} is not defined`);
        process.exit(1);
    }
    return value;
});

// Write the output to appwrite.json
const outputPath = path.resolve(__dirname, '../../appwrite.json');
fs.writeFileSync(outputPath, output, 'utf8');

console.log('appwrite.json has been generated successfully.');