
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
      //create id 
      tbl.increments();

      //create name
      tbl
      .string('name', 128) //field name and character limit 
      .notNullable()
      .unique(); ////has to be unique name 

      tbl.timestamps(true, true); //created at and updated time
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
