require('dotenv/config');

// INICIAR O EXPRESS
const express     = require('express')
const gamesRouter = require ('./routes/games')

const app = express();

// RECEBER DADOS EM JSON
app.use(express.json())

app.get("/", (req, res) =>{
  return res.json({
    message: "API OK"
  })
})

app.use('/games', gamesRouter)

// INICIAR O SERVIDOR
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Backend Is running on PORT`, process.env.SERVER_PORT)
});