const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/vocabRoutes');
const contactRoute = require('./api/routes/contact'); 
global.Vocab = require('./api/models/vocabModel'); 

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vocab-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/contact', contactRoute);


routes(app);


app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});


app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
