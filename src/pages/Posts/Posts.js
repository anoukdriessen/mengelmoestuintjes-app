import PageHeader from "../../components/pageitems/PageHeader";
import React, {useContext, useEffect, useState} from "react";
import PageContent from "../../components/pageitems/PageContent";
import {UserDataContextProvider} from "../../context/UserDataContext";
import PostCards from "../../components/listitems/Posts/PostCards";
import axios from "axios";
import {PostsDataContextProvider} from "../../context/PostsDataContext";
import {AuthDataContext} from "../../context/AuthDataContext";
import {FiPlus} from "react-icons/fi";

function Posts() {
    const { auth, hasUserRole } = useContext(AuthDataContext)

    console.log(hasUserRole("ROLE_MODERATOR"))

    return <>
        <PageHeader title='Berichten'/>
        <PageContent>
            { hasUserRole("ROLE_MODERATOR") && <div>
                <FiPlus/> Voeg nieuw blog bericht toe
            </div>}
            <UserDataContextProvider>
                <PostsDataContextProvider>
                    <>filter berichten per provincie</>
                    <PostCards
                        title='Recente blogberichten'
                        type='blog'
                        num={20}
                    />
                </PostsDataContextProvider>
            </UserDataContextProvider>
        </PageContent>
        </>
}

export default Posts;