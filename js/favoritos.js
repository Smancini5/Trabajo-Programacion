document.addEventListener('DOMContentLoaded', function () {
    let peliculasFav = localStorage.getItem('peliculasFav');
    let seriesFav = localStorage.getItem('seriesFav');

    let contenedorPeliculas = document.querySelector('.peliculas-favoritas')
    let contenedorSeries = document.querySelector('.series-favoritas')

    let contenidoPeliculas= '';
    let contenidoSeries= '';
    if (peliculasFav) {
        let peliculas = JSON.parse(peliculasFav).peliculas;
        for (let i = 0; i < peliculas.length; i++) {
            const el = peliculas[i].pelicula;
            contenidoPeliculas += `<div class="pelicula-inicio">
                            <a href="./detail-movie.html?idPelicula=${el.id}">
                                <img class="img-pelicula-inicio" src="${el.img}">
                            </a>
                            <p>${el.nombre}</p>
                            <p>${el.fecha}</p>
                        </div>`
        }
    }else{
        contenidoPeliculas = `<div class="pelicula-inicio">
                        <p>No se marcaron peliculas como favoritas.</p>
                    </div>`
    }

    if (seriesFav) {
        let series = JSON.parse(seriesFav).series;
        for (let i = 0; i < series.length; i++) {
            const el = series[i].serie;
            contenidoSeries += `<div class="pelicula-inicio">
                            <a href="./detail-seriepopular.html?idSerie=${el.id}">
                                <img class="img-pelicula-inicio" src="${el.img}">
                            </a>
                            <p>${el.nombre}</p>
                            <p>${el.fecha}</p>
                        </div>`
        }
    }else{
        contenidoSeries = `<div class="pelicula-inicio">
                        <p>No se marcaron series como favoritas.</p>
                    </div>`
    }

    
    contenedorPeliculas.innerHTML = contenidoPeliculas;
    contenedorSeries.innerHTML = contenidoSeries;

})