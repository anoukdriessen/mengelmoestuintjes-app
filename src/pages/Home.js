import '../components/pageitems/PageStyling.css'
import MultiPanelContainer from "../components/listitems/MultiPanelContainer";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import React, {useContext, useEffect, useState} from "react";
import PostCards from "../components/listitems/Posts/PostCards";
import axios from "axios";
import {AuthDataContext} from "../context/AuthDataContext";
import Quote from "../components/Quote";
import {UserDataContextProvider} from "../context/UserDataContext";
import CallToAction from "../components/CallToAction";
import PostsDataContext, {PostsDataContextProvider} from "../context/PostsDataContext";

function Home() {
    const {auth} = useContext(AuthDataContext);
    const [randomQuote, setRandomQuote] = useState(null);
    useEffect(() => {
        fetchRandomQuote()
    }, [])

    const fetchRandomQuote = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/quotes/random`, {
            })
            setRandomQuote(response.data);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    const linkToGarden = '/tuintjes'
    const linkToBlog = '/blog';

    return <>
        <PageHeader title='Mengelmoestuintjes'/>

        <PageContent>
            <Quote quote={randomQuote}/>

            <MultiPanelContainer type='missions'/>

            <CallToAction
                linkTo={auth.isAuth ? linkToGarden : '/registreren'}
                title={auth.isAuth ? 'Mijn tuintjes' : 'Maak een tuintje'}
            />

            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <PostCards
                        title='Recente blogberichten'
                        type='blog'
                        num={4}
                    />
                </PostsDataContextProvider>
            </UserDataContextProvider>

            <CallToAction
                linkTo={linkToBlog}
                title={'Lees verder'}
            />

        </PageContent>
    </>
}

export default Home;