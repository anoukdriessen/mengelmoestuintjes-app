import {useContext, useEffect, useState} from "react";
import ListDataContext from "../../../context/ListDataContext";
import Card from "../Card";
import {FiEdit3, FiLoader, FiSend, FiX} from "react-icons/fi";
import Button from "../../Button";
import ListStats from "../ListStats";
import QuoteForm from "../../forms/types/QuoteForm";
import QuoteItem from "./QuoteItem";

function QuotesList() {
    const { quotes, updateQuote, isLoading,} = useContext(ListDataContext)

    if (!isLoading && (!quotes)) {
        return <div>
            Geen quotes gevonden
        </div>
    }

    let theseQuotes = [];
    if(quotes.content) {
        theseQuotes = [...quotes.content]
    }
    return isLoading ? <h3><FiLoader/></h3> : (
        <div>
            <div className={'listHeader'}>
                <ListStats
                    item = {theseQuotes}
                />
            </div>
            <QuoteForm
                list = {quotes}
            />
            {
                theseQuotes.map((obj) => {
                    return <QuoteItem
                        key = {obj.id}
                        item = {obj}
                        handleUpdate={updateQuote}
                    />
                })
            }
        </div>
    )
}

export default QuotesList;