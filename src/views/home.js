import {html} from '../../node_modules/lit-html/lit-html.js';
import { getHomeArticles } from '../api/data.js';

const homeTemplate = (jsArticle,cSharpArticle,javaArticle,pythonArticle)=>html`
<section id="home-page" class="content">
<h1>Recent Articles</h1>
<section class="recent js">
    <h2>JavaScript</h2>
    ${jsArticle ? articleTemplate(jsArticle) : html`<h3 class="no-articles">No articles yet</h3>` }
</section>
<section class="recent csharp">
    <h2>C#</h2>
    ${cSharpArticle ? articleTemplate(cSharpArticle) : html`<h3 class="no-articles">No articles yet</h3>` }
</section>
<section class="recent java">
    <h2>Java</h2>
    ${javaArticle ? articleTemplate(javaArticle) : html`<h3 class="no-articles">No articles yet</h3>` }
</section>
<section class="recent python">
    <h2>Python</h2>
    ${pythonArticle ? articleTemplate(pythonArticle) : html`<h3 class="no-articles">No articles yet</h3>` }
</section>
</section>`;

const articleTemplate = (data) =>html`
<article>
    <h3>${data.title}</h3>
    <p>${data.content}</p>
    <a href="/details/${data._id}" class="btn details-btn">Details</a>
</article>`;


export async function homePage(ctx) {
    const homeArticles = await getHomeArticles();
    const jsArticle = homeArticles.find(x=>x.category == 'JavaScript');
    const cSharpArticle = homeArticles.find(x=>x.category == 'C#');
    const javaArticle = homeArticles.find(x=>x.category == 'Java');
    const pythonArticle = homeArticles.find(x=>x.category == 'Python');
    
    ctx.render(homeTemplate(jsArticle,cSharpArticle,javaArticle,pythonArticle));

}
