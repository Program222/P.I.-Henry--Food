import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FilterAZ,
    FilterCreated,
    FilterMaxScore,
    FilterTypeDiet,
    getDiets,
} from '../../redux/actions';
import Search from '../Search/Search';
import style from './Filters.module.css';
export default function Filters({ setCurrentPage, setOrder }) {
    const dispatch = useDispatch();
    const dieta = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function handleCreated(e) {
        e.preventDefault();
        dispatch(FilterCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleAZ(e) {
        e.preventDefault();
        dispatch(FilterAZ(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleScore(e) {
        e.preventDefault();
        dispatch(FilterMaxScore(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleTypeDiet(e) {
        e.preventDefault();
        dispatch(FilterTypeDiet(e.target.value));
        setCurrentPage(1);
    }
    return (
        <div className={style.flexi}>
            <div>
                <Search />
            </div>
            <div>
                <label className={style.tipo}>Filter Created/Api</label>
                <select onChange={(e) => handleCreated(e)}>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                </select>
            </div>
            <div>
                <label className={style.tipo}>Type of Diet</label>
                <select
                    onChange={(e) => handleTypeDiet(e)}
                    className={style.input}
                >
                    <option value="all">ALL</option>
                    {dieta?.map((e, k) => {
                        return (
                            <option key={k} value={e.name}>
                                {e.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className={style.tipo}>Orden</label>
                <select onChange={(e) => handleAZ(e)}>
                    <option value="all">ALL</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>
            <div>
                <label className={style.tipo}>Health Score</label>
                <select onChange={(e) => handleScore(e)}>
                    <option value="all">ALL</option>
                    <option value="max">Máx</option>
                    <option value="min">Min</option>
                </select>
            </div>
        </div>
    );
}
