const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require('multer');
const multer = upload();

const PORT = 3000;
let frenchMovies = [];

app.use('/public/css', express.static('public/css'));
app.use(bodyParser.urlencoded({ extend: false }));


app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/movies', (req,res) => {
  const title = 'film français des 30 dernières années';
  frenchMovies = [
    {
      title: 'ta mère',
      year: 2001
    },
    {
      title: 'ton père',
      year: 2020
    },
    {
      title: 'tes cousins',
      year: 2030
    }
];
  res.render('movies', { movies: frenchMovies, title:title});
});

// app.post('/movies', (req,res) => {
//   console.log(req.body);
//   const newMovie = {title: req.body.movietitle, year: req.body.movieyear};
//   frenchMovies = [... frenchMovies, newMovie];
//   console.log(frenchMovies);
//   res.sendStatus(201);
// });

app.post('/movies', multer.fields([]), (req, res)=>{
  if(!req.body){
    return res.senStatus(500);
  } else {
    const formData = req.body;
    console.log('formData: ', formData);
    const newMovie = {title: req.body.movietitle, year: req.body.movieyear};
    frenchMovies = [... frenchMovies, newMovie];
    res.sendStatus(201);
  }
})

app.get('/movies/add', (req,res) => {
  res.send('adding a movie here!');
});

app.get('/movies/:id', (req,res) => {
  const id = req.params.id;
  res.render('movies-details', { movieid: id});
});

app.get('/', (req,res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
