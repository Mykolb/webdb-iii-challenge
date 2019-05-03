const knex = require('knex');
const router = require('express').Router();


const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3',
    },
    useNullAsDefault: true, // needed for sqlite
  };

const cohortDb = knex(knexConfig);

//******REQUESTS*********
//GET 
//WORKING
router.get('/', (req, res) => {
    //select * from cohortDb
    cohortDb('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Matching cohort could not be found'})
    })
})


//GET by ID 
//select * from roles where id = :id
//Working
router.get('/:id', (req, res) => {
 cohortDb('cohorts')
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
        if(cohort) {
          res.status(200).json(cohort);
        } else {
        res.status(404).json({ message: 'The cohort associated with this id cannot be found' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
    })
});

//GET FOR STUDENTS WITH COHORT ID
router.get('/:id/students', (req, res) => {
    const id = req.params.id;

    cohortDb('cohorts')
       .join("students", "students.cohort_id", "cohorts.id")
       .select("students.id", "students.name") 
       .where("cohort_id", id)
       .first()
       .then(students => {
           if(students) {
             res.status(200).json(students);
           } else {
           res.status(404).json({ message: 'The student associated with this id cannot be found' });
           }
       })
       .catch(err => {
           res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
       })
   });


//POST 
//WORKING
router.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(404).json({ message: 'The name associated with with this cohort could not be found'})
        } else { 
    cohortDb('cohorts')
    .insert(req.body, 'name')
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error creating the data'})
    })
}
})
   

//PUT 
//Working
router.put('/:id', (req, res) => {
    cohortDb('cohorts')
    .where({ id: req.params.id})
    .update(req.body)
    .then(cohort => {
        if(cohort === 0) {
            res.status(404).json({ message: 'The cohort associated with this id cannot be found' }); 
        } else {
            res.status(201).json(cohort)
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error updating the data'})
    })
})

//DELETE 
//WORKING
router.delete('/:id', (req, res) => {
    cohortDb('cohorts')
    .where({ id: req.params.id})
    .del()
    .then(cohort => {
        if(cohort === 1) {
            res.status(200).end()
        }
    })
    .catch(error => {
        res.status(500).json({ error: err, message: 'There was an error deleting the data'})
    })
})





module.exports = router;