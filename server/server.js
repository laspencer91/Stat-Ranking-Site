var fs      = require('fs');
var http    = require('http');
var express = require('express');

var obj = JSON.parse(fs.readFileSync('../data/PlayerData.json', 'utf8'));

// Player Ranking formula
obj.sort(function(a, b) { 
    var killPoints = 5;
    var assistPoints = 1;
    var deathPen     = 0.1;

    return ((b.kills * killPoints) + (b.assists * assistPoints) - b.deaths * deathPen) - ((a.kills * killPoints) + (a.assists * assistPoints) - a.deaths * deathPen);
});

var app = express();
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('./index', { players: obj});
});

app.listen(8080);

console.log('8080 is the magic port');