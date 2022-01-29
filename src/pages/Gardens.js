import {AuthDataContext} from "../context/AuthDataContext";
import {useContext} from "react";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import GardensList from "../components/listitems/Gardens/GardensList";
import {GardensDataContextProvider} from "../context/GardensDataContext";
import {UserDataContextProvider} from "../context/UserDataContext";

function Gardens() {
    const { auth } = useContext(AuthDataContext);

    return <>
        <PageHeader title={auth.user.username + '\'s Mengelmoestuintjes'}/>

        <PageContent>
            <UserDataContextProvider>
                <GardensDataContextProvider>
                    <GardensList/>
                </GardensDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
    </>
}

export default Gardens;