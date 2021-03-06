var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MidiPlayer = require('midi-player-js');
const synth = require('synth-js');
var port = process.env.PORT || 5000;
const mongoURL = 'mongodb://username:password1@ds231090.mlab.com:31090/piano'
const mongoClient = require('mongodb').MongoClient;
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(bodyParser.json());
const assert = require('assert')
var fs = require('fs');
var Midi = require('jsmidgen');
var file
var track
var data


mongoClient.connect(mongoURL, {
  useNewUrlParser: true
}, function (err, client) {
  assert.equal(null, err);
  console.log("connected")
  db = client.db("piano")
})
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});


app.post('/del', function (req, res) {
db.collection('practice').deleteMany({"title":id})
})


app.post('/data', function (req, res) {
data = req.body.notes
  // file = new Midi.File();
  // track = new Midi.Track();
  // console.log(data)
  // data.forEach(function (val) {
  //   var note = val.key;
  //   var duration = val.duration;
  //   var timeon = val.timeon

  //   file.addTrack(track);
  //   track.addNote(0, note, duration, timeon);
  // })
  db.collection('practice').insertOne(req.body);
  //console.log(req.body);
  //console.log(parsedData);


  //   })
  // })


});
app.post('/name', function (req, res) {
   id = req.body.name 
})


app.get('/respo', function (req, res) {
//  file = new Midi.File();
//  track = new Midi.Track();
  db.collection('practice').find({"title":id}).toArray(function (err, result){
 if (err){
console.log(err)

 }
    // result.forEach(function (val) {
    //     var note = val.notes;
    //     note.forEach(function (val){
    //       var duration = val.duration;
    //       var notePlayed = val.key;
    //       var timeon = val.timeon;
    //     //file.addTrack(track);
    //     //track.addNote(0, notePlayed, duration, timeon);
    //     track.push(0, notePlayed, duration, timeon);
    res.send(result)
        })
        // var duration = val.duration;
        // var timeon = val.timeon
      })
      
    // fs.writeFileSync('./music/music.mid', file.toBytes(), 'binary');
    // let midBuffer = fs.readFileSync('/Users/connorslaptop/Desktop/piano/music/music.mid');
    // let wavBuffer = synth.midiToWav(midBuffer).toBuffer();
    // fs.writeFileSync('./music/song.wav', wavBuffer, {encoding: 'binary'});

    // var stat = fs.statSync('/Users/connorslaptop/Desktop/piano/music/song.wav')
    // res.writeHead(200, {
    // 'Content-Type': "audio/midi",
    // 'Content-Length': stat.size
    // })
    // var readStream = fs.createReadStream('/Users/connorslaptop/Desktop/piano/music/song.wav');
    // readStream.pipe(res);
    // })







app.listen(port, function () {
  console.log(port)
});