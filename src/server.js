const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
let server = http.createServer(app);

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/plataform-iot',  { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }, (err, res) =>{

	if(err) throw err;

	console.log('Base de datos ONLINE');

});

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//Configuracion global de rutas
app.use(require('./routes/index'));


module.exports.io = socketIO(server);

require('./socket/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});


