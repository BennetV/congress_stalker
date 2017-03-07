var express = require('express')
  , router = express.Router();

var fs = require('fs');
var request = require('request');


/*
function getMovieData(){
  var theatreData = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(theatreData);
}
function saveMovieData(newData){
  fs.writeFile('data/data.json', JSON.stringify(newData));
}
*/

router.get('/', function(req, res){
  res.redirect('/index');
});

router.get('/index', function(req, res){
  //var movieList = getMovieData().movies;
  res.render('index.ejs');
});

router.post('/search_results', function(req, res){
 
  var zip = req.body.zipcode;
  console.log("zip: " + zip);
  request("https://congress.api.sunlightfoundation.com/legislators/locate?zip="+zip+"&apikey=31c861fcdf7a44918b337709913554ae", function(err, response, body){
    var zipResponse = JSON.parse(body);
    console.log("api query" + JSON.stringify(zipResponse));
    if(!err){
      res.render('search_results.ejs', {data: zipResponse})
    }
    else{
      res.redirect("/index");
    }
  });
  

});

router.get('/legislator/:id', function(req, res){

  var bioguideID = req.params.id;
  console.log("inurl"+ JSON.stringify(bioguideID));
  request("https://congress.api.sunlightfoundation.com/legislators?bioguide_id="+bioguideID+"&all_legislators=true&apikey=31c861fcdf7a44918b337709913554ae", function(err, response, body1){
      var bioguideIdResponse = JSON.parse(body1);
      request("https://congress.api.sunlightfoundation.com/bills/search?sponsor_id=" + bioguideID + "&apikey=31c861fcdf7a44918b337709913554ae", function(err, response, body2){
        var bills = JSON.parse(body2);
        if(!err){
          res.render('legislatorInfo.ejs', {data: bioguideIdResponse, bill: bills})
        }
        else{
         res.redirect("/index");

        }


     });

  });

});



router.post('/legislatorslist', function(req, res){
  //res.render
})


/*
router.post('/movies', function(req, res){
  //get title
  var title=req.body.title;
    title=title.replace(/ /g, '+');

  //search for results
  request("http://www.omdbapi.com/?t="+title+"&r=json", function(err, response, body) {
            var movieResponse = JSON.parse(body);
            if(!err){
            //if we get results, render update page
              res.render('new_movie.ejs', {movie: movieResponse})
      }
      else{
        res.redirect('/movies');
      }

    });//look for the movie
});

router.post('/movies/:id', function(req, res){
  var movieID=req.params.id;

  request("http://www.omdbapi.com/?i="+movieID+"&r=json", function(err, response, body) {
            var movieResponse = JSON.parse(body);

            if(!err){
              var movieData = getMovieData();
              var movieList = movieData.movies;
              var newId = parseInt(movieData.movies.length);
              var newMovie={
        "id": newId,
        "title": movieResponse.Title,
        "year": movieResponse.Year,
        "rating": movieResponse.Rated, 
        "director": movieResponse.Director,
        "actors": movieResponse.Actors,
        "plot": movieResponse.Plot,
        "poster": movieResponse.Poster,
        "showtimes": ["3:00", "5:30", "8:45"]
              }
              movieData.movies.push(newMovie);
              movieData.counter = movieData.movies.length;
              saveMovieData(movieData);
              res.redirect('/movies'); 
      }
      else{

      }
      //if we don't get results, return to page

    });//look for the movie
});

router.get('/movies/:id', function(req,res){
  console.log("looking for movie", req.params.id);
  var thisMovie = getMovieData().movies[req.params.id];
  res.render("show_movie_detail.ejs", {movie: thisMovie} );

});

router.get('/movies/:id/edit', function(req,res){
  var movieList=getMovieData();
  var thisMovie = movieList.movies[req.params.id];
  res.render("edit_movie.ejs", {movie: thisMovie} );
});

router.delete('/movies/:id', function(req, res){
  var movieData = getMovieData();
  var movieToDelete = movieData.movies[req.params.id];

  movieData.movies.splice(req.params.id, 1);
  
  movieData.counter=movieData.movies.length;
  for(i=0; i< movieData.movies.length;i++){
    movieData.movies[i].id=i;
  }

  saveMovieData(movieData);
 
    console.log("deleted"+movieToDelete);
  res.redirect('/movies');
});

router.put('/movies/:id', function(req,res){
  var movieData=getMovieData();
  var movieList=movieData.movies;
  var thisMovie = movieList[req.params.id];
  console.log(thisMovie);
  thisMovie["id"]= req.body.id;
  thisMovie["title"] = req.body.title;
  thisMovie["year"]= req.body.year;
  thisMovie["rating"]= req.body.rating; 
  thisMovie["director"]= req.body.director;
  thisMovie["actors"]= req.body.actors;
  thisMovie["plot"]= req.body.plot;
  thisMovie["poster"]= req.body.poster;
  thisMovie["showtimes"] = req.body.showtimes.split(",");
  console.log(thisMovie);
  saveMovieData(movieData);
  res.redirect('/movies');
});

*/

module.exports = router