const express = require('express');
const router = express.Router();
const Account = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {// eslint-disable-line
  res.json(req.account) 
})

router.post('/', 
checkAccountPayload, 
checkAccountNameUnique, 
async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create({
       name: req.body.name.trim(),
      budget: req.body.budget,
      })
    res.status(201).json(newAccount)
  }catch(err) {
    next(err)
  }
})

router.put('/:id', 
checkAccountId, 
checkAccountPayload, 
async (req, res, next) => {
  // DO YOUR MAGIC
  try{ 
    const updated = await Account.updateById(req.params.id, req.body) 
    res.status(200).json(updated)
  }catch(err) {
    next(err)
  }
});

router.delete('/:id',
 checkAccountId,
  async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;