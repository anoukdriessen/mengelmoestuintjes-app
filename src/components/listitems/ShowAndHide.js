import {FiEye, FiEyeOff} from "react-icons/fi";
import {GiInfo, GiPlantSeed, GiSeedling} from "react-icons/all";

/**
 * Show and Hides elements from content, show only one item at the time
 * switch between items by clicking the icon
 * @param one item one
 * @param setOne setter for item one
 * @param iconOne icon for item one
 * @param two item two
 * @param setTwo setter for item two
 * @param iconTwo icon for item two
 * @param three item three
 * @param setThree setter for item three
 * @param iconThree icon for item three
 * @returns {JSX.Element}
 */
export function ShowAndHideSingleGarden({one, setOne, two, setTwo, three, setThree}) {
    let size = 45;
    return <div className='show-and-hide garden'>
        <span onClick={() => {
            // select current and disable others
            setOne(true); // CURRENT
            setTwo(false);
            setThree(false);
        }} >
            <GiInfo className={one ? 'selected' : 'hidden'} size={size}/>
        </span>
        <span onClick={() => {
            // select current and disable others
            setOne(false);
            setTwo(true); // CURRENT
            setThree(false);
        }}>
            <GiPlantSeed className={two ? 'selected' : 'hidden'}  size={size}/>
        </span>
        <span onClick={() => {
            // set current and disable others
            setOne(false);
            setTwo(false);
            setThree(true);// CURRENT
        }}>
            <GiSeedling className={three ? 'selected' : 'hidden'}  size={size}/>
        </span>
    </div>
}

/**
 * Shows and Hides elements from content, show all, show selected or show none
 * @param setOne setter for item one
 * @param one item one
 * @param titleOne describe item one
 * @param setTwo setter for item two
 * @param two item two
 * @param titleTwo describe item two
 * @param setThree setter for item three
 * @param three item tree
 * @param titleThree setter for item three
 * @returns {JSX.Element}
 */
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