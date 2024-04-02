 
 
const mapPersonajeToSpanish = (personaje) => {
    return {
        nombre: personaje.name,
        altura: personaje.height,
        peso: personaje.mass,
        color_de_pelo: personaje.hair_color,
        color_de_piel: personaje.skin_color,
        color_de_ojos: personaje.eye_color,
        ano_de_nacimiento: personaje.birth_year,
        genero: personaje.gender === 'male' ? 'masculino' : personaje.gender === 'female' ? 'femenino' : 'no especificado',
        mundo_natal: personaje.homeworld,
        peliculas: personaje.films,
        especies: personaje.species,
        vehiculos: personaje.vehicles,
        naves_estelares: personaje.starships,
        creado: personaje.created,
        editado: personaje.edited,
        url: personaje.url
    }
}   

const mapPeliculaToSpanish = (pelicula) => {
    return {
        episodio_id: pelicula.episode_id,
        titulo: pelicula.title,
        director: pelicula.director,
        fecha_de_lanzamiento: pelicula.release_date,
    }
}

// // const mapPeliculaToSpanish = (pelicula) => {
// //     return {
// //         titulo: pelicula.title,
// //         episodio_id: pelicula.episode_id,
// //         apertura_crawl: pelicula.opening_crawl,
// //         director: pelicula.director,
// //         productor: pelicula.producer,
// //         fecha_de_lanzamiento: pelicula.release_date,
// //         personajes: pelicula.characters,
// //         planetas: pelicula.planets,
// //         naves_estelares: pelicula.starships,
// //         vehiculos: pelicula.vehicles,
// //         especies: pelicula.species,
// //         creado: pelicula.created,
// //         editado: pelicula.edited,
// //         url: pelicula.url
// //     }
// // }

module.exports = {
    mapPersonajeToSpanish,
    mapPeliculaToSpanish
}