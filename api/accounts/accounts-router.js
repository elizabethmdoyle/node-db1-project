const router = require('express').Router()
const mid = require('./accounts-middleware');
const Account = require('./accounts-model');


router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', mid.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  //rest of code is set in the middleware, and accont is added to the req obj
    res.json(req.account)
 
})

router.post('/', mid.checkAccountPayload, mid.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
   try{
    const newAccount = await Account.create(req.body)
     res.status(201).json(newAccount)

  } catch(err) {
    next(err)
  }
})

router.put('/:id', mid.checkAccountId, mid.checkAccountNameUnique, mid.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
   try{
    const updatedAccount = await Account.updateById(req.params.id)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', mid.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    await Account.deleteById(req.params.id)
      res.json(req.account)
  } catch(err) {
    next(err)
  }
  
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  //error handling middleware where if the routes above throw an error, it redirects them to this router
   res.status(err.status || res.status(500).json({ message: err.message}))

})

module.exports = router;
