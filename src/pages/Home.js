import '../components/pageitems/PageStyling.css'
import MultiPanelContainer from "../components/containers/MultiPanelContainer";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import Button from "../components/Button";
import {useState} from "react";
import {GiWheat, GiWoodenFence, RiPlantLine} from "react-icons/all";
import PostCards from "../components/containers/PostCards";
import {GiWoodenSign} from "react-icons/gi";
import {PostDataContextProvider} from "../context/PostDataContext";

function Home() {
    const [hovered, isHovered] = useState(false);
    return <>
        <PageHeader
            title='Mengelmoestuintjes'
        />

        <PageContent>
            <MultiPanelContainer type='missions' title='Onze missie'/>
            <Button version='call-to-action'>
                    Maak een Tuintje
            </Button>

            <PostDataContextProvider>
                <PostCards
                    title='Recente blogberichten'
                    type='blog'
                    num={3}
                />
            </PostDataContextProvider>
        </PageContent>
    </>
}

export default Home;