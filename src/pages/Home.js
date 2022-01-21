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

function Home() {
    const { header } = useContext(AuthDataContext)
    const [randomQuote, setRandomQuote] = useState(null)
    const [blogPosts, setBlogPosts] = useState([])
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        fetchRandomQuote()
        fetchBlogPosts()
    }, [])

    const fetchRandomQuote = async () => {
        isLoading(true);
        try {
            const response = await axios.get(`https://localhost:8443/api/quotes/random`, {
            })
            // console.log('fetch random quote',response.data)
            setRandomQuote(response.data);
            isLoading(false);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const fetchBlogPosts = async () => {
        isLoading(true);
        try {
            const response = await axios.get(`https://localhost:8443/api/berichten/top4`, {
                    params: {published: true, category: "BLOG"}
            })
            setBlogPosts(response.data.reverse());
            isLoading(false);
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

            <Link to={'/registreren'}><Button version='call-to-action'>
                Maak een Tuintje
            </Button></Link>

            <PostCards
                title='Recente blogberichten'
                type='blog'
                blogPosts={blogPosts}
                num={4}
            />

            <Link to={'/blog'}><Button version='call-to-action'>
                lees verder
            </Button></Link>

        </PageContent>
    </>
}

export default Home;