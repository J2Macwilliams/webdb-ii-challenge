
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { id: 1, VIN: 'KJ4879572HT986757', make: 'TOYOTA', model: 'RAV4', mileage: 90756, engine: '2.5 L 4-cylinder', transmission: 'AWD', title_status: 'clean'},
        { id: 2, VIN: '46FYT637DJT784JCF', make: 'HONDA', model: 'FIT', mileage: 40345, engine: '1.5 L 4-cylinder', transmission: 'Front-Wheel-Drive', title_status: 'clean'},
        { id: 3, VIN: '35D7RH567W7CQ1096', make: 'TOYOTA', model: 'COROLLA', mileage: 60489, engine: '1.8 L 4-cylinder', transmission: 'Front-Wheel-Drive', title_status: 'clean'},
        { id: 4, VIN: '1HR6FN69EUH78DUNG', make: 'HONDA', model: 'CIVIC', mileage: 80597, engine: '1.3 L 4-cylinder', transmission: 'Front-Wheel-Drive', title_status: 'clean'},
        { id: 5, VIN: '95JF85JE7610FUR08', make: 'DODGE', model: 'SHADOW', mileage: 90756, engine: '2.2 L 4-cylinder', transmission: '', title_status: ''},
        { id: 6, VIN: 'JT83O5I279MQ19JB9', make: 'CHRYSLER-PLYMOUTH', model: 'SUNDANCE', mileage: 110256, engine: '2.2 L 4-cylinder', transmission: '', title_status: ''}
      ]);
    });
};
