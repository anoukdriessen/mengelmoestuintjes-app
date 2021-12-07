// importeer afbeeldingen
import lente from "./lente.jpg";
import zomer from "./zomer.jpg";
import herfst from "./herfst.jpg";
import winter from "./winter.jpg";

// importeer iconen
import  {
    IoHome as HomeIcon,
    IoLeaf as LeafIcon,
    IoDocumentAttachSharp as InstructionIcon,
} from "react-icons/io5";
import {
    RiPlantFill as PlantDBIcon,
    RiDashboardFill as DashboardIcon,
} from "react-icons/ri";
import {
    GiPlantSeed as InGardenIcon,
    GiWoodenSign as SignIcon,
} from "react-icons/gi";
import {
    MdLogin as LoginIcon,
    MdPersonPin as ProfileIcon,
    MdMessage as MessageIcon,
    MdOutlineWindow as GridIcon
} from "react-icons/md";
import {
    BsBookmarkHeartFill as FavoritesIcon,
} from "react-icons/bs"

/**
 * Elke pagina heeft verplicht:
 * - titel
 * - url
 * - icoon
 * - content
 */
let home = {
    title: 'Mengelmoestuintjes',
    url: '/',
    icon: <HomeIcon />,
    content: {},
    className: 'home',
}
let info = {
    title: 'Maak een tuintje',
    subtitle: 'in 3 stappen',
    url: '/info',
    icon: <LeafIcon className='mirrored'/>,
    content: {},
    className: 'info',
}
let plantDB = {
    title: 'plant database',
    url: '/plant-database',
    icon: <PlantDBIcon />,
    content: {},
    className: 'plant-db',
}
let singlePlant = {
    title: 'single plant',
    url: '/single-plant',
    icon: <LeafIcon className='mirrored'/>,
    content: {},
    className: 'plant-single',
}
let plantInGarden = {
    title: 'plant in garden',
    url: '/plant-in-garden',
    icon: <InGardenIcon />,
    content: {},
    className: 'plant-garden',
}
let plantInstructions = {
    title: 'plant instructies',
    url: '/plant-instructions',
    icon: <InstructionIcon />,
    content: {},
    className: 'plant-instr',
}
let moderatorDashboard = {
    title: 'moderator dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
    content: {},
    className: 'mod-dashboard',
}
let registerLogin = {
    title: 'Wordt lid of Login',
    url: '/register-and-login',
    icon: <LoginIcon />,
    content: {},
    className: 'register-login',
}
let profile = {
    title: 'Profiel',
    url: '/profile',
    icon: <ProfileIcon />,
    content: {},
    className: 'profile',
}
let messages = {
    title: 'berichten',
    url: '/profile-messages',
    icon: <MessageIcon />,
    content: {},
    className: 'msg',
}
let gardens = {
    title: 'tuintjes',
    url: '/profile-gardens',
    icon: <GridIcon />,
    content: {},
    className: 'gardens',
}
let singleGarden = {
    title: 'name of garden',
    url: '/profile-garden-name',
    icon: <SignIcon />,
    content: {},
    className: 'gardens-single',
}
let favorites = {
    title: 'favorieten',
    url: '/profile-favorites',
    icon: <FavoritesIcon />,
    content: {},
    className: 'favo',
}

/**
 * Methode om alle pagina's op te halen
 * 0 = home
 * 1 = info
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
    // list of quotes TODO from DB
    let quotes = [
        ['Iedere dag heb je twee keuzes, groeien of herhalen.', '@mengelmoestuintjes'],
        ['Wat met liefde is geplant raakt nooit uitgebloeid', '@ireen_boerderijgeluk'],
        ['Als jij een bloem was, zou ik jou plukken', '@claudia.mytowergarden'],
    ];

    // select random item from array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // quote wordt alleen getoond als de quote variabele van object true is
    if ( hasQuote ) {
        return randomQuote;
    }
}