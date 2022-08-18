const {Router} = require('express');
const {Recipe, Diet} = require('../db');
const {getApiInfo, getAllRecipe} = require('../controllers/recipe_controller.js');

const router = Router();

router.get('/recipes', async (req,res) => {
    try{
        let {name} = req.query;
        let todos = await getAllRecipe();

        if(name){
            if(
                name === '' ||
                name === ',' ||
                name === '-' ||
                name === '+' ||
                name === ':' 
            ){
                return res.status(404).send('No se permiten Simbolos');
            }
            let nombre = todos.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            nombre.length 
            ? res.status(200).send(nombre)
            : res.status(404).send('Tuvimos un error en name');
        } else{
            return res.status(200).send(todos);
        }
    } catch(error) {
        console.log(error);
    }
});

router.get('/recipes/:id', async (req,res) => {
    try{
        let {id} = req.params;
        const all = await getAllRecipe();

        if (id) {
            const fill = all.filter((e) => e.id == id);

            fill.length
            ? res.status(200).send(fill)
            : res.status(404).send('Does not exist'); 
        } else {
            return res.status(404).send('ID not found')
        }
    } catch(error){
        console.log(error);
    }
});

router.post('/recipe', async (req,res) => {
    try {
        const {
            name,
            image,
            diets,
            summary,
            health_score,
            dishtypes,
            step_by_step,
        } = req.body;

        const dietas = await Diet.findAll({
            where:{
                name: diets,
            },
        });

        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            health_score,
            dishtypes,
            step_by_step,

        });

        await newRecipe.addDiet(dietas);
        res.status(200).send('New Recipe Successfully created');
    } catch (error){
        console.log('Failed Creation');
    }
});