import './styles/Cards.css';
import {useState} from "react";

function setActive(key, setActiveState) {
    const panels = document.querySelectorAll('.panel')
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
    const thisPanel = document.getElementById(key.key);
    thisPanel.classList.add('active');
    setActiveState(true);
}
function Card(props) {
    const key = props.id + 'card';
    let active = '';
    if ( key === '0card') { active = ' active' }
    const styling = props.styling + ' panel ' + props.background + active;

    return <section
        id = { key }
        className = { styling }
        onClick = {() =>
            setActive({key}, props.setActive)}
    >
        <div>
            <h3>{ props.content.title }</h3>
            <p>{ props.content.description }</p>
            { props.content.todo &&
                <ul>
                    {
                        props.content.todo.map((item, key) => {
                            return <li id={key}>{item}</li>
                        })
                    }
                </ul>
            }
        </div>
    </section>
}

function Cards( props ) {
    const cardItems = props.items;
    const [ active, setActive ] = useState(false);

    return <>
        <div className='cards'>
            {
                cardItems.map( ( item, key ) => {
                    console.log(item);
                  return <Card key = { key }
                    id = { key }
                    styling = { props.styling }
                    background = { item.background }
                    isActive = { active }
                    setActive = { setActive }
                    content = { item }
                  />
                })
            }
        </div>
    </>
}

export default Cards;