import './styles/Card.css';
import {useState} from "react";


function Card( props ) {
    let stylingCard = props.styling + ' card';

    return <section
        className = { stylingCard }
    >
        <div className = 'card-header'>
            <h3>{ props.title }</h3>
        </div>
        <p className='card-body'>{ props.description }</p>
    </section>
}

export default Card;