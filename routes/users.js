const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const Joi = require('joi');

const router = express.Router();
const jsonParser = bodyParser.json();

const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    age: Joi.number().required().min(0)
});

let users = [{id: 1, fullname: "Luis", age: 24}];

router.get('/',  function(_, res) {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.send(users.find(user => user.id == id));
});

router.post('/',jsonParser, (req, res) => {
    const {fullname,age} = req.body;

    const result = schema.validate({fullname,age});
    
    if (result.error) 
        return res.status(400).send(result.error.details[0].message);
  
    const id = users.length + 1;
    users.push({id,
               fullname,
               age
    });
    res.send({id,
        fullname,
        age
    });
});

router.put('/:id', jsonParser, (req, res) => {
    
    const { id } = req.params;
    const { fullname = '', age = '' } = req.body;

    const result = schema.validate({fullname,age});
    
    if (result.error) 
        return res.status(400).send(result.error.details[0].message);

    const user = users.find(user => user.id == id);

    user.fullname = fullname.length === 0 ? user.fullname: fullname;
    user.age = age === 500 ? user.age: age;


    res.send({id,
        fullname,
        age
    });
});

router.delete('/:id', jsonParser, (req, res) => {
    const {id} = req.params;
  
    const index = users.findIndex(user => user.id == id);
    const user = users.splice(index, 1);
  
    const { fullname,age} = user[0];

    res.send({id,
        fullname,
        age});
  });

module.exports = router;