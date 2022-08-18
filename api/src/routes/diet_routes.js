const {Router} = require('express');
const {getAllDiet} = require('../controllers/diet_controller.js');
const router = Router();

router.get('/diets', async (req,res) =>{
    try{
        const dieta = await getAllDiet();
        res.status(200).send(dieta);
    } catch(error){
        console.log(error);
    }
})

module.exports = router;