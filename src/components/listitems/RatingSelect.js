import {useContext, useEffect, useState} from "react";
import CommentContext from "../../context/CommentContext";

function RatingSelect({max, select}) {
    const [selected, setSelected] = useState(10);

    const { toUpdate } = useContext(CommentContext);

    useEffect(() => {
        if (toUpdate.rating) {
            setSelected(toUpdate.rating);
        }
        }, [toUpdate])

    const items = [max]
    for (let i = 0; i < max; i++) {
        items[i] = i+1;
    }

    const ratingStyle = ({
        display: 'flex',
        flexDirection: 'row',
    })

    // console.log(items)

    const handleChange = (e) => {
        // console.log(e.currentTarget.value);
        setSelected(+e.currentTarget.value);
        select(+e.currentTarget.value);
    }

    return <div style={ratingStyle}>
        {selected}
        {
            items.map((item) => {
                return <li key={'rating' + (item)}>
                    <input
                        type='radio'
                        id='item'
                        name='rating'
                        value={item}
                        onChange={handleChange}
                        checked={selected===item}
                    />
                </li>
            })
        }
    </div>
}

RatingSelect.defaultProperty = {
    max: 3,
}

export default RatingSelect;