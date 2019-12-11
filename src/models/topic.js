const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let topicSchema = new Schema({
	path: {
		type: String,
		required: [true,'El path es requerido'],
		unique: true
	},
	cliente: {
		/*type: Schema.Types.ObjectId, 
		ref: 'Cliente',*/
		type: String,
		required: [true,'El cliente es requerido']
	}
});

topicSchema.plugin(uniqueValidator, {message: 'Ya existe el path {PATH}'});

module.exports = mongoose.model('Topic', topicSchema);
