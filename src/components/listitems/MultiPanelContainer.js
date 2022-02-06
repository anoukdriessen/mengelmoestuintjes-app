import '../../styles/multipanel.css';
import React, {useState} from "react";

function getMissions() {
    let content = {
        missions: {
            organize: {
                title: 'organiseren',
                description:
                    'Mengelmoestuintjes helpt je het overzicht te houden in je (moes)tuin,' +
                    ' jij bepaalt de grootte, jij bepaalt de naam, jij bepaalt wat er geplant is' +
                    ' en wij houden je op de hoogte en motiveren je taken en werkzaamheden uit te' +
                    ' voeren op basis van de planten die je hebt geplant of het seizoen dat het' +
                    ' momenteel is. Je leert het overzicht te houden en prioriteiten te maken voor' +
                    ' wat voor jou belangrijk is.',
                background: 'organized',
            },
            share: {
                title: 'delen',
                description:
                    'Mengelmoestuintjes geeft je de ruimte te delen wat jij wilt!' +
                    ' Deel je tuin, oogst of mijlpaal, stel vragen aan je medetuinierders' +
                    ' of laat een notitie achter voor toekomst jij. Samen wordt het leuker!' +
                    ' & daar helpen wij je graag mee ',
                background: 'sharing',
            },
            learn: {
                title: 'leren',
                description:
                    'Mengelmoestuintjes begrijpt dat we allemaal (nog) geen expert zijn' +
                    ' en we altijd nog wel iets kunnen leren, je kunt leren van onze' +
                    ' geselecteerde experts of je kunt leren van elkaar. Voor alle leden bieden' +
                    ' wij de mogelijkheid meer te leren over de basisbeginselen van het tuinieren' +
                    ' en de moestuin. & samen groeien we verder',
                background: 'learning',
            }
        }}
    return [ content.missions.organize, content.missions.share, content.missions.learn ]

}

function MultiPanelContainer({ type }) {
    const [active, setActive] = useState();

    const changeActive = (e) => {
        setActive(e.target);
    }

    let list;
    if (type === 'missions') {
        list = getMissions();
    }

    return <>
        <div className='container'>
            {
                list.map((item) => {
                    let activeItem;
                    activeItem = active === document.getElementById(item.title);

                    return <div key={item.title} className={'panel ' + item.background}>
                        <div className={activeItem ? 'panel-header active' : 'panel-header'} id={item.title}
                             onClick={(e) => changeActive(e)}>
                            <h3 className='uppercase'>{item.title}</h3>
                        </div>
                        {activeItem ? <p className={'active'}>{item.description}</p> : <p/>}
                    </div>
                })
            }
        </div>
    </>
}

export default MultiPanelContainer;