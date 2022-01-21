function Button({id, children, version, type}) {
    return <button
        id={id}
        type={type}
        className={`btn btn-${version}`}>
        {children}
    </button>
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
}

export default Button;