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
}
let info = {
    title: 'Maak jouw Mengelmoestuintje',
    subtitle: 'in 3 stappen ben je klaar om jouw tuinavontuur te starten',
    url: '/info',
    icon: <LeafIcon className='mirrored'/>,
    content: {},
}
let plantDB = {
    title: 'plant database',
    url: '/plant-database',
    icon: <PlantDBIcon />,
    content: {},
}
let singlePlant = {
    title: 'single plant',
    url: '/single-plant',
    icon: <LeafIcon className='mirrored'/>,
    content: {},
}
let plantInGarden = {
    title: 'plant in garden',
    url: '/plant-in-garden',
    icon: <InGardenIcon />,
    content: {},
}
let plantInstructions = {
    title: 'plant instructies',
    url: '/plant-instructions',
    icon: <InstructionIcon />,
    content: {},
}
let moderatorDashboard = {
    title: 'moderator dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
    content: {},
}
let registerLogin = {
    title: 'Wordt lid of Login',
    url: '/register-and-login',
    icon: <LoginIcon />,
    content: {},
}
let profile = {
    title: 'Profiel',
    url: '/profile',
    icon: <ProfileIcon />,
    content: {},
}
let messages = {
    title: 'berichten',
    url: '/profile-messages',
    icon: <MessageIcon />,
    content: {},
}
let gardens = {
    title: 'tuintjes',
    url: '/profile-gardens',
    icon: <GridIcon />,
    content: {},
}
let singleGarden = {
    title: 'name of garden',
    url: '/profile-garden-name',
    icon: <SignIcon />,
    content: {},
}
let favorites = {
    title: 'favorieten',
    url: '/profile-favorites',
    icon: <FavoritesIcon />,
    content: {},
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

export function getCurrentSeason() {
    const today = new Date();
    const month = today.getMonth();

    let season;

    // de lente begint in maart
    const isSpring = month === 3 || month === 4 || month === 5;
    // de zomer begint in juni
    const isSummer = month === 6 || month === 7 || month === 8;
    // de herfst begint in september
    const isFall = month === 9 || month === 10 || month === 11;
    // de winter begint in december
    const isWinter = month === 12 || month === 1 || month === 2;

    // 0 = lente, 1 = zomer, 2 = herfst, 3 = winter
    if ( isSpring ) season = 0;
    if ( isSummer ) season = 1;
    if ( isFall   ) season = 2;
    if ( isWinter ) season = 3;

    return season;
}

export function getSeasonalTitle(title, start, length, end) {
    // const season = getCurrentSeason();
    const season = 0;
    let seasonalTitle;

    seasonalTitle = title.substr(start,length);

    let icon;
    switch (season) {
        case 0: // is spring
            icon = '🌻';
            break;
        case 1: // is summer
            icon = '🌱';
            break;
        case 2: // is fall
            icon = '&#9748;';
            break;
        case 3: // is winter
            icon = 'U+2603';
            break;
    }

    seasonalTitle += icon;
    seasonalTitle += title.substr(end);

    return seasonalTitle
}
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}