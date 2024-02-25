const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  // selecdt * from accounts
  return db('accounts');

}

const getById = id => {
  // DO YOUR MAGIC
  // select * from accounts where id=1
  //.first() is required because the where request (key value pair) returns a collection/array so to return only one you need .first()
  return db('accounts')
          .where("id", id).first()
}

const create = async account => {
  // DO YOUR MAGIC

  //insert into accounts (name, budget) values ('foo', 1000)
  // return db('accounts').insert(account, ['id'])
  
  const [id] = await db('accounts').insert(account)

  return getById(id)
}

const updateById = await (id, account) => {
  // DO YOUR MAGIC
  async db('accounts')
      .where('id', id)
      .update(account)

      return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  //delete from accounts where id = 1
  return db('accounts')
    .where('id', id)
    .del()

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
