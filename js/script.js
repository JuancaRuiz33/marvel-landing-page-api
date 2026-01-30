

const cargarDatos = async () => {
  try {
    const respuesta = await fetch("./datos/marvel.json"); // solo 1 JSON
    const data = await respuesta.json();

    // Mostrar Datos
    mostrarHeroes(data.heroes);
    mostrarComics(data.comics);
    mostrarMovies(data.movies);
    procesarJuegos(data);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};


function mostrarHeroes(heroes) {
  let container = document.getElementById("heroes-container");
  container.innerHTML = "";

  heroes.forEach(hero => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-3">
        <div class="card bg-black text-white h-100 character-card"
             data-bs-toggle="modal" data-bs-target="#heroModal"
             data-name="${hero.nombre}"
             data-alterego="${hero.alterego}"
             data-description="${hero.descripcion}"
             data-image="${hero.imagen}"
             data-aparicion="${hero.aparicion}"
             data-creators="${hero.creadores}"
             data-alias="${hero.alias}"
             data-habilidades="${hero.habilidades}">
          <img src="${hero.imagen}" class="card-img-top" alt="${hero.nombre}">
          <div class="card-body">
            <h5 class="card-title">${hero.nombre}</h5>
            <p class="card-text">${hero.alias}</p>
          </div>
        </div>
      </div>
    `;
  });
}

function HeroModal() {
  let heroModal = document.getElementById("heroModal");
  heroModal.addEventListener("show.bs.modal", event => {
    const card = event.relatedTarget;
    heroModal.querySelector(".modal-title").textContent = card.getAttribute("data-name");
    heroModal.querySelector(".modal-image").src = card.getAttribute("data-image");
    heroModal.querySelector(".modal-alterego").textContent = card.getAttribute("data-alterego");
    heroModal.querySelector(".modal-description").textContent = card.getAttribute("data-description");
    heroModal.querySelector(".modal-appearance").textContent = card.getAttribute("data-aparicion");
    heroModal.querySelector(".modal-creators").textContent = card.getAttribute("data-creators");
    heroModal.querySelector(".modal-alias").textContent = card.getAttribute("data-alias");
    heroModal.querySelector(".modal-powers").textContent = card.getAttribute("data-habilidades");
  });
}

function mostrarComics(comics) {
  let comicsContainer = document.getElementById("comics-container");
  comicsContainer.innerHTML = "";

  comics.forEach(comic => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${comic.imagen}" class="card-img-top" alt="${comic.titulo}">
        <div class="card-body">
          <h6 class="card-title fw-bold">${comic.titulo}</h6>
          <p class="card-text">
            <small class="text-muted">${comic.autores}</small>
          </p>
        </div>
      </div>
    `;
    comicsContainer.appendChild(col);
  });
}

function mostrarMovies(movies) {
  let listado = document.getElementById('movies-container');
  listado.innerHTML = '';

  movies.forEach(movie => {
    let card = document.createElement("div");
    card.className = "card shadow-sm border-0";
    card.style = "min-width:220px; cursor:pointer;";
    card.innerHTML = `
      <img src="${movie.imagen}" class="card-img-top rounded" alt="${movie.titulo}">
      <div class="card-body text-center">
        <h6 class="card-title fw-bold mb-1">${movie.titulo}</h6>
        <p class="card-text text-muted">${movie.año}</p>
      </div>
    `;
    card.addEventListener("click", () => movieModal(movie));
    listado.appendChild(card);
  });
}

function movieModal(movie) {
  document.getElementById("modalImagen").src = movie.imagen;
  document.getElementById("modalTitulo").innerText = movie.titulo;
  document.getElementById("modalDescripcion").innerText = movie.descripcion || "Sin descripción disponible";
  document.getElementById("modalDirector").innerText = movie.director || "No disponible";
  document.getElementById("modalElenco").innerText = movie.elenco || "No disponible";
  document.getElementById("modalFecha").innerText = movie.año;

  // Mostrar modal
  new bootstrap.Modal(document.getElementById("infoModalMovie")).show();
}


function mostrarJuegos(juegos, contenedorId) {
  let contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  juegos.forEach(juego => {
    let card = document.createElement("div");
    card.className = "col-md-3";
    card.innerHTML = `
          <div class="card bg-black text-white h-100 shadow-sm border-0" style="cursor:pointer;">
            <img src="${juego.imagen}" class="card-img-top" alt="${juego.titulo}">
            <div class="card-body">
              <h5 class="card-title">${juego.titulo}</h5>
              <p class="card-text small">${juego.genero}</p>
              <span class="badge bg-danger">${juego.fecha}</span>
            </div>
          </div>
        `;
    card.addEventListener("click", () => juegoModal(juego));

    contenedor.appendChild(card);
  });
}


function juegoModal(juego) {
  console.log("infoModalGames", juego);
  
  document.getElementById("ImagenGames").src = juego.imagen;
  document.getElementById("TituloGames").innerText = juego.titulo;
  document.getElementById("DescripcionGames").innerText = juego.descripcion || "Sin descripción";
  document.getElementById("CreadorGames").innerText = juego.creador || "No disponible";
  document.getElementById("GeneroGames").innerText = juego.genero || "No disponible";
  document.getElementById("ClasificacionGames").innerText = juego.clasificacion || "No disponible";
  document.getElementById("DisponibleGames").innerText = juego.disponible || "No disponible";
  document.getElementById("FechaGames").innerText = juego.fecha || "No disponible";

  new bootstrap.Modal(document.getElementById("infoModalGames")).show();
}

function procesarJuegos(data) {
  const populares = data.games.filter(j => j.categoria.includes("populares"));
  const recientes = data.games.filter(j => j.categoria.includes("recientes"));

  mostrarJuegos(populares, "contenedorPopulares");
  mostrarJuegos(recientes, "contenedorRecientes");
}

cargarDatos();
HeroModal();

