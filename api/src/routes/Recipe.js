const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { getApiInfo, getAllRecipe } = require('../controllers/Recipe.Cont');

const router = Router();

router.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        let todos = await getAllRecipe();

        if (name) {
            if (
                name === ' ' ||
                name === ',' ||
                name === '-' ||
                name === '+' ||
                name === ':'
            ) {
                // console.log('Holaaaa');
                return res.status(404).send('No se permite simbolos');
            }
            // console.log(name);
            let nombre = todos.filter((e) =>
                e.name.toLowerCase().includes(name.toLowerCase())
            );
            // console.log(nombre.length);
            nombre.length
                ? res.status(200).send(nombre)
                : res.status(404).send('Tuvimos un error en name');
        } else {
            // console.log(todos);
            return res.status(200).send(todos);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        // console.log(typeof id);
        const all = await getAllRecipe();
        if (id) {
            const fill = all.filter((e) => e.id == id);
            // console.log(id);
            // console.log(fill.length);
            fill.length
                ? res.status(200).send(fill)
                : res.status(404).send('Does not exist');
        } else {
            return res.status(404).send('ID not found');
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
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
        // console.log(req.body);
        const dietas = await Diet.findAll({
            where: {
                name: diets,
            },
        });
        // console.log(dietas);
        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            health_score,
            dishtypes,
            step_by_step,
        });
        // console.log(newRecipe);
        await newRecipe.addDiet(dietas);
        res.status(200).send('New Recipe successfully created');
    } catch (error) {
        console.log('Fallo la creacion');
    }
});

module.exports = router;
