import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    getDetail,
    cleanDiets,
    cleanRecipe,
    cleanDetail,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import style from './Detail.module.css';
export default function Detail() {
    const dispatch = useDispatch();
    const detalles = useSelector((state) => state.details);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    function back() {
        dispatch(cleanDetail(dispatch));
    }

    return (
        <div className={style.fondo}>
            {detalles.length > 0 ? (
                <div className={style.div}>
                    <div>
                        <h2 className={style.sub}>
                            {detalles[0].name.toUpperCase()}
                        </h2>
                        <img
                            className={style.img}
                            src={detalles[0].image}
                            alt="img not found"
                            width={'250px'}
                            height={'250px'}
                        />
                        <h3>Diets:</h3>
                        {detalles[0].diets.length === 0 ? (
                            <p className={style.nopasos}>There is no diet </p>
                        ) : (
                            <p className={style.nopasos}>
                                {detalles[0].diets.map((e) => e.name + ',')}
                            </p>
                        )}
                    </div>
                    <div>
                        <h3>Health Score: {detalles[0].health_score}º</h3>
                        <h3>Type of dish:</h3>
                        <p className={style.nopasos}>
                            {detalles[0].dishtypes.toString()}
                        </p>
                        <h4>Summary:</h4>
                        {detalles[0].summary.length === 0 ? (
                            <p className={style.parrafo}>There is no Summary</p>
                        ) : (
                            <p className={style.parrafo}>
                                {detalles[0].summary.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </div>
                    <div className={style.step}>
                        <h4>Step By Step:</h4>
                        {!detalles[0].step_by_step ? (
                            <p className={style.nopasos}>
                                There is no step by step
                            </p>
                        ) : typeof detalles[0].step_by_step === 'object' &&
                          detalles[0].step_by_step.length > 0 ? (
                            detalles[0].step_by_step.map((e, k) => {
                                return (
                                    <p className={style.pasos} key={k}>
                                        Paso Nº{e.number}:{e.step}
                                        <br />
                                    </p>
                                );
                            })
                        ) : typeof detalles[0].step_by_step === 'object' &&
                          detalles[0].step_by_step.length === 0 ? (
                            <p className={style.nopasos}>
                                There is no step by step
                            </p>
                        ) : (
                            <p className={style.otro}>
                                {detalles[0].step_by_step}
                            </p>
                        )}
                    </div>
                    <div>
                        <Link to={'/home'}>
                            <button
                                className={style.box}
                                onClick={() => back()}
                            >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={style.cargando}>
                    <Loading />
                </div>
            )}
        </div>
    );
}
