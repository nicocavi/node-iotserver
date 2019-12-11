const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let temporalSocketSchema = new Schema({
	cliente: {
		type: Schema.Types.ObjectId,
		ref: 'Cliente',
		required: [true, 'El cliente es requerido']
	},
	socket:  {
		type: String,
		required: [true, 'El socket es requerido']
	}
})

module.exports = mongoose.model('TemporalSocket', temporalSocketSchema);