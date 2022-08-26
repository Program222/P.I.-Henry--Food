import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe, cleanRecipe } from '../../redux/actions';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Filters from '../Filters/Filters';
import Loading from '../Loading/Loading';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';
import style from './Home.module.css';
export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const [loading, setLoading] = useState(true);
    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipeForPage, setRecipeForPage] = useState(9);
    const [order, setOrder] = useState('');
    const indexLastR = currentPage * recipeForPage;
    const indexFirtsR = indexLastR - recipeForPage;
    const allrecipes = recipes.slice(indexFirtsR, indexLastR);
    //
    useEffect(() => {
        dispatch(getRecipe());
    }, [dispatch]);

    if (allrecipes.length > 0 && loading) {
        setLoading(false);
    }

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleResert(e) {
        e.preventDefault();
        dispatch(cleanRecipe(dispatch));
        dispatch(getRecipe());
        window.location.reload();
    }
    return (
        <div className={style.fondo}>
            {recipes.length > 0 && !loading ? (
                <div>
                    <NavBar />
                    <div>
                        <div className={style.filt}>
                            <Filters
                                setCurrentPage={setCurrentPage}
                                setOrder={setOrder}
                            />
                        </div>
                        <div className={style.filt2}>
                            <button
                                onClick={(e) => handleResert(e)}
                                className={style.box}
                            >
                                Clear Filters
                            </button>
                        </div>
                        <div>
                            <div>
                                <Pagination
                                    paginado={paginado}
                                    recipes={recipes.length}
                                    recipeForPage={recipeForPage}
                                />
                            </div>
                            <div className={style.cards}>
                                {allrecipes?.map((e) => {
                                    return (
                                        <div key={e.id}>
                                            <Card
                                                key={e.id}
                                                id={e.id}
                                                image={e.image}
                                                name={e.name}
                                                diets={e.diets}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : !recipes.length > 0 && loading ? (
                <div className={style.cargar}>
                    {/* <h2>Loading</h2> */}
                    <Loading />
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}
