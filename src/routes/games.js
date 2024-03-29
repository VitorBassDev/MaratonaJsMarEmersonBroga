const express = require('express')
const Games   = require('../models/Games')
const router  = express.Router()

router.get('/', async (req, res) =>{

  const {limit, page, fields, orderBy, sortBy, q} = req.query;
  const DEFAULT_LIMIT = 10
  const DEFAULT_PAGE  = 1
  
  const criteria = {
    limit:  Number(limit) || DEFAULT_LIMIT,
    page:   Number(page)  || DEFAULT_PAGE,
    fields: fields        || null,
    orderBy: orderBy      || 'title',
    sortBy:  sortBy       !=  undefined ? Number(sortBy) : 1,
    q: q                  || null
  }

  const result = await Games.find(criteria)

  return res.json({
    message: 'Games OK',
    data: result
  })
})

router.post('/', async (req, res) => {
  const {body} = req;
  const data   = await Games.store(body)

  console.log(body)
  return res.json({
    message: "Game Stored",
    data: data

  })
})

router.patch('/:id', async (req, res) => {

  const {body, params} = req
  const {id} = params;

  const game = await Games.update(id, body)
  console.log(id, body)
  return res.json({
    message: "Game Update",
    data: game
  })
})

router.delete('/:id', async (req, res) =>{
  const {params} = req
  const {id}     = params

  const result   = await Games.destroy(id)

  return res.json({
    message: "Game Deleted",
    data: result
  })
})

module.exports = router