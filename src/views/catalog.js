import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';

const catalogTemplate = (articleData) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${articleData.length != 0 ? articleData.map(articleTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
    
</section>`;

const articleTemplate = (data) => html`
<a class="article-preview" href="/details/${data._id}">
    <article>
        <h3>Topic: <span>${data.title}</span></h3>
        <p>Category: <span>${data.category}</span></p>
    </article>
</a>`;


export async function catalogPage(ctx) {
    const allArticles = await getAllArticles();
    ctx.render(catalogTemplate(allArticles));

}