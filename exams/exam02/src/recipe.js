import {
	fetchLogIn,
	fetchInitialPage,
	fetchRecipesList,
	fetchAddRecipe,
	fetchLogout,
	fetchRecipe,
} from './services';

const appState = {
		isLoggedIn: false,
		recipesList: {},
		recipe: {},
		error: '',
};

const homePage = document.querySelector('.home-page');
const loginPage = document.querySelector('.login-page');
const recipeList = document.querySelector('.recipe-list');
const loggedInHomePage = document.querySelector('.logged-in-home-page');
const addRecipePage = document.querySelector('.add-new-recipe-page');
const recipeDetailsPage = document.querySelector('.recipe-details-page');
const backToHomePage = document.querySelector('.back-to-homepage');
const errorPage = document.querySelector('.status');
const titleAuthorHeading = document.querySelector('.title-author-heading');

function renderErrors( text ) {
	errorPage.innerHTML = text;
}

function renderClearAllPage(){
	homePage.innerHTML = '';
	loggedInHomePage.innerHTML = '';
	loginPage.innerHTML = '';
	recipeList.innerHTML = '';
	recipeDetailsPage.innerHTML = '';
	backToHomePage.innerHTML = '';
	addRecipePage.innerHTML = '';
	errorPage.innerHTML = '';
	titleAuthorHeading.innerHTML = '';
}

function renderPages(pageName){
	renderClearAllPage();
	renderErrors(appState.error);
	if(pageName === 'loginPage'){
		renderLoginPage();
		renderBackToHomePage();
	}
	if(pageName === 'homePage'){
		renderHomePage();
		renderRecipeList();
	}
	if(pageName === 'loggedInHomePage'){
		renderLoggedInHomePage();
		renderRecipeList();
	}
	if(pageName === 'addRecipePage'){
		renderAddRecipePage();
		renderBackToHomePage();
	}
	if(pageName === 'recipeDetailsPage'){
		renderRecipeDetailsPage(appState.recipe);
		renderBackToHomePage();
	}
}

function renderLoginPage(){
	loginPage.innerHTML = `
			<label>Username: <input/></label>
			<button class="submit-button" type="button">Submit</button>`;
}

function renderHomePage(){
	homePage.innerHTML = `
		<div class="display-panel">
			<h1>WELCOME TO THE RECIPES HOME PAGE!</h1>
			<div>
				<button class="login-button" type="button">Login</button>
			</div>
		</div>`
}

function renderBackToHomePage(){
	backToHomePage.innerHTML = `
		<div class="back-home">
			<a class="back-to-home" href="https://www.homepage.com" title="click to go back to home page">Back to Home</a>
		</div> `;
}

function renderRecipeList(){
	const recipes = appState.recipesList;
	recipeList.innerHTML = `<ul class="recipes">` +
		Object.keys(recipes).map( (key) => {
			const recipe = recipes[key];
			return `
				<li class="recipe-list">
					<div class="recipe">
						<a data-id="${key}" class="recipe-title" href="https://www.recipes.com" title="click to get detailed recipe">${recipe.title}</a>
						<span data-id="${key}" class="recipe-author">${recipe.author}</span>
					</div>
				</li>
			`;
		}).join('\n') +
	`</ul>`;

	titleAuthorHeading.innerHTML = `
			<h1 class = "title-author-heading" > Recipe Title    |     Recipe Author </h1> `;
}

function renderLoggedInHomePage(){
	loggedInHomePage.innerHTML = `
		<div class="display-panel">
			<h1>WELCOME!</h1>
			<div>
				<button class="add-recipe-button" type="button">Add Recipe</button>
			</div>
			<div>
				<button class="logout-button" type="button">Logout</button>
			</div>
		</div>`
}

function renderRecipeDetailsPage(recipe){
	if(recipe != null){
		recipeDetailsPage.innerHTML = `
			<div class="recipe-details-page">
				<div>
					<h2>Author</h2>
					<div class="author"><span>${recipe.author}</span></div>
				</div>
				<div>
					<h2>Title</h2>
					<div class="title"><span>${recipe.title}</span></div>
				</div>
				<div>
					<h2>INGREDIENTS</h2>
					<div class="ingredients"><span>${recipe.ingredients}</span></div>
				</div>
				<div>
					<h2>INSTRUCTIONS</h2>
					<div class="instructions"><span>${recipe.instructions}</span></div>
				</div>
			</div>  `
	}
}

function renderAddRecipePage(){
	addRecipePage.innerHTML = `
		<div class="new-recipe">
			<div class="new-title">
				RECIPE TITLE* <textarea class="new-recipe-title" id="title" name="title" rows="2" cols="150"></textarea>
			</div>
			<div class="new-ingredients">
				RECIPE INGREDIENTS* <textarea class="new-recipe-ingredients" id="ingredients" name="ingredients" rows="5" cols="150"></textarea>
			</div>
			<div class="new-instructions">
				RECIPE INSTRUCTIONS* <textarea class="new-recipe-instructions" id="instructions" name="instructions" rows="5" cols="150"></textarea>
			</div>
			<button class="recipe-submit-button" type="submit">SUBMIT RECIPE</button>
		</div>   `
}

function getRecipeList(){
	fetchRecipesList()
	.then((result) => {
		appState.error = '';
		appState.recipesList  = result.recipeList;
		if(appState.isLoggedIn){
			renderPages('loggedInHomePage');
		}else{
			renderPages('homePage');
		}
	})
	.catch( (result) => {
		appState.recipesList = result.recipeList;
		appState.error = '';
		renderPages('homePage');
	});
}

function getRecipe(recipeId){
	fetchRecipe(recipeId)
	.then((result) => {
		appState.error = '';
		appState.recipe = result.recipe;
		renderPages('recipeDetailsPage');
	})
	.catch( (result) => {
		if(result.code === 'No recipe found'){
			appState.recipe = null;
			appState.error = result.code;
		}else{
			appState.recipe = result.recipe;
			appState.error = '';
		}
		renderPages('recipeDetailsPage');
	});
}

backToHomePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('back-to-home')) {
		getRecipeList();
	}
});

homePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('login-button')) {
		renderPages('loginPage');
	}
});

loginPage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('submit-button')) {
		const username = loginPage.querySelector('input').value;
		fetchLogIn(username)
		.then( () => {
			appState.isLoggedIn = true;
			getRecipeList();
		})
		.catch( (err) => {
			appState.isLoggedIn = false;
			appState.error = err.code;
			renderPages('loginPage');
		});
	}
});

recipeList.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('recipe-title')) {
		const recipeId = e.target.dataset.id;
		getRecipe(recipeId);
	}
});

addRecipePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('recipe-submit-button')) {
		const recipeTitle = addRecipePage.querySelector('.new-recipe-title').value;
		const recipeIngredients = addRecipePage.querySelector('.new-recipe-ingredients').value;
		const recipeInstructions = addRecipePage.querySelector('.new-recipe-instructions').value;
		fetchAddRecipe(recipeTitle, recipeIngredients, recipeInstructions)
		.then( (recipe) => {
			appState.error = '';
			appState.isLoggedIn = true;
			appState.recipe = recipe;
			renderPages('recipeDetailsPage');
		})
		.catch( (err) => {
			appState.error = err.code;
			appState.isLoggedIn = true;
			renderPages('addRecipePage');
		});
	}
});

loggedInHomePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('add-recipe-button')) {
		renderPages('addRecipePage');
	}
});

loggedInHomePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(!e.target.classList.contains('logout-button')) {
		return;
	}
	fetchLogout()
	.then( () => {
		appState.error = '';
		appState.isLoggedIn = false;
		getRecipeList();
	})
	.catch( (err) => {
		appState.isLoggedIn = false;
		appState.error = err.code;
		renderPages('homePage');
	});
});

fetchInitialPage()
.then( () => {
	appState.isLoggedIn = true;
	getRecipeList();
})
.catch( (err) => {
	if(err.code == 'Initial Login'){
		appState.isLoggedIn = false;
		getRecipeList();
	}else{
		appState.isLoggedIn = false;
		appState.error = err.code;
		renderPages('homePage');
	}
});