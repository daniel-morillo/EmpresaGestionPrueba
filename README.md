# Instrucciones del Proyecto de Gestión de Empresa
## Tecnologías Utilizadas:
Backend:
 1. Node.js
 2. Javascript
 3. Typescript
 4. Express
 5. Mongoose 
 6. MongoDB Database
Frontend:
 7. React
 8. Typescript
 9. TailwindCSS
 10. DaisyUI

## Overview:
Este es un proyecto realizado bajo la premisa de administración de gestión de empleados y departamentos de una empresa. Para su desarrollo se decidió utilizar una arquitectura MVC (Modelo Vista Controlador)
### Elementos del MVC:
1. Packages/Shared: En la carpeta models se encuentran los modelos de datos declarados utilizando mongoose y typescript. En la carpeta de services se encuentran hooks personalizados los cuales son usados en el cliente para que el mismo no interactúe directamente con el Backend

2. Api: dispone de una carpeta por cada modelo de dato empleado, en esa carpeta se encuentran los servicios, controladores y routers de cada modelo dentro de la api. También una carpeta middleware con un asynHandler para manejar las asincronías de las peticiones a la api. Finalmente el archivo router.ts es donde están todas las rutas y server.ts es el archivo principal de la api.

3. Client: toda la lógica que interactua con el cliente, es decir, las vistas en sí, hay una carpeta components para componentes recurrentes en el diseño y una carpeta de vistas donde se encuentran todas las páginas que son manejadas gracias a React Router.

## Instrucciones para correr el proyecto
1. Clonar el repositorio de github
2. Ejecutar el comando npm install para instalar todas las dependencias del proyecto
3. Crear un archivo .env en la ruta base de app/api con las siguientes variables: MONGO_URI, PORT
4. Asignar la Uri de MongoDB compartida a la variable de entorno y establecer el puerto de tu preferencia para la API (por default está en el 3000)
5. Comandos de Ejecución:
   5.1: npm run start --> Ejecuta tanto frontend como backend concurrentemente
   5.2: npm run start:api --> Ejecuta solo backend
   5.3: npm run start:client --> Ejecuta solo frontend

