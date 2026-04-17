const artGrid = document.getElementById("art-grid");
const message = document.getElementById("message");

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

function buildImageUrl(imageId, iiifUrl) {
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}

function renderArtworks(artworks, iiifUrl) {
  artGrid.innerHTML = "";

  artworks.forEach((artwork) => {
    const card = document.createElement("article");
    card.className = "card";

    const imageHtml = artwork.image_id
      ? `<img src="${buildImageUrl(artwork.image_id, iiifUrl)}" alt="${artwork.title || "Artwork image"}" />`
      : `<div class="no-image">No Image Available</div>`;

    card.innerHTML = `
      ${imageHtml}
      <div class="card-content">
        <h2>${artwork.title || "Untitled"}</h2>
        <p><strong>Artist:</strong> ${artwork.artist_title || "Unknown artist"}</p>
        <p><strong>Date:</strong> ${artwork.date_display || "Not available"}</p>
      </div>
    `;

    artGrid.appendChild(card);
  });
}
loadArtworks();