import { v4 as uuidv4 } from 'uuid'
import Header from "../components/Header";
import {useState} from "react";
import {CommentsData} from "../data/data";
import CommentList from "../components/listitems/CommentList";
import IconLink from "../components/IconNavLink";
import {CommentProvider} from "../context/CommentContext";


function Mengelmoes (props) {

    return <CommentProvider>
        <Header
            title={'Mengelmoestuintjes'}
            page={props.page}
            isLoggedIn={props.isLoggedIn}
            user = {props.user}
        />

        <main>
        <CommentList />

        </main>
    </CommentProvider>
}

export default Mengelmoes;