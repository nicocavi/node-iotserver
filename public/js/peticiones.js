

function registrar(){
	let nombre = document.querySelector('#nombreRegistro').value;
	let email = document.querySelector('#emailRegistro').value;
	let password = document.querySelector('#passwordRegistro').value;

	var http = new XMLHttpRequest();
	var url = "http://localhost:3000/cliente";
	http.open("POST", url, true);
	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) { 
	       //aqui obtienes la respuesta de tu peticion
	       console.log(http.responseText);
	    }
	}
	http.send(JSON.stringify({email:email, password: password, nombre: nombre}));

	
}

function iniciarSesion(){
	let email = document.querySelector('#emailInicio').value;
	let password = document.querySelector('#passwordInicio').value;

	var http = new XMLHttpRequest();
	var url = "http://localhost:3000/login";
	http.open("POST", url, false);
	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) { 
	       //aqui obtienes la respuesta de tu peticion
	       console.log(http.responseText);
	       location.href = "http://localhost:3000";
	    }
	}
	http.send(JSON.stringify({email:email, password: password}));

}