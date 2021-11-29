// importeer afbeeldingen
import lente from "./lente.jpg";
import zomer from "./zomer.jpg";
import herfst from "./herfst.jpg";
import winter from "./winter.jpg";

/**
 * Elke pagina heeft een:
 * - titel      [ verplicht ]
 * - url        [ verplicht ]
 * - content    [ verplicht ]
 */
let home = {
    title: 'Mengelmoestuintjes',
    url: '/',
    content: {
        hasQuote: true,
        missions: {
            organize: {
                title: 'organiseren',
                // TODO aanpassen
                description: 'Mengelmoestuintjes helpt je het overzicht te houden in je (moes)tuin, jij bepaalt de grootte, jij bepaalt de naam, jij bepaalt wat er geplant is en wij houden je op de hoogte en motiveren je taken en werkzaamheden uit te voeren op basis van de planten die je hebt geplant of het seizoen dat het momenteel is. \n' +
                    '\n' +
                    'Je leert het overzicht te houden en prioriteiten te maken voor wat voor jou belangrijk is.'
            },
            share: {
                title: 'delen',
                // TODO aanpassen
                description: 'Mengelmoestuintjes geeft je de ruimte te delen wat jij wilt! \n' +
                    '\n' +
                    'Deel je tuin, oogst of mijlpaal\n' +
                    '\n' +
                    'Stel een vraag aan je medetuinierders\n' +
                    'of\n' +
                    'Laat een notitie achter voor toekomst jij\n' +
                    '\n' +
                    'Samen wordt het leuker!\n' +
                    '& daar helpen wij je graag mee '
            },
            learn: {
                title: 'leren',
                // TODO aanpassen
                description: 'Mengelmoestuintjes begrijpt dat we allemaal (nog) geen expert zijn en we altijd nog wel iets kunnen leren, je kunt leren van onze geselecteerde experts of je kunt leren van elkaar.\n' +
                    '\n' +
                    'Voor alle leden bieden wij de mogelijkheid meer te leren over de basisbeginselen van het tuinieren en de moestuin.\n' +
                    '\n' +
                    '& samen groeien we verder'
            }
        }
    }
}
let info = {
    title: 'Maak een tuintje',
    url: '/about-me',
    content: {
        subtitle: 'in 3 stappen',
        howto: {
            step1: 'stap 1',
            step2: 'stap 2',
            step3: 'stap 3'
        }
    },
}
let plantDB = {
    title: 'plant database',
    url: '/plant-database',
    content: '',
}
let singlePlant = {
    title: 'single plant',
    url: '/single-plant',
    content: '',
}
let plantInGarden = {
    title: 'plant in garden',
    url: '/plant-in-garden',
    content: '',
}
let plantInstructions = {
    title: 'plant instructies',
    url: '/plant-instructions',
    content: '',
}
let moderatorDashboard = {
    title: 'moderator dashboard',
    url: '/dashboard',
    content: '',
}
let registerLogin = {
    title: 'Wordt lid of Login',
    url: '/register-and-login',
    content: {
        begin: '',
        step1: 'stap 1',
        step2: 'stap 2',
        step3: 'stap 3',
        step4: 'stap 4',
    }
}
let profile = {
    title: 'Profiel',
    url: '/profile',
    content: ''
}
let messages = {
    title: 'berichten',
    url: '/profile-messages',
    content: ''
}
let gardens = {
    title: 'tuintjes',
    url: '/profile-gardens',
    content: ''
}
let singleGarden = {
    title: 'name of garden',
    url: '/profile-garden-name',
    content: ''
}
let favorites = {
    title: 'favorieten',
    url: '/profile-favorites',
    content: ''
}

/**
 * Methode om alle pagina's op te halen
 * 0 = home
 * 1 = about
 * 2 = plantDB
 * 3 = singlePlant
 * 4 = plantInGarden
 * 5 = plantInstructions
 * 6 = moderator dashboard
 * 7 = registerLogin
 * 8 = profile
 *
 */
export function getAllPages() {
    return [
        home,
        info,
        plantDB,
        singlePlant,
        plantInGarden,
        plantInstructions,
        moderatorDashboard,
        registerLogin,
        profile,
        messages,
        gardens,
        singleGarden,
        favorites
    ]
}

/**
 * Per seizoen wordt een andere afbeelding getoond
 * deze methode toont welk seizoen het is
 * en retourneert welke afbeelding daarbij hoort
 */
export function getCurrentSeasonImage() {
    const today = new Date();
    const month = today.getMonth();

    // 0 = lente, 1 = zomer, 2 = herfst, 3 = winter
    const seasonalImage = [lente, zomer, herfst, winter];

    // de lente begint in maart
    const isSpring = month === 3 || month === 4 || month === 5;
    // de zomer begint in juni
    const isSummer = month === 6 || month === 7 || month === 8;
    // de herfst begint in september
    const isFall = month === 9 || month === 10 || month === 11;
    // de winter begint in december
    const isWinter = month === 12 || month === 1 || month === 2;

    if ( isSpring ) {
        return seasonalImage[0];
    }
    if ( isSummer ) {
        return seasonalImage[1];
    }
    if ( isFall ) {
        return seasonalImage[2];
    }
    if ( isWinter ) {
        return seasonalImage[3];
    }

    // gaat er iets mis is per default de afbeelding zomer
    return seasonalImage[1];
}

/**
 * Methode om de Quote van de dag op te halen
 * TODO voeg API call toe
 */
export function getQOTD( hasQuote ) {
    // quote wordt alleen getoond als de quote variabele van object true is
    if ( hasQuote ) {
        return ['Iedere dag heb je twee keuzes, groeien of herhalen.', '@mengelmoestuintjes'];
    }
}