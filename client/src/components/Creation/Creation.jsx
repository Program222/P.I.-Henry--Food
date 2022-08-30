import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getDiets } from '../../redux/actions';
import style from './Creation.module.css';

export default function Creation() {
    const dispatch = useDispatch();
    const dieta = useSelector((state) => state.diets);
    const [errors, setError] = useState({});
    const [input, setInput] = useState({
        name: '',
        image: '',
        summary: '',
        health_score: '',
        dishtypes: '',
        step_by_step: '',
        diets: [],
    });
    const history = useHistory();
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function validate() {
        let errors = {};
        if (!input.name || input.name.length < 3) {
            errors.name = 'Name Required';
        }
        if (input.summary.length < 20) {
            errors.summary = 'Summary min. 20 characters';
        }
        if (input.health_score < 0 || input.health_score > 100) {
            errors.health_score = 'Máx is 100';
        }
        if (!input.dishtypes) {
            errors.dishtypes = 'Type of dish is empty';
        }
        if (!input.image.includes('https')) {
            errors.image = 'Please insert an image type URL';
        }
        if (input.step_by_step.length < 60) {
            errors.step_by_step = 'Step by Step min. 60 characters';
        }
        return errors;
    }

    function handleChange(e) {
        // e.preventDeafult()
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value],
        });
    }

    function handleDelect(e) {
        setInput({
            ...input,
            diets: input.diets.filter((dieta) => dieta !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !input.name ||
            !input.image ||
            !input.summary ||
            !input.health_score ||
            !input.dishtypes ||
            !input.step_by_step ||
            !input.diets
        ) {
            alert('Some options are empty');
        } else {
            dispatch(postRecipe(input));
            setInput({
                name: '',
                image: '',
                summary: '',
                health_score: '',
                dishtypes: '',
                step_by_step: '',
                diets: [],
            });
            history.push('/home');
            window.location.reload();
        }
    }
    return (
        <div className={style.fondo}>
            <div>
                <Link to={'/home'}>
                    <button className={style.box}>Back to Home</button>
                </Link>
            </div>
            <h2 className={style.h2}>Create Your own Recipe!</h2>
            <form onSubmit={(e) => handleSubmit(e)} className={style.fondoform}>
                <button type="submit" className={style.boxes}>
                    Create
                </button>
                <div>
                    <div className={style.primero}>
                        <label className={style.definicion}>NAME</label>
                        <input
                            className={style.inputt}
                            type="text"
                            value={input.name}
                            placeholder="Name..."
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className={style.error}>{errors.name}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Image</label>
                        <input
                            className={style.inputt}
                            type="text"
                            name="image"
                            value={input.image}
                            placeholder="Image..."
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.image && (
                            <p className={style.error}>{errors.image}</p>
                        )}
                    </div>
                    {/* <br /> */}
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Health Score
                        </label>
                        <input
                            className={style.inputt}
                            type="number"
                            name="health_score"
                            value={input.health_score}
                            min="0"
                            max={'100'}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.health_score && (
                            <p className={style.error}>{errors.health_score}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Type of Dish
                        </label>
                        <input
                            type="text"
                            className={style.inputt}
                            value={input.dishtypes}
                            name="dishtypes"
                            placeholder="dishTypes..."
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.dishtypes && (
                            <p className={style.error}>{errors.dishtypes}</p>
                        )}
                    </div>
                </div>
                <div>
                    {/* <br /> */}
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Step By Step
                        </label>
                        <textarea
                            className={style.inputl}
                            value={input.step_by_step}
                            placeholder="Step by step..."
                            name="step_by_step"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.step_by_step && (
                            <p className={style.error}>{errors.step_by_step}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Summary</label>
                        {/* <input
                        type="text"
                        value={input.summary}
                        width="250px"
                        height={'250px'}
                    /> */}
                        <textarea
                            value={input.summary}
                            onChange={(e) => handleChange(e)}
                            placeholder="Summary..."
                            name="summary"
                            className={style.inputl}
                        />
                        {errors.summary && (
                            <p className={style.error}>{errors.summary}</p>
                        )}
                    </div>
                    {/* <br /> */}
                    <div className={style.definicion2}>
                        
                        <select
                            onChange={(e) => handleSelect(e)}
                            className={style.select}
                        >
                            <option>Type of diets</option>
                            {dieta?.map((e, k) => {
                                return (
                                    <option key={k} value={e.name}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </form>
            {input.diets?.map((e) => {
                return (
                    <div key={e} className={style.boxis}>
                        <p className={style.letra}>{e}</p>
                        <button
                            className={style.btnDelect}
                            onClick={() => handleDelect(e)}
                        >
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
