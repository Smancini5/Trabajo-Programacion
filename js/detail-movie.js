document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "2847594585f93891693ee2df5ea6f8ca";

    let qs = location.search;
    let qsObj = new URLSearchParams(qs);
    let id_pelicula = qsObj.get("idPelicula");

    let urlDetailMovie = `https://api.themoviedb.org/3/movie/${id_pelicula}?api_key=${apiKey}`

    let infoContainer = document.querySelector('.detail-info')
    let imgContainer = document.querySelector('.detail-img')
    let botonFav;

    fetch(urlDetailMovie)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const genresArray = data.genres;
            let genres = '';

            for (let i = 0; i < genresArray.length; i++) {
                const el = genresArray[i];
                genres += `<p>${el.name}</p>`
            }

            let detalles = `<h1 id="${data.id}" class="movie-name">${data.title}</h1>
                            <p>Calificacion: ${data.vote_average}</p>
                            <p id="fecha${data.id}">Fecha de estreno: ${data.release_date}</p>
                            <p>Duracion: ${data.runtime} minutos</p>
                            <h4>Sinopsis</h4>
                            <p>${data.overview}</p>
                            <h4>Generos</h4>
                            ${genres}
                            <button class="boton-favoritos">Agregar a favoritos</button>
                            `

            infoContainer.innerHTML = detalles;

            imgContainer.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
            botonFav = document.querySelector('.boton-favoritos');
            botonFav.addEventListener('click', function () {
                let movieName = document.querySelector('.movie-name').innerHTML;
                let movieId = document.querySelector('.movie-name').id;
                console.log(movieId);
                let movieDate = document.querySelector(`#fecha${movieId}`).innerHTML;
                let movieImg = imgContainer.src;
                console.log("source: ", movieImg);
                let datosAlmacenadosJSON = localStorage.getItem('peliculasFav');
                let datosAlmacenados;
                if (datosAlmacenadosJSON) {
                    console.log('Hay datos en localStorage:', datosAlmacenadosJSON);
                    datosAlmacenados = JSON.parse(datosAlmacenadosJSON)
                } else {
                    console.log('No hay datos en localStorage.');
                }
                let data;
                console.log("esta data se recibio: ", datosAlmacenados);
                if (datosAlmacenados) {
                    let veredict = datosAlmacenados.peliculas.some(el => el.pelicula.nombre === movieName)
                    console.log("veredict", veredict);
                    if (!veredict) {
                        data = {
                            peliculas: [
                                ...datosAlmacenados.peliculas,
                                {
                                    pelicula: {
                                        nombre: movieName,
                                        id: movieId,
                                        fecha: movieDate,
                                        img: movieImg
                                    }
                                }
                            ]
                        }
                        console.log("hay data, no existe esta pelicula: ", data);
                    } else {
                        data = datosAlmacenados;
                        console.log("hay data, si existe esta pelicula: ", data);
                    }
                } else {
                    data = {
                        peliculas: [
                            {
                                pelicula: {
                                    nombre: movieName,
                                    id: movieId,
                                    fecha: movieDate,
                                    img: movieImg
                                }
                            }
                        ]
                    }
                    console.log("no hay data, agrego esta pelicula: ", data);
                }

                let datosJSON = JSON.stringify(data)
                console.log(datosJSON);
                localStorage.setItem('peliculasFav', datosJSON)

            })
        })


})
