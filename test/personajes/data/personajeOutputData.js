
const personajeOutputRepositoryData = {
    personajes1: [
        { nombre: 'Personaje1' }
    ],

    personajes2: [
        { nombre: 'Personaje1' },
        { nombre: 'Personaje2' }
    ]
}

const personajeOutputServiceData = {
    personajes1: [
        {
            nombre: 'Personaje API',
            films: ['urlPelicula1', 'urlPelicula2']
        }
    ],
    personajes2: [
        { 
            nombre: 'Personaje BD', 
            peliculas: ['urlPelicula3'] 
        }
    ],
    response1: {
        id: 123,
    },    

    response2: {
        errorMessage: 'Error al crear personaje',
    },    
}

const personajeOutputControllerData = {
    response1: {
        id: 123,
    },
    response2: {
        message: 'Personaje creado exitosamente',
    },
    response3: {
        errorMessage: 'Error al crear personaje',
    },

}

module.exports = { personajeOutputRepositoryData, personajeOutputServiceData, personajeOutputControllerData }
