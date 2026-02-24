import { initializeApp } from 'firebase/app';
import { getVertexAI, getGenerativeModel } from '@firebase/ai';
import { execSync } from 'child_process';

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    projectId: 'digitalleagal',
    appId: '1:92063829433:web:25b0eac850b16da33bfa68',
    apiKey: 'AIzaSyCKVdBbUF8n7NOg1fQLT62Yh-XgBmiZq3k',
};

const app = initializeApp(firebaseConfig);
const vertexAI = getVertexAI(app);

// Use a fast model like gemini-1.5-flash for quick CLI responses
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

async function generateCommitMessage() {
    try {
        // Get the diff of staged changes
        const diff = execSync('git diff --cached').toString();

        if (!diff.trim()) {
            console.log('No staged changes found. Please stage your changes (git add) before running this script.');
            return;
        }

        const prompt = `
      You are an expert developer. Generate a concise and descriptive git commit message for the following code changes.
      Follow the Conventional Commits specification (e.g., "feat: add new feature" or "fix: resolve bug").
      Do not include markdown formatting or backticks in the response.
      
      Changes:
      ${diff}
    `;

        console.log('Generating commit message...');
        const result = await model.generateContent(prompt);
        const commitMessage = result.response.text();

        console.log('\nSuggested Commit Message:\n');
        console.log(commitMessage);
    } catch (error) {
        console.error('Error generating commit message:', error);
    }
}

generateCommitMessage();