
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, 
          name: 'Luis H.', 
          cohort_id: 'Web 18'
        },
        {id: 2, 
          name: 'Brandy M.', 
          cohort_id: 'IOS 3'
        },
        {id: 3, 
          name: 'Peter G.', 
          cohort_id: 'WebPT 10' 
        }
      ]);
    });
};
