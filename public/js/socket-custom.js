var socket = io();
var div = document.querySelector('#dispositivos'); 

let cliente = {};

 datos()

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
	console.log("Topic creado!");
	console.log(data);
})


function crearSensor(){
	let nombre = document.getElementById("nombre").value;
	let categoria = document.getElementById("categoria").value;
	let params = 30;
	socket.emit('agregarSensor', {
		nombre,
		categoria,
		params
	},(data)=>{
		console.log(data);
		var midiv = document.createElement("div");
		midiv.setAttribute("class","card-body border rounded border-secondary mt-3");
		midiv.innerHTML = '<h5 class="card-title">'+data.nombre+'</h5><p class="card-text">Temperatura: <span id="temp-dis">'+data.params+'</span> C°</p>';
		div.appendChild(midiv);
	});
}

function crearTopic(){
	let path = document.querySelector("#nombreTopic").value;
	console.log(path);
	let id = cliente._id;
	socket.emit('crearTopic', {path, id},(data)=>{
		console.log("Topic creado!");
		console.log(data);
	})
}


// Escuchar 
socket.on('disconnect',()=>{
	console.log('Perdimos comunicacion con el servidor');
})




