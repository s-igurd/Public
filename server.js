const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Sett opp Express-server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Tjen statiske filer fra public-mappen
app.use(express.static('public'));

// Håndter tilkobling av klienter
io.on('connection', (socket) => {
    console.log('Ny bruker tilkoblet');

    // Motta og kringkaste meldinger
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Håndter frakobling
    socket.on('disconnect', () => {
        console.log('Bruker frakoblet');
    });
});

// Start serveren
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server kjører på port ${PORT}");
});