import Docs from './pages/Docs';
import Home from './pages/Home';
import PlayerProfile from './pages/PlayerProfile';
import Rankings from './pages/Rankings.jsx';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Docs": Docs,
    "PlayerProfile": PlayerProfile,
    "Rankings": Rankings,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};