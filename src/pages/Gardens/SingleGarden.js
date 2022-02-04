import React, {useContext, useEffect, useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensDataContext, {GardensDataContextProvider} from "../../context/GardensDataContext";
import {ShowAndHideSingleGarden} from "../../components/listitems/ShowAndHide";
import GardenView from "../../components/listitems/Gardens/GardenView";
import {AuthDataContext} from "../../context/AuthDataContext";
import {useHistory} from "react-router-dom";

export function Garden() {
    const { auth } = useContext(AuthDataContext);

    const history = useHistory();

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
            {/*{viewThree && <GardenView type={3} garden={garden}>*/}
            {/*    { fields && fields.map((field) => {*/}
            {/*        return <p>{field.name}</p>*/}
            {/*    })}*/}
            {/*</GardenView>}*/}
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