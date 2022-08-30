import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
export default function LandingPage() {
    return (
        <div className={style.fondo}>
            {/* <div className={style.flex}> */}
            <Link to={'/home'}>
                <button className={style.box}>Open Selected Recipes</button>
            </Link>
            {/* </div> */}
        </div>
    );
}
