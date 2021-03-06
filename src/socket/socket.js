const {io} = require('../server');
let {Sensores} = require('../classes/sensores')

let sensores = new Sensores();

let cont = 0;

let Topic = require('../models/topic');
let Cliente = require('../models/cliente');
let TemporalSocket = require('../models/temporal-socket');

let ClieteTopic = require('../models/cliente-topic');

io.on('connection', (cliente)=>{

	console.log('Usuario conectado');

	cliente.on('nuevo', (data, callback)=>{
		console.log(data);
		let temporalSocket = new TemporalSocket({
			cliente: data._id,
			socket: cliente.id
		})

		temporalSocket.save((err, tSocket)=>{

			let respuesta = {
				ok: true,
				message: 'Socket creado'
			}

			if(err){
				respuesta =  {
					ok: false,
					err
				};
			}

			callback(respuesta);

		});
	});

	cliente.on('suscribir', (data, callback)=>{
		console.log(data);
		cliente.join(data.id);
		cliente.emit('menssage',{
			ok:true,
			menssage: 'Subscripto a '+data.id,
			date: new Date(),
			topic: data.id
		})
	})


	cliente.on('enviarMensaje', (data)=>{
		let mensaje = {
			ok:true,
			menssage: data.mensaje,
			date: new Date(),
			topic: data.topic
		}


		console.log('Topic: ' + data.topic)
		cliente.broadcast.to(data.topic).emit('menssage',mensaje);
	})

	cliente.on('disconnect', ()=>{

		TemporalSocket.findOneAndDelete({socket: cliente.id}, {new: false}, (err, socket)=>{
			if(err){
				console.log({
					ok: false,
					err
				})
			}

			if(!socket){
				console.log({
					ok: false,
					err:{
						message: 'Socket no encontrado'
					}
				});
			}

			console.log({
				ok: true,
				socket
			})
		});

		console.log('Usuario desconectado');
	});
})
