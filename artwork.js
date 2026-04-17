const artworkDetail = document.getElementById("artwork-detail");
const detailMessage = document.getElementById("detail-message");

function getArtworkId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function buildImageUrl(imageId, iiifUrl) {
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}

async function loadArtworkDetail() {
  const artworkId = getArtworkId();

  if (!artworkId) {
    detailMessage.textContent = "Artwork ID not found.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id,artist_title,date_display,place_of_origin,medium_display,thumbnail`
    );

    if (!response.ok) {
      throw new Error("Failed to load artwork details.");
    }

    const result = await response.json();
    const artwork = result.data;
    const iiifUrl = result.config.iiif_url;

    const imageHtml = artwork.image_id
      ? `<img 
           src="${buildImageUrl(artwork.image_id, iiifUrl)}" 
           alt="${artwork.title || "Artwork image"}"
           onerror="this.outerHTML='<div class=&quot;no-image detail-no-image&quot;>Image unavailable</div>'"
         />`
      : `<div class="no-image detail-no-image">No Image Available</div>`;

    artworkDetail.innerHTML = `
      <article class="detail-card">
        ${imageHtml}
        <div class="detail-text">
          <h2>${artwork.title || "Untitled"}</h2>
          <p><strong>Artist:</strong> ${artwork.artist_title || "Unknown artist"}</p>
          <p><strong>Date:</strong> ${artwork.date_display || "Not available"}</p>
          <p><strong>Origin:</strong> ${artwork.place_of_origin || "Not available"}</p>
          <p><strong>Medium:</strong> ${artwork.medium_display || "Not available"}</p>
        </div>
      </article>
    `;
  } catch (error) {
    console.error(error);
    detailMessage.textContent = "Unable to load artwork details.";
  }
}

loadArtworkDetail();