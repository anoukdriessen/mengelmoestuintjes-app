
function Card({children, reverse}) {
    // console.log(reverse);

    return <div className={`card ${reverse && 'reverse'}`}>
        {children}
    </div>
}

Card.defaultProps = {
    reverse: false
}

export default Card;