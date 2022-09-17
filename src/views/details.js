import {html} from '../../node_modules/lit-html/lit-html.js';
import { getArticleById,deleteArticle } from '../api/data.js';

const detailsTemplate = (articleData,isOwner,onDelete) => html`
<section id="details-page" class="content details">
    <h1>${articleData.title}</h1>

    <div class="details-content">
        <strong>Published in category ${articleData.category}</strong>
        <p>${articleData.content}</p>

        <div class="buttons">
            ${isOwner ? html`<a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${articleData._id}" class="btn edit">Edit</a>` : ''}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const artId = ctx.params.id;
    const articleData = await getArticleById(artId);
    const isOwner = articleData._ownerId == sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(articleData,isOwner,onDelete));
    
    async function onDelete() {
        const conf = confirm('Are you sure?');

        if(conf){
            await deleteArticle(artId);
            ctx.page.redirect('/');
        }
    }
}
