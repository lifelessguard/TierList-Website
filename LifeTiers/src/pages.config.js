import Docs from './pages/Docs';
import PlayerProfile from './pages/PlayerProfile';
import Rankings from './pages/Rankings.jsx';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Docs": Docs,
    "PlayerProfile": PlayerProfile,
    "Rankings": Rankings,
}

export const pagesConfig = {
    mainPage: "Rankings",
    Pages: PAGES,
    Layout: __Layout,
};