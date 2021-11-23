import Home from "../pages/Home";
// importeer afbeeldingen
import herfst from '../assets/herfst.jpg';
import lente from '../assets/lente.jpg';
import winter from '../assets/winter.jpg';
import zomer from '../assets/zomer.jpg';

function HomePageCoverImage( {thisMonth} ) {
    // 0 = lente, 1 = zomer, 2 = herfst, 3 = winter
    const seasonalImage = [lente, zomer, herfst, winter];
    let thisSeason;

    switch (thisMonth) {
        // maart begint LENTE
        case 2:
        case 3:
        case 4:
            thisSeason = seasonalImage[0];
            break;
        // juni begin ZOMER
        case 5:
        case 6:
        case 7:
            thisSeason = seasonalImage[1];
            break;
        // september begin HERFST
        case 8:
        case 9:
        case 10:
            thisSeason = seasonalImage[2];
            break;
        // december begin WINTER
        case 11:
        case 0:
        case 1:
            thisSeason = seasonalImage[3];
            break;
        // ZOMER by default
        default: thisSeason = seasonalImage[1];
    }

    return <div className="left-side">
        <img id='seasonal-cover' src={thisSeason} alt='seasonal'/>
    </div>
}


function LeftSide( { isHomePage, thisMonth } ) {
    if (isHomePage) {
        return <HomePageCoverImage
            thisMonth = {thisMonth}
        />
    }

    return <div className="left-side">
        left
    </div>
}

export default LeftSide;