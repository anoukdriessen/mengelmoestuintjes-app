import {AuthDataContext} from "../../context/AuthDataContext";
import {useContext, useState} from "react";
import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import GardensList from "../../components/listitems/Gardens/GardensList";
import GardensDataContext, {GardensDataContextProvider} from "../../context/GardensDataContext";
import {UserDataContextProvider} from "../../context/UserDataContext";
import {ActionLink, BasicPageContentNav} from "../../components/pageitems/PageContentNav";
import {FiEdit3, FiX} from "react-icons/fi";
import {FiArrowDown, FiArrowLeft, FiXCircle, GiSave} from "react-icons/all";
import Form from "../../components/forms/Form";
import {InputXAndYField, SimpleTextField} from "../../components/forms/FormItems";
import FormGarden from "../../components/forms/FormGarden";
import {useHistory} from "react-router-dom";

function Gardens() {
    const { auth } = useContext(AuthDataContext);
    const [createNew, toggleCreateNew] = useState(false);

    const history = useHistory();
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