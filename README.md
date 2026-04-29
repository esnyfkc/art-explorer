# Art Explorer

Art Explorer is a front-end web application that allows users to explore artworks from the Art Institute of Chicago API. Users can browse featured artworks, search by artist or artwork title, and open a dedicated detail page for each piece.

## Features

- Discover artworks on the homepage
- Search artworks by artist name or artwork title
- Open a detail page for each artwork
- Navigate back to the gallery page
- Handle missing or unavailable images gracefully
- Responsive layout for desktop and mobile devices

## API Endpoints Used

This project uses the following Art Institute of Chicago API endpoints:

- `GET /artworks`
- `GET /artworks/search`
- `GET /artworks/{id}`

## Technologies Used

- HTML
- CSS
- JavaScript
- Art Institute of Chicago API
- Live Server (for local development)

## Project Structure

```text
art-explorer/
├── index.html
├── artwork.html
├── style.css
├── script.js
├── artwork.js
└── README.md
```

## How to Run the Project Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/esnyfkc/art-explorer.git
   ```

2. Open the project folder in VS Code.

3. Start the project with the Live Server extension.

4. Open `index.html` in your browser.

## How to Use

- The homepage displays featured artworks.
- Use the search bar to find artworks by title or artist name.
- Click on any artwork card to view more details.
- Use the back link on the detail page to return to the gallery.

## Notes

- Some artworks may not have an available image. In those cases, the application displays a fallback message instead of a broken image.
- Search results are filtered to improve relevance for title and artist matches.

## Future Improvements

- Add advanced filters such as date, artist, or origin
- Add loading skeletons for a smoother experience
- Add pagination or a “load more” feature
- Add dark/light theme toggle

## Author

Created by Esin Yufkaci.
