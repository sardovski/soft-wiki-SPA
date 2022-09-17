import {html} from '../../node_modules/lit-html/lit-html.js';
import { createArticle } from '../api/data.js';


const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit} id="create">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>`;


export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
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
        await createArticle({title,category,content});
        ctx.page.redirect('/');
        }else {
            return alert('The category must be on of "JavaScript", "C#", "Java", or "Python"');

        }
    }
}