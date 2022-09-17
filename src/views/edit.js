import {html} from '../../node_modules/lit-html/lit-html.js';
import { editArticle,getArticleById } from '../api/data.js';

const editTemplate= (onEdit,artData) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onEdit} id="edit">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${artData.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${artData.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${artData.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const artId  = ctx.params.id;
    const artData = await getArticleById(artId);
    ctx.render(editTemplate(onEdit,artData));

    async function onEdit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const title = form.get('title').trim();
        const category = form.get('category').trim();
        const content = form.get('content').trim();

        const checkArray = ['JavaScript', 'C#', 'Java', 'Python'];
        const checkResult = checkArray.includes(category);
        

        if(!title || !category || !content){
            return alert('All field\'s are required!');
        }

        if(checkResult){
        await editArticle(artId,{title,category,content});
        ctx.page.redirect('/details/' + artId);
        }else {
            return alert('The category must be on of "JavaScript", "C#", "Java", or "Python"');

        }
    }
}