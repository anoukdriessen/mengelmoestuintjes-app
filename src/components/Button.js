function Button({children, version, type}) {
    return <button
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