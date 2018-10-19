var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
const mongoURL = 'mongodb://localhost:27017/mytestdb'
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
  db = client.db("mytestdb")
})
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});


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
  title = req.body
  //console.log(name)
})

app.get('/respo', function (req, res) {
 file = new Midi.File();
 track = new Midi.Track();
  
  db.collection('practice').find({}).toArray(function (err, result){

    result.forEach(function (val) {
        var note = val.notes;
        note.forEach(function (val){
          var duration = val.duration;
          var notePlayed = val.key;
          var timeon = val.timeon;
        file.addTrack(track);
        track.addNote(0, notePlayed, duration, timeon);
        })
        // var duration = val.duration;
        // var timeon = val.timeon
      })
      fs.writeFileSync('aaa.mid', file.toBytes(), 'binary');
      res.sendFile("/Users/connorslaptop/Desktop/piano/aaa.mid");
      //res.send(file);
    })


})




app.listen(port, function () {
  console.log(port)
});