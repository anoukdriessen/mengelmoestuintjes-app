
function Card({children, retro}) {
    // console.log(reverse);

    return <div className={`card ${retro ? 'retro-style' : ''}`}>
        {children}
    </div>
}

Card.defaultProps = {
    retro: false
}

export default Card;