const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clienteTopicSchema = new Schema({

	cliente:{
		type: Schema.Types.ObjectId,
		ref: 'Cliente',
		required: [true,'El cliente es requerido']
	},
	topic:{
		type: Schema.Types.ObjectId,
		ref: 'Topic',
		required: [true,'El topic es requerido']
	}

});


module.exports = mongoose.model('ClienteTopic', clienteTopicSchema);