# Integracion con API de Star Wars

API que Integra operaciones con la API de Star Wars

### Operaciones:
* **Crear Personaje:**
Se crea un personaje y se guarda en una Base de Datos propia.

* **Listar Personajes:**
Se listan los personajes desde las 2 fuentes de datos: API de Star Wars y de la Base de Datos propia.
también se puede establecer un texto de búsqueda.


### Enlace para probar

### https://lo1bwtmzvb.execute-api.us-east-1.amazonaws.com/dev/swagger

![alt text](https://github.com/vorellana/integration-star-wars-api/blob/develop/resources/images/swagger-1.png?raw=true)


### Características
* Integración con la API de Star Wars
* Uso de Serverless Framework
* Uso de Node.js
* Uso de la Base de datos: DynamoDB
* Uso de las buenas prácticas de desarrollo (SOLID, uso de capas, RESTful, versionado, eslint, prettier)
* Traducción de los campos de inglés a español (mapper)
* Documentación de uso (README.md)
* Implementación de pruebas unitarias (jest, coverage, supertest)
* Documentación de la API con Swagger
* Despliegue sin errores (serverless deploy)
* Manejo de errores consistente
* Despliegue local del servicio
* Despliegue local de BD DynamoDB
* Validación de entradas en una solicitud


## Uso

### Pruebas unitarias
Nos colocamos en la carpeta raíz del proyecto y ejecutamos el siguiente comando:

```bash
npm run test:coverage
```

Se generaran los resultados de las pruebas unitarias de la siguiente manera:

![alt text](https://github.com/vorellana/integration-star-wars-api/blob/develop/resources/images/unit-test-1.png?raw=true)

### Ejecución local
Nos colocamos en la carpeta dynamodb que esta en la raíz del proyecto y ejecutamos el comando:

```bash
# Inicio de la BD Local DynamoDB
npm docker-compose up -d
```

Nos colocamos en la carpeta raiz del proyecto y ejecutamos el siguiente comando:
```bash
# Inicio local de la aplicación
npm serverless offline start
```

### Despliegue

Nos colocamos en la carpeta raíz del proyecto y ejecutamos el siguiente comando:
```bash
# Inicio local de la aplicación
npm serverless deploy
```

Se generara en la terminal el resultado de éxito del desliegue en AWS de la siguiente manera:

![alt text](https://github.com/vorellana/integration-star-wars-api/blob/develop/resources/images/deploy-1.png?raw=true)
