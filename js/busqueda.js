document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "2847594585f93891693ee2df5ea6f8ca";

    let qs = location.search;
    let qsObj = new URLSearchParams(qs);
    let busqueda = qsObj.get("Buscar");

    let urlPeliculas = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}`;
    let urlSeries = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${busqueda}`;


    let contenedorPeliculas = document.querySelector('.peliculas-favoritas')
    let contenedorSeries = document.querySelector('.series-favoritas')


    function fetchResults(type) {
        fetch(type === "peliculas" ? urlPeliculas: urlSeries)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.results);

            let contenido = '';
            if (data.results.length) {
                let resultados = data.results
                for (let i = 0; i < 6; i++) {
                    const el = resultados[i];
                    contenido += `<div class="pelicula-inicio">
                            <a href="./detail-movie.html?idPelicula=${el.id}">
                                <img class="img-pelicula-inicio" src="https://image.tmdb.org/t/p/w500/${el.poster_path}">
                            </a>
                            <p>${type==="peliculas"?el.title:el.name}</p>
                            <p>${type==="peliculas"?el.release_date:el.first_air_date}</p>
                        </div>`
                }
            } else {
                contenido = `<div class="pelicula-inicio">
                        <p>No se encontraron ${type} relacionadas con tu busqueda: "${busqueda}".</p>
                    </div>`
            }

            if (type === "peliculas") {
                contenedorPeliculas.innerHTML = contenido
            }else{
                contenedorSeries.innerHTML = contenido
            }

            console.log(contenedorPeliculas);
            console.log(contenedorSeries);

        })
    }
    
    fetchResults("peliculas")
    fetchResults("series")

})