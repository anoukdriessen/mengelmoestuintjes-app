import '../components/pageitems/PageStyling.css'
import MultiPanelContainer from "../components/containers/MultiPanelContainer";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import Button from "../components/Button";
import React, {useContext, useEffect, useState} from "react";
import PostCards from "../components/containers/PostCards";
import axios from "axios";
import {AuthDataContext} from "../context/AuthDataContext";
import {Link} from "react-router-dom";
import Quote from "../components/Quote";
import {UserDataContextProvider} from "../context/UserDataContext";
import CallToAction from "../components/CallToAction";
import {toast} from "react-toastify";

function Home() {
    const {auth} = useContext(AuthDataContext);
    const [randomQuote, setRandomQuote] = useState(null)
    const [blogPosts, setBlogPosts] = useState([])
    useEffect(() => {
        fetchRandomQuote()
        fetchBlogPosts()
    }, [])

    const fetchRandomQuote = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/quotes/random`, {
            })
            // console.log('fetch random quote',response.data)
            setRandomQuote(response.data);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten/top4`, {
                    params: {published: true, category: "BLOG"}
            })
            setBlogPosts(response.data.reverse());
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    return <>
        <PageHeader title='Mengelmoestuintjes'/>

        <PageContent>
            <Quote quote={randomQuote}/>

            <MultiPanelContainer type='missions'/>

            <CallToAction
                linkTo={'/registreren'}
                title={'Maak een tuintje'}
            />

            <UserDataContextProvider>
                <PostCards
                    title='Recente blogberichten'
                    type='blog'
                    posts={blogPosts}
                    num={4}
                />
            </UserDataContextProvider>

            <CallToAction
                linkTo={'/blog'}
                title={'lees verder'}
            />

        </PageContent>
    </>
}

export default Home;