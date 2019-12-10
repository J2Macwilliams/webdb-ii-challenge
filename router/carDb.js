const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('cars');
}

function getById(id) {
  return db('')
    .where({ id })
    .first();
}

function insert(post) {
  return db('cars')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('cars')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('cars')
    .where('id', id)
    .del();
}