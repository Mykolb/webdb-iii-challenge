
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      //create id that auto increments
      tbl.increments();

      //create name 
      tbl 
      .string('name', 128) //field name and character limit 
      .notNullable()
      .unique(); //has to be unique name 

      //foreign key 
      tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts') //table we want to reference
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      tbl.timestamps(true, true)
      
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
