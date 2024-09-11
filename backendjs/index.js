const express = require('express');
const app = express();
const routes = require('./routes/index');

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
