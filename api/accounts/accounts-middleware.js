const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const error = {status: 400}
  const { name, budget } = req.body;

  if(!name === undefined || !budget === undefined) {
    error.message = 'name and budget are required'
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof(budget) !== 'number') {
    error.message = 'budget of account must be a number'
  } else if (typeof budget !== 'number' || isNaN()) {
    error.message = 'budget of account must be a number'
  } else if ( budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }

  if ( err.message) {
    next(err)
  }


  }




exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  
  
  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    const account = await Account.getById(req.params.id)

    if(!account) {
     next({status: 404, message: 'account not found' })
    } else {
      // next({status: 500, message: 'internal error getting accounts'})

       //attaches the account itself to the req object, so it can be accessed in the router by req.account
       req.account = account
       next()

    }
    
  } catch(err) {
    next(err)
  }

}
