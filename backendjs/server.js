const express = require('express');
const app = express();
const routes = require('./routes/index');
const cors = require('cors');
app.use(cors());
// Middlewareapp.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
