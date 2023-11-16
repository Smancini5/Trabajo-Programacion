const apiKey = "2847594585f93891693ee2df5ea6f8ca";

let peliculasPopulares = document.querySelector('.peliculas-populares');
let seriesPopulares = document.querySelector('.series-populares');
let seriesValoradas = document.querySelector('.series-valoradas');

function fetching(type) {
    let url ;
    let clase; 
    let direccion;
    let title;
    let fecha;
    let params;
    
    if (type === "peliculas-populares") {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        clase = peliculasPopulares;
        direccion = "detail-movie.html";
        title = "title";
        fecha = "release_date"
        params = "idPelicula"
    }else if(type === "series-populares"){
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        clase = seriesPopulares;
        direccion = "detail-seriepopular.html";
        title = "name"
        fecha = "first_air_date"
        params = "idSerie"
    }else if(type === "series-valoradas"){
        url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
        clase = seriesValoradas;
        direccion = "detail-serievalorada.html"
        title = "name"
        fecha = "first_air_date"
        params = "idSerie"
    }

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log(data.results);
            let info = data.results;

            let contenido = "";

            for (let i = 0; i < 6; i++) {

                contenido += `<article class="pelicula-inicio">
                            <a href="./secciones/${direccion}?${params}=${info[i].id}">
                               <img class="img-pelicula-inicio" src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}">
                            </a>
                            <p>${info[i][title]}</p>
                            <p>Fecha de estreno: ${info[i][fecha]}</p>
                        </article>`

            }

            clase.innerHTML = `<div class="seccion-inicio peliculas-populares">
                                            <div class="fila-peliculas">
                                            ${contenido} 
                                            </div>
                                        </div>`;

        })

        .catch(function (error) {
            console.log(error);
        });
}

fetching("peliculas-populares");
fetching("series-populares");
fetching("series-valoradas");

