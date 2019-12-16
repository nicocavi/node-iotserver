var socket = io();
var div = document.querySelector('#dispositivos'); 

let cliente = {};

 datos()

console.log(socket.id);

function datos(){
	let email = 'nico_cavi@hotmail.com';
	let password = 'cavilla';

	var http = new XMLHttpRequest();
	var url = "http://localhost:3000/login";
	http.open("POST", url, false);
	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) { 
	       //aqui obtienes la respuesta de tu peticion
	       cliente = JSON.parse(http.responseText).cliente;

	    }
	}
	http.send(JSON.stringify({email:email, password: password}));
}


socket.on('connect', function(){

	console.log('Conectado al servidor');

});

console.log(cliente);

socket.emit('nuevo', cliente,(data)=>{
	console.log(data);
})


function suscribir(){
	let id = document.querySelector('#idTopic').value;
	socket.emit('suscribir', {id}, ()=>{

	})
}

function enviarMensaje(){
	let mensaje = document.querySelector('#mensaje').value;
	socket.emit('enviarMensaje', {mensaje, topic: cliente.topic});
	mensaje.value = '';
}


socket.on('menssage', (data)=>{
	let consola = document.querySelector('#consola');
	consola.value = consola.value + '<'+data.date+'> '+data.menssage+'\n';
	cliente.topic = data.topic;
})

// Escuchar 
socket.on('disconnect',()=>{
	console.log('Perdimos comunicacion con el servidor');
})




