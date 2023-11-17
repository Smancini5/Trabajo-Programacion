document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "2847594585f93891693ee2df5ea6f8ca";

    let qs = location.search;
    let qsObj = new URLSearchParams(qs);
    let id_serie = qsObj.get("idSerie");

    let urlSeriePopular = `https://api.themoviedb.org/3/tv/${id_serie}?api_key=${apiKey}`

    let infoContainer = document.querySelector('.detail-info')
    let imgContainer = document.querySelector('.detail-img')

    fetch(urlSeriePopular)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log(data);
            const genresArray = data.genres;
            let genres = '';

            for (let i = 0; i < genresArray.length; i++) {
                const el = genresArray[i];
                genres += `<p>${el.name}</p>`
            }

            let detalles = `<h1 id="${data.id}" class="serie-name">${data.name}</h1>
                            <p>Calificacion: ${data.vote_average}</p>
                            <p id="fecha${data.id}">Fecha de estreno: ${data.first_air_date}</p>
                            <p>Duracion: ${data.runtime} minutos</p>
                            <h4>Sinopsis</h4>
                            <p>${data.overview}</p>
                            <h4>Generos</h4>
                            ${genres}
                            <button class="boton-favoritos">Agregar a favoritos</button>
                            `

            infoContainer.innerHTML = detalles;

            console.log(imgContainer);
            imgContainer.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

            botonFav = document.querySelector('.boton-favoritos');
            botonFav.addEventListener('click', function () {
                console.log(document.querySelector('.serie-name'));
                let serieName = document.querySelector('.serie-name').innerHTML;
                let serieId = document.querySelector('.serie-name').id;
                console.log(serieId);
                let serieDate = document.querySelector(`#fecha${serieId}`).innerHTML;
                console.log(serieDate);
                let serieImg = imgContainer.src;
                console.log("source: ", serieImg);
                let datosAlmacenadosJSON = localStorage.getItem('seriesFav');
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
                    let veredict = datosAlmacenados.series.some(el => el.serie.nombre === serieName)
                    console.log("veredict", veredict);
                    if (!veredict) {
                        data = {
                            series: [
                                ...datosAlmacenados.series,
                                {
                                    serie: {
                                        nombre: serieName,
                                        id: serieId,
                                        fecha: serieDate,
                                        img: serieImg
                                    }
                                }
                            ]
                        }
                        console.log("hay data, no existe esta serie: ", data);
                    } else {
                        data = datosAlmacenados;
                        console.log("hay data, si existe esta serie: ", data);
                    }
                } else {
                    data = {
                        series: [
                            {
                                serie: {
                                    nombre: serieName,
                                    id: serieId,
                                    fecha: serieDate,
                                    img: serieImg
                                }
                            }
                        ]
                    }
                    console.log("no hay data, agrego esta serie: ", data);
                }

                let datosJSON = JSON.stringify(data)
                console.log(datosJSON);
                localStorage.setItem('seriesFav', datosJSON)

            })

        })

})