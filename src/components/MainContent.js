// import styling
import './styles/Content.css';

// data
import {
    getAllPages,
} from "../assets/data";

import {
    HomeContent,
} from "../pages/Home";
import {InfoContent} from "../pages/Info";

const pages = getAllPages();

function PageContent( props ) {
    console.log('content' + props.thisPage);
    const page = props.thisPage;

    // check if page exists
    if (page) {
        // switch between possible pages
        switch (page) {
            case pages[0]:
                return <HomeContent
                    content = { page.content }
                />
            case pages[1]:
                return <InfoContent
                    content = { page.content }
                />
        }
    }

    return <main style='border: 2px solid lightblue'>
        <p>empty main container</p>
    </main>;
}

function MainContent( props ) {
     return <div id="main">
         <PageContent
            thisPage = { props.thisPage }
         />
     </div>;
}

export default MainContent;