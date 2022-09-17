import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {logout} from '../src/api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';



// get --- Main Nav logoutBtn
const main = document.getElementById('main-content');
const nav = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click',logoutUser);


//routing --- 
page('/', midWare, homePage);
page('/index.html', midWare, homePage);
page('/login',midWare,loginPage);
page('/register',midWare,registerPage);
page('/catalog',midWare,catalogPage);
page('/details/:id',midWare,detailsPage);
page('/edit/:id',midWare,editPage);
page('/create-article',midWare,createPage);
page('/search',midWare,searchPage);


//---START Aplication
setUserNav();
page.start();



// midWare
function midWare(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = () => setUserNav();
    next();
}


// setUserNav
function setUserNav() {
    const itsUser = sessionStorage.getItem('email');

    if (itsUser) {
        nav.querySelector('div #user').style.display = '';
        nav.querySelector('div #guest').style.display = 'none';

    } else {
        nav.querySelector('div #user').style.display = 'none';
        nav.querySelector('div #guest').style.display = '';
    }

}


async function logoutUser() {
    await logout();
    setUserNav();
    page.redirect('/');
}