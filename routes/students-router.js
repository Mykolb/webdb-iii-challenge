const knex = require('knex');
const router = require('express').Router();


const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3',
    },
    useNullAsDefault: true, // needed for sqlite
  };

const studentDb = knex(knexConfig);

//******REQUESTS*********
//GET 
//Working
router.get('/', (req, res) => {
    //select * from student
    studentDb('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Matching cohort could not be found'})
    })
})


//GET by ID 
//
router.get('/:id', (req, res) => {
 studentDb('students')
    .join()
    .where({ id: req.params.id })
    .first()
    .then(student => {
        if(student) {
          res.status(200).json(student);
        } else {
        res.status(404).json({ message: 'The cohort associated with this id cannot be found' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
    })
});



//POST 
//Working
router.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(404).json({ message: 'The name associated with with this student could not be found'})
        } else { 
    studentDb('students')
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
    studentDb('students')
    .where({ id: req.params.id})
    .update(req.body)
    .then(student => {
        if(student === 0) {
            res.status(404).json({ message: 'The student associated with this id cannot be found' }); 
        } else {
            res.status(201).json(student)
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error updating the data'})
    })
})

//DELETE 
//WORKING
router.delete('/:id', (req, res) => {
    studentDb('students')
    .where({ id: req.params.id})
    .del()
    .then(student => {
        if(student === 1) {
            res.status(200).end()
        }
    })
    .catch(error => {
        res.status(500).json({ error: err, message: 'There was an error deleting the data'})
    })
})





module.exports = router;