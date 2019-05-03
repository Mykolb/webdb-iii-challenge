
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Luis H.', cohort_id: '1'},
        {name: 'Brandy M.', cohort_id: '2'},
        {name: 'Peter G.', cohort_id: '3'}
      ]);
    });
};
