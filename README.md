# Art Explorer

Art Explorer is a small front-end web application built with HTML, CSS, and JavaScript using the Art Institute of Chicago API.

## Features

- View featured artworks on the homepage
- Search artworks by artist name or artwork title
- Open a detail page for each artwork
- Navigate back to the gallery page
- Handle missing or unavailable images gracefully

## API Endpoints Used

- `GET /artworks`
- `GET /artworks/search`
- `GET /artworks/{id}`

## Technologies Used

- HTML
- CSS
- JavaScript
- Art Institute of Chicago API

## How to Run

1. Clone this repository
2. Open the project folder in VS Code
3. Run the project with Live Server
4. Open `index.html` in your browser

## Project Structure

- `index.html` - homepage with featured artworks and search form
- `artwork.html` - artwork detail page
- `style.css` - styles for both pages
- `script.js` - homepage logic, search, and gallery rendering
- `artwork.js` - artwork detail page logic

## Notes

Some artworks may not have an available image. In those cases, the app shows a fallback message instead of a broken image.