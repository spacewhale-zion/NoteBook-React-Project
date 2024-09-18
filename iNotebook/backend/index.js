const run = require('./db');
const express = require('express');

// Call the run function to connect to MongoDB
run();
const app = express();
// cors=cross origin Resource Sharing
var cors = require('cors')

app.use(cors())
// Use middleware to parse JSON
app.use(express.json());

const port = 4000;

// Set up routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
