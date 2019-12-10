const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('');
}

function getById(id) {
  return db('')
    .where({ id })
    .first();
}

function insert(post) {
  return db('')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('')
    .where('id', id)
    .del();
}