const express = require('express');
const data = require('../data/data.json');
const axios = require('axios');
const bodyParser = require('body-parser');
const Joi = require('joi');

const router = express.Router();
const jsonParser = bodyParser.json();

const schema = Joi.object({
    animalname: Joi.string().min(5).required(),
    breedname: Joi.string(),
    animalage: Joi.string().required(),
    basecolour: Joi.string()
});

let animals = [];
for (let i = 0; i< 100; i++) {
  animals.push(data[i]);
}

router.get('/',  function(_, res) {
    res.send(animals);
});


router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.send(animals.find(animal => animal.id == id));
});


router.post('/',jsonParser, (req, res) => {
    const { 
            animalname,
            breedname,
            basecolour,
            speciesname,
            animalage
            } = req.body;

    const result = schema.validate({animalname,
        breedname,
        basecolour,
        animalage});
    
    if (result.error) 
        return res.status(400).send(result.error.details[0].message);
  
    const id = animals.length + 1;
    animals.push({id,
               animalname,
               breedname,
               basecolour,
               speciesname,
               animalage
    });
    res.send({id,
        animalname,
        breedname,
        basecolour,
        speciesname,
        animalage
    });
});

router.put('/:id', jsonParser, (req, res) => {
    
    const { id } = req.params;
    const { animalname = '',
            breedname = '',
            basecolour = '',
            speciesname = '',
            animalage = ''
    } = req.body;

    const result = schema.validate({animalname,
        breedname,
        basecolour,
        animalage});
    
    if (result.error) 
        return res.status(400).send(result.error.details[0].message);

    const animal = animals.find(animal => animal.id == id);

    animal.animalage = animalage.length === 0 ? animal.animalage: animalage;
    animal.animalname = animalname.length === 0 ? animal.animalname: animalname;
    animal.breedname = breedname.length === 0 ? animal.breedname: breedname;
    animal.basecolour = basecolour.length === 0 ? animal.basecolour: basecolour;
    animal.speciesname = speciesname.length === 0 ? animal.speciesname: speciesname;

    res.send({id,
        animalname,
        breedname,
        basecolour,
        speciesname,
        animalage
    });
});

router.delete('/:id', jsonParser, (req, res) => {
    const {id} = req.params;
  
    const index = animals.findIndex(animal => animal.id == id);
    const animal = animals.splice(index, 1);
  
    const { 
        animalname,
        breedname,
        basecolour,
        speciesname,
        animalage,
        owner =''} = animal[0];

    res.send({id,
        animalname,
        breedname,
        basecolour,
        speciesname,
        animalage,
        owner});
  });

module.exports = router;