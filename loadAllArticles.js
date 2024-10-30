// loadAllArticles.js

const converter = new showdown.Converter();

// List of all article filenames
const articles = ["waving-through-a-window.md", "mirror.md", "attempt.md"];

async function loadArticleList(filename) {
    try {
        const response = await fetch(`articles/${filename}`);
        const markdown = await response.text();

        // Extract the title (first line) and preview (next few lines)
        const lines = markdown.split('\n');
        const title = lines[0].replace(/^#\s*/, ''); // Remove leading '#' for the title
        const previewText = lines.slice(1).join(' ').substring(0, 300) + '...';

        // Convert the preview to HTML
        const previewHtml = converter.makeHtml(previewText);
        const articleLink = `article.html?file=${filename}`;

        const articleElement = document.createElement("div");
        articleElement.className = "article-item";
        articleElement.innerHTML = `
            <h3><a href="${articleLink}">${title}</a></h3>
            <p>${previewHtml}</p>
        `;

        // Append to the all-articles section
        document.getElementById("all-articles").appendChild(articleElement);
    } catch (error) {
        console.error(`Failed to load article ${filename}:`, error);
    }
}

// Load each article in the list
articles.forEach(loadArticleList);
