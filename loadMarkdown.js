// loadMarkdown.js

const converter = new showdown.Converter();

async function loadMarkdown(filename) {
    try {
        const response = await fetch(filename);
        const markdown = await response.text();

        // Split lines to get the title from the first line (assuming it's a Markdown heading)
        const lines = markdown.split('\n');
        const titleLine = lines[0].replace(/^#\s*/, ''); // Remove leading '#' for the title

        // Set the title in both <title> and <h1>
        document.title = titleLine; // Set the <title>
        document.getElementById("article-title").textContent = titleLine; // Set the <h1>

        // Convert the markdown to HTML and display it
        const html = converter.makeHtml(markdown);
        document.getElementById("article-content").innerHTML = html;
    } catch (error) {
        document.getElementById("article-content").innerHTML = "Error loading article.";
        console.error("Failed to load markdown:", error);
    }
}

// Get filename from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const fileParam = urlParams.get("file");
const articleFilename = fileParam ? `articles/${fileParam}` : "articles/default.md";

loadMarkdown(articleFilename);
