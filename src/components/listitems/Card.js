
function Card({useId, children, retro}) {
    // console.log(reverse);

    return <div id={useId} className={`card ${retro ? 'retro-style' : ''}`}>
        {children}
    </div>
}

Card.defaultProps = {
    retro: false
}

export default Card;