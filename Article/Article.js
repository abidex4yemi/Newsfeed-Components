// Because classes are not hoisted you will need to start your code at the bottom of the page.  Look for the comment "START HERE"
const readMoreLabel = 'Read More';
const doneLabel = 'Done';

class Article {
	constructor(domElement) {
		// assign this.domElement to the passed in domElement
		this.domElement = domElement;
		// create a reference to the ".expandButton" class.
		this.expandButton = this.domElement.querySelector('.expandButton');

		// Using your expandButton reference, update the text on your expandButton to say "expand"
		this.expandButton.textContent = readMoreLabel;
		// Set a click handler on the expandButton reference, calling the expandArticle method.
		this.expandButton.addEventListener('click', this.expandArticle.bind(this));
	}

	getToggleButton() {
		if (!this.expandButton.textContent || this.expandButton.textContent === doneLabel) {
			this.expandButton.textContent = readMoreLabel;
		} else {
			this.expandButton.textContent = doneLabel;
		}
	}

	expandArticle() {
		this.getToggleButton();
		// Using our reference to the domElement, toggle a class to expand or hide the article.
		this.domElement.classList.toggle('article-open');
	}
}

class ArticleGenerator {
	constructor(article, data) {
		this.article = article;
		this.data = data;
		this.createHeading();
		this.createDate();
		this.createParagraphs();
		this.createButton();
		this.appendToDOM();
	}

	appendToDOM() {
		const articles = document.querySelector('.articles');
		articles.insertAdjacentElement('afterbegin', this.article);
	}

	createHeading() {
		const heading = document.createElement('h2');
		heading.textContent = this.data.title;
		this.article.append(heading);
	}

	createDate() {
		const date = document.createElement('p');
		date.textContent = new Date();
		date.setAttribute('class', 'date');
		this.article.append(date);
	}

	createParagraphs() {
		const para1 = document.createElement('p');
		para1.textContent = this.data.body;
		this.article.insertAdjacentElement('beforeend', para1);
	}

	createButton() {
		const button = document.createElement('span');
		button.setAttribute('class', 'expandButton');
		button.textContent = readMoreLabel;
		this.article.insertAdjacentElement('beforeend', button);
	}
}

/* START HERE: 

- Select all classes named ".article" and assign that value to the articles variable.  

- With your selection in place, now chain .forEach() on to the articles variable to iterate over the articles NodeList and create a new instance of Article by passing in each article as a parameter to the Article class.

*/

const addBtn = document.querySelector('.btn');

addBtn.addEventListener('click', function(evt) {
	evt.preventDefault();
	const title = document.querySelector('.title').value;
	const body = document.querySelector('.body').value;

	const data = {
		title,
		body
	};

	const article = document.createElement('div');
	article.setAttribute('class', 'article');

	new ArticleGenerator(article, data);
});

const articles = document.querySelectorAll('.article');
articles.forEach(article => {
	new Article(article);
});
