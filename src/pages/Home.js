
import {
    FiLogIn as Login,
    FiUser as User
} from "react-icons/fi"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function getLink( isLoggedIn, user ) {
    let link = '/login';
    if (isLoggedIn && user) {
        link = '/profile/' + user.username;
    }
    return link;
}

function Missions( props ) {
    if (props.missions) {
        // console.log(props.missions);
        return <div>
            {
                props.missions.map((m) => {
                    return <div key={m.title}>
                        <h3 className='uppercase'>{m.title}</h3>
                        <p>{m.description}</p>
                    </div>
                })
            }
        </div>
    }
    return null
}

function Home( props ) {
    const [quote, setQuote] = useState(null);

    useEffect( () => {
            axios("https://localhost:8443/api/quotes/random")
                .then((response) => {
                    // console.log(response.data);
                    setQuote(response.data);
                })
                .catch((er) => { console.error("Error occurred fetching random quote: ", er); });
    }, []);

    let link = getLink( props.loggedIn, props.user)

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
    let missions = [ content.missions.organize, content.missions.share, content.missions.learn ]

    return <>
        <div className='page-content'>
            <Header
                page = {'home'}
                link = {link}
                quote = {quote}
                title = {'Mengelmoestuinjtes'}
            />

            <main className='centered'>
                <h2>Onze missie</h2>
                <Missions missions={missions}/>
            </main>
        </div>

        <Footer
            callToAction = {'Maak een tuintje!'}
            link = {'/registreren'}
        />

    </>
}

export default Home;