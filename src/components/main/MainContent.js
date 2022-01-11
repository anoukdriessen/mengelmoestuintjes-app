import './styles/MainContent.css';
import { getAllPages } from "../../assets/data";
import {
    InfoContent
} from "../../assets/content";
import { HomeContent } from "../../pages/Home";

function PageContent( props ) {
    const pages = getAllPages();
    const page = props.thisPage;

    if (page) {
        // switch between possible pages to show correct content
        switch (page) {
            case pages[0]: // homepage
                return <HomeContent
                    content = { page.content }
                />
            case pages[1]: // info page
                return <InfoContent
                    content = { page.content }
                />
            default:
                return <></>
        }
    }

    // page does not exist / is undefined
    return <main className='page-undefined'>
        <p className='error'> empty main container </p>
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