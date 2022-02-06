import {AuthDataContext} from "../../context/AuthDataContext";
import {useContext, useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensList from "../../components/listitems/Gardens/GardensList";
import  {GardensDataContextProvider} from "../../context/GardensDataContext";
import {UserDataContextProvider} from "../../context/UserDataContext";
import { BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import { FiX} from "react-icons/fi";
import FormGarden from "../../components/forms/FormGarden";

function Gardens() {
    const { auth } = useContext(AuthDataContext);
    const [createNew, toggleCreateNew] = useState(false);

    return <>
        <PageHeader title={auth.user.username + '\'s Mengelmoestuintjes'}/>
        <PageContent>
            <UserDataContextProvider>
                <GardensDataContextProvider>
                    <BasicPageContentNav
                        hasCreate={true}
                        showCreate={createNew}
                        toggleShowCreate={toggleCreateNew}
                    >
                        { createNew && <>
                            <span className={'link action'} onClick={
                                () => {
                                    toggleCreateNew(false);
                                }
                            }><FiX/></span>
                        </>}
                    </BasicPageContentNav>

                    { createNew
                        ? <FormGarden/>
                        : <GardensList/>
                    }

                </GardensDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
    </>
}

export default Gardens;