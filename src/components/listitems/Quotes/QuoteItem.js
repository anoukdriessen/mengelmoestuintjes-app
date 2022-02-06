import Card from "../Card";
import {FiEdit3, FiX} from "react-icons/fi";

function QuoteItem({item}) {

    return <Card className={'card'}>
        <div key={item.id}>
            <p className={'quotes'}>
                {item.text}
            </p>
            <div className={'actions'}>
                <span><span>{item.id}</span>{item.author}</span>
                <div>
                    <button className='btn close'>
                        <FiX/>
                    </button>
                    <button className='btn edit'>
                        <FiEdit3/>
                    </button>
                </div>
            </div>
        </div>
    </Card>
}

export default QuoteItem;