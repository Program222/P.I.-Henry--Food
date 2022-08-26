const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { YOUR_API_KEY } = process.env;
// const getApiInfo = async () => {
//     try {
//         let json = await axios.get(
//             `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
//         );
//         let data = json.data.results;
//         // console.log(data);

//         let all = data.map((e) => {
//             return {
//                 id: e.id,
//                 image: e.image,
//                 name: e.title.toLowerCase(),
//                 diets: e.diets.map((e) => {
//                     return { name: e };
//                 }),
//                 summary: e.summary,
//                 health_score: e.healthScore,
//                 dishtypes: e.dishTypes,
//                 step_by_step: e.analyzedInstructions[0]?.steps.map((e) => {
//                     return {
//                         number: e.number,
//                         step: e.step,
//                     };
//                 }),
//             };
//         });

//         console.log(all.length);
//         return all;
//     } catch (error) {
//         console.log(`Tuvimos un ${error}`);
//     }
// };

// ----PROMISE
const getApiInfo = () => {
    // let total = axios
    return axios
        .get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
        )
        .then((resolve) =>
            resolve.data.results.map((e) => {
                return {
                    id: e.id,
                    image: e.image,
                    name: e.title.toLowerCase(),
                    diets: e.diets.map((e) => {
                        return { name: e };
                    }),
                    summary: e.summary,
                    health_score: e.healthScore,
                    dishtypes: e.dishTypes,
                    step_by_step: e.analyzedInstructions[0]?.steps.map((e) => {
                        return {
                            number: e.number,
                            step: e.step,
                        };
                    }),
                };
            })
        )
        .catch('Holaaa tuvimos un error getApiInfo');
    // console.log(total.length);

    // return total;
};

const getDBInfo = async () => {
    const db = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    // console.log(db);
    return db;
};

const getAllRecipe = async () => {
    try {
        const api = await getApiInfo();
        // console.log(typeof api);
        const db = await getDBInfo();
        const all = api.concat(db);
        // console.log(all.length);
        return all;
    } catch (error) {
        console.log('Tuvimos un error suma entre la API y la DB');
    }
};

module.exports = { getApiInfo, getDBInfo, getAllRecipe };
