const express = require('express')
const Games   = require('../models/Games')
const router  = express.Router()

router.get('/', async (req, res) =>{

  const criteria = {
    limit:  10,
    page:   1,
    fields: 'title,usaRelease',
    orderBy:'title',
    sortBy: 1,
    q: 'Rare'
  }

  const result = await Games.find(criteria)

  return res.json({
    message: 'Games OK',
    data: result
  })
})

module.exports = router