const bcrypt = require('bcrypt');
const express = require('express');

const app = new express();

let Cliente = require('../models/cliente');

app.post('/cliente',(req, res)=>{

	let body = req.body;

	let cliente = new Cliente({
		email: body.email,
		nombre: body.nombre,
		password: bcrypt.hashSync(body.password, 10)
	})

	cliente.save((err, clienteDB)=>{
		if(err){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			cliente: clienteDB
		});
	})

});

app.get('/cliente/:id',(req,res)=>{

	let id = req.params.id;

	Cliente.find({_id: id})
		.exec((err,clienteDB)=>{
			if(err){
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				cliente: clienteDB,
				lenght: conteo
			});
	})

});


module.exports = app;