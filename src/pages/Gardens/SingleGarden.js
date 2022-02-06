import React, {useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import {GardensDataContextProvider} from "../../context/GardensDataContext";
import {ShowAndHideSingleGarden} from "../../components/listitems/ShowAndHide";
import GardenView from "../../components/listitems/Gardens/GardenView";



export function Garden() {

    const [viewOne, setViewOne] = useState(true);
    const [viewTwo, setViewTwo] = useState(false);
    const [viewThree, setViewThree] = useState(false);

    return <>
        <ShowAndHideSingleGarden
            one={viewOne}
            setOne={setViewOne}
            two={viewTwo}
            setTwo={setViewTwo}
            three={viewThree}
            setThree={setViewThree}
        />

        <div id='garden-content'>
            {viewOne && <GardenView type={1}/>}
            {viewTwo && <GardenView type={2}/>}
            {viewThree && <GardenView type={3}/>}
        </div>
    </>
}


function SingleGarden() {
    return <>
        <PageHeader title='Mengelmoestuintjes'/>
        <PageContent>
            <GardensDataContextProvider>
                <Garden/>
            </GardensDataContextProvider>
        </PageContent>
    </>
}

export default SingleGarden;