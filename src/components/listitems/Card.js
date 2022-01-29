
function Card({useId, children, retro, className}) {
    // console.log(reverse);

    return <div id={useId} className={`card ${retro ? 'retro-style' : ''} ${className}`}>
        {children}
    </div>
}

Card.defaultProps = {
    retro: false
}

export default Card;