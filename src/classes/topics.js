class Topics{

	constructor(name){
		this.clientes = [];
		this.topics = [];
		this.name = name;
	}

	agregarCliente(cliente){
		this.clientes.push(cliente);
		return this.clientes;
	}

	agregarTopic(name){
		let topic = new Topics(name);

		this.topics.push(topic);

		return topic;
	}

	emit(mensajem,cliente){
		this.clientes.forEach(clienteT => {
			if(cliente.id != clienteT.id){
				clienteT.emit('mensaje',{mensaje})
			}
		});
	}

	getCliente(cliente){
		let clienteT = this.clientes.filter(clienteT => { clienteT === cliente })[0];
		return clienteT;
	}

	borrarCliente(cliente){
		let clienteTopic = this.getCliente(cliente);

		this.clientes = this.clientes.filter( clienteT =>  cliente !== clienteT);

		return clienteTopic;
	}

}

module.exports{
	Topics
}