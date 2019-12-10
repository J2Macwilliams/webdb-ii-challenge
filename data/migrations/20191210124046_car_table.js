
exports.up = function(knex) {
  return knex.schema.createTable('cars', cars => {
      cars.increment();
      cars.string('VIN', 255)
      .notNullable()
      .unique()
      .index();
      cars.string('make', 255)
      .notNullable()
      .unique()
      .index();
      cars.string('model', 255)
      .notNullable()
      .unique()
      .index();
      cars.integer('mileage')
      .notNullable()
      .unique()
      .index();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
