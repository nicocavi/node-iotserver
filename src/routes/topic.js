const express = require('express');
const app = express();

let Topic = require('../models/topic');

app.post('/topic',(req,res)=>{

	let body = req.body;

	let topic = new Topic({
		path: body.path,
		cliente: body.cliente
	});

	topic.save((err, topicDB)=>{
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			topic: topicDB
		});
	})
});

app.get('/topic/:id',(req,res)=>{

	let id = req.params.id;

	Topic.find({_id: id})
		.exec((err,topicDB)=>{
			if(err){
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				topic: topicDB,
				lenght: conteo
			});
	})
});

app.get('/topic',(req,res)=>{


	Topic.find()
		.populate('cliente')
		.populate('topic')
		.exec((err,topicDB)=>{
			if(err){
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				topic: topicDB,
				lenght: conteo
			});
	})
});

module.exports = app;