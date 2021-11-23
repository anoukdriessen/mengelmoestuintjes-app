function Card( { icon, title, description } ) {
    return <section>
        <span>{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
    </section>
}

export default Card;