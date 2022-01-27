import {AuthDataContext} from "../context/AuthDataContext";
import {useContext} from "react";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";

function Gardens() {
    const { auth } = useContext(AuthDataContext);

    return <>
        <PageHeader title={auth.user.username + '\'s Mengelmoestuintjes'}/>

        <PageContent>
            <div>
                <h4>Mijn tuintjes</h4>
                <div>
                    <div className='garden-preview'>
                        <p>
                            <span>TUINNAAM</span>
                            <span>[ 24m<sup>2</sup> ]</span>
                            <br/>
                            <span>[ 0 ] items op to do</span>
                        </p>
                    </div>
                </div>
            </div>
        </PageContent>
    </>
}

export default Gardens;