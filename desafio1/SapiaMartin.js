let data = require('./data');
let arrayOriginal = [];
let arrayFiltrado = [];
let arrayNumeros = [];
const NOMBRE_VIDEO = "Flexbox Video";


 //Separa el strings en array de strings a partir de un elemento comun
function dividirCadena(cadenaADividir,separador) { 
    return cadenaADividir.split(separador); // separo a partir del salto de linea "\n"
};

//obtiene del array, aquellas cadenas que contengan algun nombre o frase ("Flexbox Video")
function filtrarArray(filtro,arr){    
    let aux =[];
  for (var i=0; i < arr.length; i++) {
    if(arr[i].includes(filtro)){
        aux.push(arr[i]);
    }
 }
 return aux;
}

//extrae los valores numericos del String
function obtenerNumerosDeString(arr) {
let num = 0;
let arrayNumeros =[]
for (const iterator of arr) {
    num = iterator.match(/\d+/g);
    num = num.join("");
    arrayNumeros.push(num);
}
return arrayNumeros;
}

//Calcula los segundo a partir de un array de numeros
function calcularSegundos(arr){
    let segundos =0;
    //los ultimos 2 caracteres representan los segundo, el resto minutos
    for(var i = 0 ; i<arr.length;i++){
        if(arr[i]>59){ //si el numero tiene mas de 1 munuto
            
            //suma ultimos 2 caracteres (segundos)
            segundos += parseInt(arr[i].toString().substr(arr[i].length-2,arr[i].length-1));
            //los caracres restantes, los trasnforma en segundos (x*60) 
            segundos += parseInt(arr[i].toString().substr(0,arr[i].length-2)*60);

        }else { // si el numero tiene menos de 1 minuto, sumo los segundos
            segundos += parseInt(arr[i]);
        }
    }
    return segundos;
}

arrayOriginal = dividirCadena(data,"\n"); // Separo la cadena en objetos string a partir de cada salto de linea
arrayFiltrado = filtrarArray(NOMBRE_VIDEO,arrayOriginal); //filtro el array de strings segun tengan "Flexbox Video"
arrayNumeros = obtenerNumerosDeString(arrayFiltrado); //una vez obtenido unicamente los videos buscados, extraigo su valor numerico
// Calculo los segundos totales de los videos de "Flexbox Video" y los muestro por consola
console.log(`Los videos de "${NOMBRE_VIDEO}" cuentan con un total de: ${calcularSegundos(arrayNumeros)} Segundos`); 
