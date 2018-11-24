const app = require('express')();
const http = require('http').Server(app);
const market = require('./market');

const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/market', (req, res) => {
  res.send(market.marketPositions);
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});

// ... other import statements ...
const io = require('socket.io')(http);

// ... app.use and app.get ...

setInterval(function () {
  market.updateMarket();
  io.sockets.emit('market', market.marketPositions[0]);
}, 5000);

io.on('connection', function (socket) {
  console.log('a user connected');
});

// http.listen(3000, ...