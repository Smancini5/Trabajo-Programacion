document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "2847594585f93891693ee2df5ea6f8ca";

    let qs = location.search;
    let qsObj = new URLSearchParams(qs);
    let nombre_genero = qsObj.get("nombreGenero");
    let id_genero = qsObj.get("idGenero");

    console.log(id_genero);
    console.log(nombre_genero);

    let urlDetalleGenero = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id_genero}`;

    let contenedor = document.querySelector('.genero-series')
    let titulo_genero = document.querySelector('.genero-titulo')


    fetch(urlDetalleGenero)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log(data.results);
            const peliculas = data.results;

            let contenido = "";

            for (let i = 0; i < 9; i++) {

                let el = peliculas[i]

                contenido += `<article class="pelicula-inicio">
                            <a href="./detail-seriepopular.html?idSerie=${el.id}">
                               <img class="img-pelicula-inicio" src="https://image.tmdb.org/t/p/w500/${el.poster_path}">
                            </a>
                            <p>${el.name}</p>
                            <p>Fecha de estreno: ${el.first_air_date}</p>
                        </article>`

            }

            contenedor.innerHTML = `<div class="seccion-inicio peliculas-populares">
                                            <div class="fila-peliculas">
                                            ${contenido} 
                                            </div>
                                        </div>`;
            titulo_genero.innerHTML = nombre_genero;

        })

})