const axios = require('axios')

class PeliculaRepository {

    constructor() {    
        
    }

    async getPeliculasByUrls(urls) {
        try {

            const peliculasRequests = urls.map(url =>
                axios.get(url).then(response => response.data).catch(() => null)
            )
            const peliculas = await Promise.all(peliculasRequests)
            const peliculasFiltradas = peliculas.filter(pelicula => pelicula !== null)
            return { success: true, data: peliculasFiltradas }
            
        } catch (error) {
            return { success: false, errorMessage: 'Error al obtener Peliculas por BD: ' + error.message }
        }
    }

}

module.exports = new PeliculaRepository()
