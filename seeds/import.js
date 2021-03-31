// LER ARQUIVO `.JSON`
// FAZER UM LOOP ENTRE CADA UM DOS ITEMS
// SALVAR CADA UM DOS ITENS NO BANCO DE DADOS

// --- LER ARQUIVOS | BIBLIOTECA NATIVA DO NODEJS
const fs      = require('fs')

// --- INFORMAÇÕES  DO ARQUIVO DE CONFIGURAÇÕES
const dotenv  = require('dotenv')

// --- FACILITA O ACESSO AO MONGODB
const {Schema, model, connect} = require('mongoose');
const { resolve } = require('path');
const { rejects } = require('assert');

// LER CONFIGURAÇÕES DO ARQUIVO .DOTENV
dotenv.config();

// BANCO DE DADOS
const GameSchema = new Schema()

/**
 * RECEBER E TRATAR OS DADOS .JSON
 */
const parseJSON = (data) =>{
  try {
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/**
 * CONEXÃO COM O BANCO DE DADOS
 *   
 */
const connectToDB = () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  }
  return connect (process.env.DATABASE, options)
}
 
/**
 * LER ARQUIVOS ONDE CONTÉM OS JOGOS
 * 
 */
const readGamesFromFile = (filename => {// Conectar com o banco de dados
  const promisseCallback = (resolve, reject) => {
    fs.readFile(filename, (err, data) =>{
      if(err) return reject(err)
      const json = parseJSON(data)
      if(!json) return reject(`Not Able to parse JSON file ${filename}`)
      return resolve(json)
    })
  }
  return new Promise(promisseCallback)
})

/**
 * LOOP ENTRE CADA UM DOS ITENS
 */
const importGames = async () => {
  const games = await readGamesFromFile('games.json')
  for(let i = 0; i < games.length; i++){
    const game = games[i]
    console.log(game.title)
  }
}

/**
 * IMPORTAR AS INFORMAÇÕES DO ARQUIVO PARA O BANCO DE DADOS
 */
const storeGame = (data) => {

}


importGames()