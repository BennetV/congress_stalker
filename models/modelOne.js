var fs = require('fs');


exports.getMovieData = function(){
  var theatreData = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(theatreData);
}

exports.saveMovieData = function(newData){
  fs.writeFile('data/data.json', JSON.stringify(newData));
}

exports.updateMovieData = function(newData){

}

exports.deleteMovieData = function(newData){

}