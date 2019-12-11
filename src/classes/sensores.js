class Sensores{

	constructor(){
		this.sensores = [];
	}

	agregarSensor(id, clienteID, nombre, categoria, params){

		let sensor = {
			id,
			clienteID,
			nombre,
			categoria,
			params
		}

		this.sensores.push(sensor);

		return sensor;
	}

	getSensores(){
		return this.sensores;
	}

	getSensor(id){

		//Obtener un sensor que tenga el id
		let sensor = this.sensores.filter(sensor => { sensor.id === id })[0];

		return sensor;
	}

	borrarSensor(id){
		let personaSensor = this.getSensor(id);

		this.sensores = this.sensores.filter( sensor =>  sensor.id != id);

		return personaSensor;
	}

}

module.exports = {
	Sensores
}