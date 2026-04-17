const artGrid = document.getElementById("art-grid");
const message = document.getElementById("message");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

async function loadArtworks() {
  try {
    message.textContent = "Loading artworks...";

    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=8&fields=id,title,image_id,artist_title,date_display"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch artworks.");
    }

    const result = await response.json();
    const artworks = result.data;
    const iiifUrl = result.config.iiif_url;

    renderArtworks(artworks, iiifUrl);
    message.textContent = "";
  } catch (error) {
    console.error(error);
    message.textContent = "Something went wrong while loading artworks.";
  }
}

async function searchArtworks(query) {
  try {
    message.textContent = "Searching artworks...";

    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,image_id,artist_title,date_display`
    );

    if (!response.ok) {
      throw new Error("Search failed.");
    }

    const result = await response.json();
    const iiifUrl = result.config.iiif_url;

    const searchTerm = query.toLowerCase();
    const artworks = result.data.filter((artwork) => {
      const title = (artwork.title || "").toLowerCase();
      const artist = (artwork.artist_title || "").toLowerCase();

      return title.includes(searchTerm) || artist.includes(searchTerm);
    });

    if (!artworks.length) {
      artGrid.innerHTML = "";
      message.textContent = "No artworks found.";
      return;
    }

    renderArtworks(artworks, iiifUrl);
    message.textContent = "";
  } catch (error) {
    console.error(error);
    message.textContent = "Something went wrong during search.";
  }
}

function buildImageUrl(imageId, iiifUrl) {
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}

function renderArtworks(artworks, iiifUrl) {
  artGrid.innerHTML = "";

  artworks.forEach((artwork) => {
    const card = document.createElement("article");
    card.className = "card";

    const imageHtml = artwork.image_id
      ? `<img 
           src="${buildImageUrl(artwork.image_id, iiifUrl)}" 
           alt="${artwork.title || "Artwork image"}"
           onerror="this.outerHTML='<div class=&quot;no-image&quot;>Image unavailable</div>'"
         />`
      : `<div class="no-image">No Image Available</div>`;

    card.innerHTML = `
      <a href="artwork.html?id=${artwork.id}" class="card-link">
        ${imageHtml}
        <div class="card-content">
          <h2>${artwork.title || "Untitled"}</h2>
          <p><strong>Artist:</strong> ${artwork.artist_title || "Unknown artist"}</p>
          <p><strong>Date:</strong> ${artwork.date_display || "Not available"}</p>
        </div>
      </a>
    `;

    artGrid.appendChild(card);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    message.textContent = "Please enter a search term.";
    return;
  }

  searchArtworks(query);
});

loadArtworks();