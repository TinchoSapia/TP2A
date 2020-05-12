const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:admin@cluster0-omvhf.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

// sujeto de prueba--------
const nuevaPersona = {
    first: "Martin",
    last: "Sapia",
    year: 1994
}
//---------
// Funcion que establece conexion con la base de datos--------------------------
function EnableConnection(){
return new Promise((resolve, reject)=>{
    client.connect((err, result) => {
        if (!err) {
            resolve(result.db("desafio2").collection("desafio2"));
            console.log(chalk.blue("Conexion establecida correctamente"))
   
        } else {
           console.log(chalk.red("No se pudo establecer conexion: ", err))
        }
    });
});
}

//Funcion que permite insertar datos en la base de datos----------------------------
async function asyncInsertarDato(persona){
    let collection = await EnableConnection()
    return new Promise((resolve, reject)=>{
        resolve(collection.insertOne(persona, (error, result) => {
            if(!error){
              console.log(chalk.green("persona insertada en la base de datos correctamente"))
            };
        }));
    });
}
//Funcion que permite Modificar datos en la base de datos----------------------------
async function asyncModificarDato(){
    let collection = await EnableConnection()
    return new Promise((resolve, reject)=>{
        resolve(collection.updateOne({last: "Sapia"}, {$set: {year: 2000}} , (err, result) => {
            if(!err){
            console.log(chalk.green("Persona actualizada correctamente"));

            };
        }));
    });
}

//Funcion que permite Eliminar datos en la base de datos----------------------------
async function asyncEliminarDato(){
    let collection = await EnableConnection()
    return new Promise((resolve, reject)=>{
        resolve( collection.deleteOne({last: "Sapia"}, (err, result) => {
            if(!err){
                console.log(chalk.green("Persona eliminada correctamente"));

            };
        }));
    });
}

//Funcion que permite mostrar datos en la base de datos----------------------------
async function asyncMostrarDatos(){
    let collection = await EnableConnection()
    return new Promise((resolve, reject)=>{
        collection.find().limit(20).toArray((err, result) => {
            if(!err){
                console.log(result);
            };
        });
    });
}

    
