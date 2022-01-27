import {FiEye, FiEyeOff} from "react-icons/fi";

function ShowAndHide({setOne, one, titleOne, setTwo, two, titleTwo, setThree, three, titleThree}) {
        const getElement = (setShow, show, title) => (
            <span onClick={() => setShow(prevState => !prevState)} className={show ? 'selected' : 'hidden'}>
                { show ? <FiEye size={17}/> : <FiEyeOff size={17}/> }
                { show ? `${title}` : `${title}` }
            </span>);

        return <div className='show-and-hide'>
            { getElement(setOne, one, titleOne)}
            { getElement(setTwo, two, titleTwo)}
            { getElement(setThree, three, titleThree)}
        </div>
}

export default ShowAndHide;