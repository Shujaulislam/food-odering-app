const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import routes
const foodRoutes = require('./routes/foodRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const subcategoryRoutes = require('./routes/subCategoryRoutes');
// Use routes
app.use('/api', foodRoutes);
app.use('/api', cartRoutes);
app.use('/api', categoryRoutes); 
app.use('/api', subcategoryRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
