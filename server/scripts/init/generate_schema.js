import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ID } from '../random_id/id.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientEnvPath = path.resolve(__dirname, '../../../client/.env');
const templatePath = path.resolve(__dirname, '../../template.appwrite.json');

if (!fs.existsSync(clientEnvPath)) {
    console.error(`File ${clientEnvPath} not found`);
    process.exit(1);
}

// Load environment variables (from root directory)
dotenv.config({ path: clientEnvPath });

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