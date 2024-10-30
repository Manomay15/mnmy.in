// loadPreviews.js

const converter = new showdown.Converter();

// Array of the latest three article filenames

// new-article-change
const articles = ["waving-through-a-window.md", "mirror.md"];

async function loadArticlePreview(filename) {
    try {
        const response = await fetch(`articles/${filename}`);
        const markdown = await response.text();

        // Extract the title (first line) and preview (next few lines)
        const lines = markdown.split('\n');
        const title = lines[0].replace(/^#\s*/, ''); // Remove leading '#' for the title
        const previewText = lines.slice(1, 4).join(' '); // Get first few lines as preview

        // Convert preview to HTML and create preview element
        const previewHtml = converter.makeHtml(previewText);
        const articleLink = `article.html?file=${filename}`;

        const previewElement = document.createElement("div");
        previewElement.className = "article-preview";
        previewElement.innerHTML = `
            <h3><a href="${articleLink}">${title}</a></h3>
            <p>${previewHtml}</p>
        `;

        // Append to article previews section
        document.getElementById("article-previews").appendChild(previewElement);
    } catch (error) {
        console.error(`Failed to load preview for ${filename}:`, error);
    }
}

// Load previews for all articles
articles.forEach(loadArticlePreview);
