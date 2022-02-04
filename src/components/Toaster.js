import '../styles/toaster.css'

function Toaster() {
    let message = "aksdlkajsldjasldjlaskjd";

    return <div id={'toaster'}>
        <div className={'toast'}>
            <p>{message}</p>
        </div>
        <div className={'toast success'}>
            {message}
        </div>
        <div className={'toast warning'}>
            {message}
        </div>
        <div className={'toast error'}>
            {message}
        </div>
    </div>
}

export default Toaster;