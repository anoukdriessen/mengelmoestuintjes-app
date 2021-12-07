// import styling
import './styles/Content.css';

// data
import {
    getAllPages,
} from "../assets/data";

// page content
import {
    HomeContent,
    InfoContent
} from "../assets/content";

function PageContent( props ) {
    const pages = getAllPages();
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

    return <main className='page-undefined'>
        empty main container
    </main>;
}

function MainContent( props ) {
     return <div id="main" className={ props.thisPage.className }>
         <PageContent
            thisPage = { props.thisPage }
         />
     </div>;
}

export default MainContent;