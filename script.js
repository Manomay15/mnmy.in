// Function to load the latest 3 articles on the Home page
async function loadLatestArticles() {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();

        const latestArticlesContainer = document.getElementById('latest-articles');
        latestArticlesContainer.innerHTML = ''; // Clear any existing content

        articles.slice(0, 3).forEach(article => { // Only show the first 3 articles
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <p>${article.content.substring(0, 100)}...</p>
            `;
            latestArticlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error loading latest articles:', error);
    }
}

// Function to load all articles on the Write Up page
async function loadAllArticles() {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();

        const allArticlesContainer = document.getElementById('all-articles');
        allArticlesContainer.innerHTML = ''; // Clear any existing content

        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <p>${article.content.substring(0, 200)}...</p>
            `;
            allArticlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error loading all articles:', error);
    }
}

// Call the correct function based on the page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html')) {
        loadLatestArticles(); // Load latest articles on the Home page
    } else if (window.location.pathname.includes('writeup.html')) {
        loadAllArticles(); // Load all articles on the Write Up page
    }
});
