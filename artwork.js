const API_BASE_URL = "https://api.artic.edu/api/v1";
const DETAIL_FIELDS = [
  "id",
  "title",
  "image_id",
  "artist_title",
  "date_display",
  "place_of_origin",
  "medium_display"
].join(",");

const detailContainer = document.getElementById("artwork-detail");
const detailStatusMessage = document.getElementById("detail-status-message");

function setDetailStatus(message = "") {
  detailStatusMessage.textContent = message;
}

function getArtworkIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function buildImageUrl(imageId, iiifUrl) {
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}

function createUnavailableImage(className = "no-image detail-no-image") {
  const fallback = document.createElement("div");
  fallback.className = className;
  fallback.textContent = "Image unavailable";
  return fallback;
}

function createDetailImage(artwork, iiifUrl) {
  if (!artwork.image_id) {
    return createUnavailableImage();
  }

  const image = document.createElement("img");
  image.className = "detail-image";
  image.src = buildImageUrl(artwork.image_id, iiifUrl);
  image.alt = artwork.title || "Artwork image";
  image.onerror = () => {
    image.replaceWith(createUnavailableImage());
  };

  return image;
}

function createDetailMeta(label, value) {
  const paragraph = document.createElement("p");
  paragraph.className = "detail-meta";
  paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
  return paragraph;
}

function renderArtworkDetail(artwork, iiifUrl) {
  detailContainer.innerHTML = "";

  const card = document.createElement("article");
  card.className = "detail-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "detail-image-wrapper";

  const imageElement = createDetailImage(artwork, iiifUrl);

  const content = document.createElement("div");
  content.className = "detail-content";

  const title = document.createElement("h2");
  title.className = "detail-title";
  title.textContent = artwork.title || "Untitled";

  const artist = createDetailMeta(
    "Artist",
    artwork.artist_title || "Unknown artist"
  );

  const date = createDetailMeta(
    "Date",
    artwork.date_display || "Not available"
  );

  const origin = createDetailMeta(
    "Origin",
    artwork.place_of_origin || "Not available"
  );

  const medium = createDetailMeta(
    "Medium",
    artwork.medium_display || "Not available"
  );

  content.append(title, artist, date, origin, medium);
  imageWrapper.appendChild(imageElement);
  card.append(imageWrapper, content);
  detailContainer.appendChild(card);
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function loadArtworkDetail() {
  const artworkId = getArtworkIdFromUrl();

  if (!artworkId) {
    setDetailStatus("Artwork ID not found.");
    return;
  }

  try {
    setDetailStatus("Loading artwork details...");

    const url = `${API_BASE_URL}/artworks/${artworkId}?fields=${DETAIL_FIELDS}`;
    const result = await fetchJson(url);

    renderArtworkDetail(result.data, result.config.iiif_url);
    setDetailStatus("");
  } catch (error) {
    console.error(error);
    setDetailStatus("Unable to load artwork details.");
  }
}

loadArtworkDetail();