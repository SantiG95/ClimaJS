//VARIABLES
var inputCiudad = document.getElementById("ciudadInput")
var gpsButton = document.getElementById("gps")
var enviarButton = document.getElementById("enviar")
var ubicacionClima = document.getElementById("ubicacionClima")
var condicionCielo = document.getElementById("condicionCielo")
var temperatura = document.getElementById("temperatura")
var velocidadViento = document.getElementById("velocidadViento")
var informacionClima = document.getElementById("informacionClima")

var posicion;

var body = document.getElementsByTagName("body")[0]
var sol = document.getElementsByClassName("sol")[0]
var luna = document.getElementsByClassName("luna")[0]
var colinas = document.getElementsByClassName("colina")

const weatherAPI = "18adba3bc5141e5f5c3da4e751534d25"
//const weatherAPI = "3045dd712ffe6e702e3245525ac7fa38"



//FUNCIONES
function obtenerLocalizacion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(obtenerInformacionClimaPorGPS)
    }
}

function obtenerInformacionClimaPorGPS(posicionObtenida){
    posicion = posicionObtenida
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + posicionObtenida.coords.latitude + "&lon=" + posicionObtenida.coords.longitude + "&appid=" + weatherAPI + "&lang=es")
    .then(res => res.json())
    .then(data => pronostico = data)
    .then(data => {
            ubicacionClima.innerHTML = "\n<p> El clima en " + data.name + "</p> \n";
            condicionCielo.innerHTML = "Condicion del cielo: " + data.weather[0].description;
            temperatura.innerHTML = "Temperatura: " + (data.main.temp - 273).toFixed(1) + "º";
            velocidadViento.innerHTML = "Velocidad del viento: " + (data.wind.speed * 3.6).toFixed(1) + " km/h";
            informacionClima.style.visibility = "visible"
            }
        )
    .catch(error => {
        informacionClima.style.visibility = "hidden"
        alert("No se ha encontrado la ciudad especificada")
    })
}


//EJECUCION
//Eventos para los botones
gpsButton.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(obtenerInformacionClimaPorGPS)
    }
    }
)

enviarButton.addEventListener('click', () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputCiudad.value + "&appid=" + weatherAPI + "&lang=es")
    .then(res => res.json())
    .then(data => pronostico = data)
    .then(data => {
            ubicacionClima.innerHTML = "\n<p> El clima en " + data.name + "</p> \n";
            condicionCielo.innerHTML = "Condicion del cielo: " + data.weather[0].description;
            temperatura.innerHTML = "Temperatura: " + (data.main.temp - 273).toFixed(1) + "º";
            velocidadViento.innerHTML = "Velocidad del viento: " + (data.wind.speed * 3.6).toFixed(1) + " km/h";
            informacionClima.style.visibility = "visible"
            }
        )
    .catch(error => {
        informacionClima.style.visibility = "hidden"
        alert("No se ha encontrado la ciudad especificada")
    })
    }
)

//Obtencion y establecimiento de la hora actual
horaActual = new Date().getHours()
if(horaActual >= 6 && horaActual <= 19){
    body.classList.add("diurno")
    sol.classList.add("visible")
    for(var colina of colinas){
        colina.classList.add("dia")
    }
}
else{
    luna.classList.add("visible")
    body.classList.add("nocturno")
    for(var colina of colinas){
        colina.classList.add("noche")
    }
}