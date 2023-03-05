
# Ecommerce Backend




## Instalacion

Se necesita tener descargado NodeJS.
Para descargar las dependencias necesarias con npm escibir esto en la consola

```bash
  npm install 
```

En el caso de usar Yarn escribir esto en la consola

```bash
  yarn install 
```

   
## Ejecutar

Para correr la app usar

```bash
  npm run start
```


## Dependencias

    "bcrypt-nodejs": "^0.0.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "method-override": "^3.0.0",
    "mongoose": "^6.8.3",
    "nodemailer": "^6.9.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "socket.io": "^4.6.1"
## Variables de entorno 

Para ejecutar el proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

`MONGODB_URI = ""` 

`USER_GMAIL = ""`

`PASS_GMAIL = ""`

`PORT = `

`SESSION_EXP = `

## Endpoints

### Usuarios

```http
  GET /usuario/registro  --> Renderiza la vista del registro de usuarios. 
```

```http
  POST /usuario/registro  --> Guarda lo instroducido en el registro de usuarios.
``` 

```http
  GET /  --> Renderiza la vista del login de usuarios.
``` 

```http
  POST /usuario/login --> Guarda lo instroducido en el login de usuarios.
``` 

```http
  GET /usuario/logout --> Cierra la sesion del usuario.
``` 

```http
  GET /cuenta --> Renderiza la vista de los datos de la cuenta.
``` 

### Productos

```http
  GET /productos/add  --> Renderiza la vista de un formulario para agregar un producto.
```

```http
  POST /productos/nuevoProducto  --> Guarda lo instroducido en el formulario para agregar un producto.
```

```http
  GET /productos  --> Renderiza la vista para listar los productos agregados.
```

```http
  DELETE /productos/delete/:id  --> Elimina un producto por id pasado por parametro.
```

```http
  GET /productos/:id --> Busca un producto por id pasado por parametro y lo renderiza.
```

```http
  GET /productos/categoria/:categoria --> Busca los productos una categoria pasada por parametro y lo renderiza.
```

### Carritos

```http
  POST /carrito/producto/:id  --> Agrega un producto que tiene como id el id pasado por parametro.
```

```http
  GET /carritos  --> Renderiza la vista que lista el carrito.
```

```http
  DELETE /carritos/delete/:id  --> Elimina un producto por id que este en el carrito.
```

```http
  POST /finalizarCompra  --> Envia email con los detalles de la compra y guarda este carrito en la lista de ordenes.
```

### Ordenes

```http
  GET /ordenes  --> Renderiza la vista con todas las ordenes generadas.
```

```http
  DELETE /ordenes/delete/:id  --> Elimina la orden con el id pasado por parametro.
```

### Chat

```http
  GET /chat  --> Renderiza la vista con el chat.
```

```http
  GET /chat/:email  --> Busca los mensajes enviados por el email pasado por parametro.
```







