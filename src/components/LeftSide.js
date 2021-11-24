import './styles/Container.css'
import CoverImage from "./CoverImage";

function LeftSide( { thisPage, thisMonth } ) {
    // op de homepagina tonen we een seasonal cover image
    if (thisPage === 'home') {
        return <CoverImage
            thisMonth = {thisMonth}
        />
    }

    return <div className="left-side">
        left
    </div>
}

export default LeftSide;