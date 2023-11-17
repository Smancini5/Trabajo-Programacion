const apiKey = "2847594585f93891693ee2df5ea6f8ca";

let generosPeliculas = document.querySelector('.generos-peliculas');
let generosSeries = document.querySelector('.generos-series');



function fetchingGenre(type) {
    let url;
    let clase;
    let params;

    if (type === "peliculas") {
        url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        clase = generosPeliculas;
        params= "idPelicula"
    } else if (type === "series") {
        url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
        clase = generosSeries;
        params = "idSerie"
    }

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log(data);
            let info = data.genres;

            let contenido = "";

            for (let i = 0; i < info.length; i++) {
                let genre = info[i];
                contenido += `<div class="genero">
                            <a class="genero-link" href="./detail-genero-${type}.html?idGenero=${genre.id}&nombreGenero=${genre.name}">
                                <p>${genre.name}</p>
                            </a>
                            </div>`

            }

            clase.innerHTML = contenido;
        })

        .catch(function (error) {
            console.log(error);
        });
}

fetchingGenre("peliculas");
fetchingGenre("series");



