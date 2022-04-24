const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Room = require('./models/room');
const ejsMate = require('ejs-mate');

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));

const url = "mongodb+srv://mahmoud:1234@cluster0.khpxz.mongodb.net/roomsDB?retryWrites=true&w=majority"
mongoose.connect( url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
} );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

// Routing
app.get('/', (req, res) => {
    res.send("Welcome to RoomFinder!")
});

app.get('/rooms', async (req, res) => {
    const rooms = await Room.find({});
    res.locals.rooms = rooms;
    res.render('rooms/index');
});

app.get('/rooms/new', (req, res) => {
    res.render('rooms/new');
})

app.post('/rooms', async (req, res) => {
    const room = new Room(req.body.room);
    await room.save();
    res.redirect(`/rooms/${room._id}`)
})

app.get('/rooms/:id', async (req, res,) => {
    const room = await Room.findById(req.params.id)
    res.locals.room = room;
    res.render('rooms/show');
});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
    console.log("Server started.......");
  });