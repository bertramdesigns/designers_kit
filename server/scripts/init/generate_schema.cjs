const fs = require('fs');
const dotenv = require('dotenv');
const ID = require('../random_id/id.cjs');

// Load environment variables (from root directory)
dotenv.config({ path: './.env' });

// Read the template file
const templatePath = './template.appwrite.json';
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
const outputPath = './appwrite.json';
fs.writeFileSync(outputPath, output, 'utf8');

console.log('appwrite.json has been generated successfully.');