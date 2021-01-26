# Practica de testing del Master CloudApps de la URJC


### Crear pelicula (bash)

```
curl -d '{ "title": "Watchmen", "year" : 2009, "director": "Zack Snyder"}'\
    -H "Content-Type: application/json" -X POST http://localhost:3000/api/films/
```

### Ejecutar DynamoDB en local

```
    docker run --rm -p 8000:8000 -d amazon/dynamodb-local:1.13.6
```
