/**
 * Módulo de conexão com o banco de dados
 * Uso do mongoose
 */

const mongoose = require('mongoose')

// definir a URL e autenticação do banco de dados
const url = ''

// status de conexão ("ícone de conexão")
let isConnected = false

// Só estabelecer uma conexão se não estiver conectado 
const dbConnect = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar
const conectar = async () => {
    if (isConnected === false) {
        try {
            // a linha abaixo abre a conexão com o MongoDB
            await mongoose.connect(url)
            isConnected = true //sinalizar que o banco está conectado
            console.log("MongoDB conectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            // a linha abaixo encerra a conexão com o MongoDB
            await mongoose.disconnect(url)
            isConnected = false //sinalizar que o banco não está conectado
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// exportar para p main as funções desejadas
module.exports = {dbConnect, desconectar}
