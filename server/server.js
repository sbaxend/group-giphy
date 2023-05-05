require('dotenv').config()


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// App PORT set with production check
const PORT = process.env.PORT || 5002;
//adding a axios require
const axios = require('axios')
// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Routes
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);

app.get('/search/:id', (req, res) => {
  // ! API KEYS should only be used on the server
  const searchWord = req.params.id;
  console.log(searchWord);
  // https://api.giphy.com/v1/gifs/search?api_key=KIBQYHBFzGktf1tcKsNK9e2uv6xhvMUn&q=turtle&limit=25&offset=0&rating=g&lang=en
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_SEARCH_KEY}&q=${searchWord}&limit=25&offset=0&rating=g&lang=en`).then(
      response => {
        console.log(response.data);
          res.send(response.data);
      }).catch(error => {
          console.log(`Error in GET /random`, error);
          res.sendStatus(500)
      })
  
})

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
