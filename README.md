# Art Explorer

Art Explorer is a small front-end web application built with HTML, CSS, and JavaScript using the Art Institute of Chicago API.

## Features
- View featured artworks on the homepage
- Search artworks by artist name or artwork title
- Click an artwork card to open a detail page
- Navigate back to the gallery from the detail page
- Handles empty search input and unavailable images

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
- `index.html` - homepage gallery and search UI
- `artwork.html` - artwork detail page
- `style.css` - styling for both pages
- `script.js` - homepage logic and search
- `artwork.js` - artwork detail page logic

## Notes
Some artworks may not have an available image. In those cases, the app displays a fallback message instead of a broken image.