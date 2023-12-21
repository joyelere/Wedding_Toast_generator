// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const path = require('path'); // Add the 'path' module for file path handling

// Create an instance of the Express application
const app = express();
const port = 3000; // Set the port for the server

// Configure middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create an instance of the OpenAIAPI class with your API key
const openai = new OpenAI({ apiKey: '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' });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file from the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle POST requests to the '/generate-toast' endpoint
app.post('/generate-toast', async (req, res) => {
    try {
        const { brideName, groomName, relationship } = req.body;

        const conversation = [
            { role: 'user', content: `Write a wedding toast for ${brideName} and ${groomName}. They are ${relationship}.` }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversation
        });

        // Ensure the response has the expected structure
        const generatedToast = response.choices?.[0]?.message?.content;

        if (generatedToast) {
            res.json({ toast: generatedToast });
        } else {
            console.error('Unexpected response format:', response);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});