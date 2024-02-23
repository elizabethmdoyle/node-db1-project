const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try{ 
    res.json('get account')
  } catch(err) {
    next({status: 422. message: 'this is horrible'})
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('get account by id')
  } catch(err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
   try{
     res.json('Post account')

  } catch(err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
   try{
    res.json('update account')
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
   try{
      res.json('delete account')
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  //error handling middleware where if the routes above throw an error, it redirects them to this router
   res.status(err.status || res.status(500).json({ message: err.message}))

})

module.exports = router;
