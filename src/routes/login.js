const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Cliente = require('../models/cliente');

const app = express();

app.post('/login', (req, res) =>{

	let body = req.body;

	Cliente.findOne({email: body.email},(err, cliente)=>{
		
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!cliente){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario o contraseña incorrectos'
				}
			});
		}

		if(!bcrypt.compareSync(body.password, cliente.password)){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario o contraseña incorrectos'
				}
			});
		}

		let token = jwt.sign({
		  cliente
		}, 'skdla213kj123n1nk6k56nn', { expiresIn: (60 * 60 * 24 * 30)});

		res.json({
			ok:true,
			cliente,
			token
		})

	});

})

module.exports = app;