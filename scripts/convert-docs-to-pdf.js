const mdToPdf = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

const documentsDir = path.join(__dirname, '../public/documents');

const documents = [
  { input: 'guida-credito-consumatori.md', output: 'guida-credito-consumatori.pdf' },
  { input: 'guida-abf.md', output: 'guida-abf.pdf' },
  { input: 'tegm.md', output: 'tegm.pdf' }
];

async function convertDocuments() {
  for (const doc of documents) {
    const inputPath = path.join(documentsDir, doc.input);
    const outputPath = path.join(documentsDir, doc.output);

    if (!fs.existsSync(inputPath)) {
      console.error(`File not found: ${inputPath}`);
      continue;
    }

    try {
      const pdf = await mdToPdf(inputPath, { dest: outputPath });
      console.log(`Converted ${doc.input} to ${doc.output}`);
    } catch (error) {
      console.error(`Error converting ${doc.input}:`, error);
    }
  }
}

convertDocuments();
