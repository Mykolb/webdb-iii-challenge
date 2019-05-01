
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'IOS 3'},
        {name: 'Web 18'},
        {name: 'WebPT 10'}
      ]);
    });
};
