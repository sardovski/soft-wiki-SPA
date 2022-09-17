import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';


const searchTemplate = (onSearch, makeSearch) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${makeSearch ? (makeSearch.map(articleTemplate) !='' ? makeSearch.map(articleTemplate) : html`<h3 class="no-articles">No matching articles</h3>`) : ''}


    </div>
</section>`;

const articleTemplate = (data) => html`
<a class="article-preview" href="/details/${data._id}">
    <article>
        <h3>Topic: <span>${data.title}</span></h3>
        <p>Category: <span>${data.category}</span></p>
    </article>
</a>`;

export async function searchPage(cxt) {
    cxt.render(searchTemplate(onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const form = new FormData(event.target);

        const title = form.get('search').trim();
        if(!title){
            return alert('Please write a search parameter!');
        }
        const data = await search(title);

        cxt.render(searchTemplate(onSearch, data));

    }

}