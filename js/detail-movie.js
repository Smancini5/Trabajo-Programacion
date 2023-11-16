document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "2847594585f93891693ee2df5ea6f8ca";

    let qs = location.search;
    let qsObj = new URLSearchParams(qs);
    let id_pelicula = qsObj.get("idPelicula");

    let urlDetailMovie = `https://api.themoviedb.org/3/movie/${id_pelicula}?api_key=${apiKey}`

    let infoContainer = document.querySelector('.detail-info')
    let imgContainer = document.querySelector('.detail-img')

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

            let detalles = `<h1>${data.title}</h1>
                            <p>Calificacion: ${data.vote_average}</p>
                            <p>Fecha de estreno: ${data.release_date}</p>
                            <p>Duracion: ${data.runtime} minutos</p>
                            <h4>Sinopsis</h4>
                            <p>${data.overview}</p>
                            <h4>Generos</h4>
                            ${genres}
                            <button class="boton-favoritos">Agregar a favoritos</button>
                            `

            infoContainer.innerHTML = detalles;

            imgContainer.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        })

})