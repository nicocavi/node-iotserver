const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let clienteSchema = new Schema({
	email: {
		type: String,
		required: [true, 'El email es necesario'],
		unique: true
	},
	nombre: {
		type: String,
		required: [true, 'El nombre es requerido']
	},
	password: {
		type: String,
		required: [true, 'El password es requerido']
	}
});

clienteSchema.methods.toJSON = function(){

	let cliente = this;

	let clienteObject = cliente.toObject();
	delete clienteObject.password;

	return clienteObject;
}

clienteSchema.plugin(uniqueValidator, {message: 'El {PATH} debe ser unico'});

module.exports = mongoose.model('Cliente', clienteSchema);