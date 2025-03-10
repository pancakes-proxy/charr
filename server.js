const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Serve static files (your index.html and others)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle user data
app.post('/user-info', (req, res) => {
  console.log('lil bro got caught lacking in 4k UHD heres the drop gng:', req.body);
  res.json({ message: 'Data received successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
