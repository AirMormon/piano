var recording = -1;
var notes = []
var time
var c4 = document.getElementById('cbutton')
var db4 = document.getElementById('dbbutton')
var d4 = document.getElementById('dbutton')
var eb4 = document.getElementById('ebbutton')
var e4 = document.getElementById('ebutton')
var f4 = document.getElementById('fbutton')
var gb4 = document.getElementById('gbbutton')
var g4 = document.getElementById('gbutton')
var ab4 = document.getElementById('abbutton')
var a4 = document.getElementById('abutton')
var bb4 = document.getElementById('bbbutton')
var b4 = document.getElementById('bbutton')
var c5 = document.getElementById('hcbutton')
var r = document.getElementById('recButton')
var pl = document.getElementById('playButton')
var sto = document.getElementById('stopButton')
var banner = document.getElementById('recBanner')
var submit = document.getElementById('subButton')
var seconds = 0
var stream = MediaRecorder.stream

c4.addEventListener('click', playNote(c4, 261.63, "c4"))
db4.addEventListener('click', playNote(db4, 277.18, "db4"))
d4.addEventListener('cick', playNote(d4, 293.66, "d4"))
eb4.addEventListener('click', playNote(eb4, 311.13, "eb4"))
e4.addEventListener('click', playNote(e4, 329.63, "e4"))
f4.addEventListener('click', playNote(f4, 349.23, "f4"))
gb4.addEventListener('click', playNote(gb4, 369.99, "gb4"))
g4.addEventListener('click', playNote(g4, 392.00, "g4"))
ab4.addEventListener('click', playNote(ab4, 415.30, "ab4"))
a4.addEventListener('click', playNote(a4, 440.00, "a4"))
bb4.addEventListener('click', playNote(bb4, 466.16, "bb4"))
b4.addEventListener('click', playNote(b4, 493.88, "b4"))
c5.addEventListener('click', playNote(c5, 523.25, "c5"))
pl.addEventListener('click', playSong);
r.addEventListener("click", recSong);
submit.addEventListener("click", subSong);
var input = document.getElementById('input')



input.onblur = function () {
    var name = document.getElementById('input').value;
    // var arrStr = JSON.stringify(name)
    request = new XMLHttpRequest
    request.open("POST", "/name", true)
    request.send(name);
    //console.log(name)
}

context = new AudioContext;
oscillator = context.createOscillator();

oscillator.connect(context.destination);




function save() {

    alert('you left')


}

function playNote(note, frequency, key) {
    var held = 0
    var PutDownTime
    var PickUpTime
    var context = new AudioContext;
    var gainNode = context.createGain();
    var oscillator;
    note.addEventListener('mousedown', function () {
        PutDownTime = seconds;
        console.log(PutDownTime)
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        gainNode.gain.value = 1;
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency
        gainNode.connect(context.destination);
        oscillator.start(0)

        function incrementSeconds() {
            held += 1;
        }
        holding = setInterval(incrementSeconds, 1);
    });
    note.addEventListener('mouseup', function () {
        PickUpTime = seconds;
        console.log(PickUpTime)
        //held = held/100;
        gainNode.gain.exponentialRampToValueAtTime(0.000000001, context.currentTime + 4)
        clearInterval(holding)
        if (recording == 1) {
            notes.push({
                "freq": frequency,
                "duration": held,
                "key": key,
                "timeon": PutDownTime,
                "timeoff": PickUpTime
            })
            console.log(notes)
        } else {}
    })


}


function recSong() {
    seconds = 0;
    recording = -recording

    if (recording == 1) {
        time = setInterval(incrementSeconds, 10);

        function incrementSeconds() {
            document.getElementById("recBanner").innerHTML = "Recording: " + seconds
            seconds += 1

        }
    }
    if (recording == -1) {
        clearInterval(time)
        document.getElementById("recBanner").innerHTML = ""
    }

}

function subSong() {
    var title = document.getElementById('input').value
    var xhttp = new XMLHttpRequest();
    var contents = {
        title,
        notes
    }
    var arrStr = JSON.stringify(contents)
    xhttp.open("POST", "/data");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(arrStr);
    console.log(contents);

}


function playSong() {
    var note
    var hold
    var request = new XMLHttpRequest();
    request.open("GET", '/respo', true)


    request.addEventListener('load', function () {
        var data = this.response
        console.log(data);


        // var data = JSON.parse(this.responseText);
        // data.forEach(function(val,i){
        //   var notes = val.notes;
        //   notes.forEach(function(val,i){
        //      note = val.freq;
        //      hold = val.time
        //      var finHold = hold+4
        //      console.log(note);
        //      console.log(finHold);

        //         var context = new AudioContext;
        //         var gainNode = context.createGain();
        //         var oscillator;
        //         var seconds = 0
        //         oscillator = context.createOscillator();
        //             oscillator.connect(gainNode);
        //             gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime +hold)
        //             oscillator.type = "triangle";
        //             oscillator.frequency.value = note
        //             gainNode.connect(context.destination);
        //             oscillator.start()




    })





    request.send();

}