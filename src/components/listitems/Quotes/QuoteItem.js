import {useContext} from "react";
import ListDataContext from "../../../context/ListDataContext";
import Card from "../Card";
import {FiEdit3, FiX} from "react-icons/fi";

function QuoteItem({item}) {
    // const {deleteQuote, updateQuote} = useContext(ListDataContext);
    // console.log(item);

    return <Card className={'card'}>
        <div key={item.id}>
            <p className={'quotes'}>
                {item.text}
            </p>
            <div className={'actions'}>
                <span><span>{item.id}</span>{item.author}</span>
                <div>
                    <a href='#quote-form'>
                    <button className='btn close'>
                        <FiX/>
                    </button>
                    </a>
                    <a href='#quote-form'>
                    <button className='btn edit'>
                        <FiEdit3/>
                    </button>
                    </a>
                </div>
            </div>
        </div>
    </Card>
}

export default QuoteItem;