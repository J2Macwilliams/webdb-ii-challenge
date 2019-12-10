
exports.up = function(knex) {
  return knex.schema.createTable('cars', cars => {
      cars.increments();
      cars.string('VIN', 17)
      .notNullable()
      .unique()
      .index();
      cars.string('make', 255)
      .notNullable()
      .index();
      cars.string('model', 255)
      .notNullable()
      .index();
      cars.integer('mileage')
      .notNullable()
      .index();
      cars.string('transmission', 150)
      .index();
      cars.string('title_status', 150)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
