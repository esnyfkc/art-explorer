const API_BASE_URL = "https://api.artic.edu/api/v1";
const FEATURED_LIMIT = 8;
const ARTWORK_FIELDS = [
  "id",
  "title",
  "image_id",
  "artist_title",
  "date_display"
].join(",");

const galleryContainer = document.getElementById("art-grid");
const statusMessage = document.getElementById("status-message");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const featuredButton = document.getElementById("featured-button");

function setStatus(message = "") {
  statusMessage.textContent = message;
}

function buildImageUrl(imageId, iiifUrl) {
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}

function createUnavailableImage(className = "no-image") {
  const fallback = document.createElement("div");
  fallback.className = className;
  fallback.textContent = "Image unavailable";
  return fallback;
}

function createArtworkImage(artwork, iiifUrl) {
  if (!artwork.image_id) {
    return createUnavailableImage();
  }

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = buildImageUrl(artwork.image_id, iiifUrl);
  image.alt = artwork.title || "Artwork image";
  image.onerror = () => {
    image.replaceWith(createUnavailableImage());
  };

  return image;
}

function createMetaParagraph(label, value, className = "card-meta") {
  const paragraph = document.createElement("p");
  paragraph.className = className;
  paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
  return paragraph;
}

function createArtworkCard(artwork, iiifUrl) {
  const card = document.createElement("article");
  card.className = "card";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `artwork.html?id=${artwork.id}`;

  const imageElement = createArtworkImage(artwork, iiifUrl);

  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = artwork.title || "Untitled";

  const artist = createMetaParagraph(
    "Artist",
    artwork.artist_title || "Unknown artist"
  );

  const date = createMetaParagraph(
    "Date",
    artwork.date_display || "Not available"
  );

  content.append(title, artist, date);
  link.append(imageElement, content);
  card.appendChild(link);

  return card;
}

function renderArtworkList(artworks, iiifUrl) {
  galleryContainer.innerHTML = "";

  artworks.forEach((artwork) => {
    const card = createArtworkCard(artwork, iiifUrl);
    galleryContainer.appendChild(card);
  });
}

function filterSearchResults(artworks, query) {
  const searchTerm = query.toLowerCase();

  return artworks.filter((artwork) => {
    const title = (artwork.title || "").toLowerCase();
    const artist = (artwork.artist_title || "").toLowerCase();

    return title.includes(searchTerm) || artist.includes(searchTerm);
  });
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function loadFeaturedArtworks() {
  try {
    setStatus("Loading featured artworks...");

    const url = `${API_BASE_URL}/artworks?limit=${FEATURED_LIMIT}&fields=${ARTWORK_FIELDS}`;
    const result = await fetchJson(url);

    renderArtworkList(result.data, result.config.iiif_url);
    setStatus("");
  } catch (error) {
    console.error(error);
    setStatus("Something went wrong while loading artworks.");
  }
}

async function searchArtworks(query) {
  try {
    setStatus("Searching artworks...");

    const url = `${API_BASE_URL}/artworks/search?q=${encodeURIComponent(
      query
    )}&fields=${ARTWORK_FIELDS}`;

    const result = await fetchJson(url);
    const filteredArtworks = filterSearchResults(result.data, query);

    if (!filteredArtworks.length) {
      galleryContainer.innerHTML = "";
      setStatus("No artworks found.");
      return;
    }

    renderArtworkList(filteredArtworks, result.config.iiif_url);
    setStatus("");
  } catch (error) {
    console.error(error);
    setStatus("Something went wrong during search.");
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    setStatus("Please enter a search term.");
    return;
  }

  searchArtworks(query);
}

function showFeaturedArtworks() {
  searchInput.value = "";
  setStatus("");
  loadFeaturedArtworks();
}

searchForm.addEventListener("submit", handleSearchSubmit);
featuredButton.addEventListener("click", showFeaturedArtworks);

loadFeaturedArtworks();