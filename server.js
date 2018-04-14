var fs      = require('fs');
var http    = require('http');
var express = require('express');
const path  = require('path');

var obj = JSON.parse(fs.readFileSync('./data/PlayerData.json', 'utf8'));

var cumulativeStats = { maxKillsPerGame: 0 };
cumulativeStats.maxKillsPerGame = calcMaxKills(obj);

function calcMaxKills(obj) {
    let most = 0;
    for (let i = 0; i < obj.length; i++) {
        let player = obj[i];
        if (player.gamesPlayed > 0 && (player.kills / player.gamesPlayed) > most) {
            most = (player.kills / player.gamesPlayed);
        }
    };
    console.log("Most Kills a game: " + most);
    return most;
}

// Player Ranking formula
obj.sort(function(a, b) { 
    var killPoints = 5;
    var assistPoints = 1;
    var deathPen     = 0.1;

    return ((b.kills * killPoints) + (b.assists * assistPoints) - b.deaths * deathPen) - ((a.kills * killPoints) + (a.assists * assistPoints) - a.deaths * deathPen);
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

// index page 
app.get('/', function(req, res) {
    res.render('./index', { players: obj, stats: cumulativeStats });
});

app.listen(8080);

console.log('8080 is the magic port');