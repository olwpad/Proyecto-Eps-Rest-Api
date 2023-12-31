# Proyecto-Eps-Rest-Api :smiley: 


Este es un aplicativo académico diseñado para fortalecer el conocimiento sobre REST API. Permite el registro de pacientes, doctores y citas, así como la eliminación y edición de los mismos. Además, proporciona la funcionalidad de búsqueda tanto para todos los registros según el rol como para un registro específico, también dependiendo del rol.:rocket:

## Funcionalidad

Este proyecto está diseñado para cumplir con el concepto Rest-Api:

1. :x: **Elimina**: Paciente, Doctores y Citas.
2. :pencil2: **Edita**: Paciente, Doctores y Citas.
3. :mag: **Busca**: Paciente, Doctores y Citas.
4. :heavy_plus_sign: **Agrega**: Paciente, Doctores y Citas.

Estas son solo algunas de las muchas características emocionantes que encontrarás en este proyecto. ¡Explora y descubre más!

## Tecnologías Utilizadas

El proyecto hace uso de las siguientes tecnologías y herramientas:

### Frontend

- :atom_symbol: **React**: Una biblioteca de JavaScript de código abierto para construir interfaces de usuario.
- :art: **Bootstrap**: Un framework de diseño web responsivo de código abierto.

### Backend

- :computer: **Node.js**: Un entorno de ejecución de JavaScript basado en el motor V8 de Google Chrome.
- :rocket: **Express**: Un marco de aplicación web rápido y minimalista para Node.js.
- :gear: **Mongoose**: Una biblioteca de modelado de objetos para MongoDB y Node.js.
- :floppy_disk: **MongoDB**: Una base de datos NoSQL de alto rendimiento y de código abierto.
- :label: **TypeScript**: Un lenguaje de programación de código abierto que se basa en JavaScript.

  ## Endpoints

A continuación se muestran los endpoints disponibles en esta API, junto con las acciones asociadas a cada uno. Tenga en cuenta que los verbos HTTP (POST, GET, DELETE, PUT) se mencionan para indicar las acciones correspondientes a cada endpoint, pero deben eliminarse al utilizarlos:

### Doctor :man_health_worker:

- `POST /api/doctor`: Crea un nuevo doctor en la base de datos.
- `GET /api/doctor/:documento`: Obtiene los datos de un doctor específico según su número de cédula.
- `DELETE /api/doctor/:documento`: Elimina un doctor específico de la base de datos según su número de cédula.
- `GET /api/doctor`: Obtiene todos los doctores registrados en la base de datos.
- `PUT /api/doctor/:id`: Actualiza los datos de un doctor específico en la base de datos según su ID.

### Paciente :woman_health_worker:

- `POST /api/paciente`: Crea un nuevo paciente en la base de datos.
- `GET /api/paciente/:documento`: Obtiene los datos de un paciente específico según su número de cédula.
- `DELETE /api/paciente/:documento`: Elimina un paciente específico de la base de datos según su número de cédula.
- `GET /api/paciente`: Obtiene todos los pacientes registrados en la base de datos.
- `PUT /api/paciente/:id`: Actualiza los datos de un paciente específico en la base de datos según su ID.

### Citas :calendar:

- `POST /api/citas`: Crea una nueva cita en la base de datos.
- `GET /api/citas/:documento`: Obtiene los datos de una cita específica según el número de cédula del paciente o el número de cédula del doctor.
- `DELETE /api/citas/:documento`: Elimina una cita específica de la base de datos según el número de cédula del paciente o el número de cédula del doctor.
- `GET /api/citas`: Obtiene todas las citas registradas en la base de datos.
- `PUT /api/citas/:id`: Actualiza los datos de una cita específica en la base de datos según su ID.

 ## Pruebas 
[:bulb: Prueba del proyecto](https://youtu.be/5rBtHukqdtY)


## Configuración

A continuación, se detallan los pasos para configurar y ejecutar el proyecto en tu entorno local:

1. :open_file_folder: Clona el repositorio desde [https://github.com/olwpad/Proyecto-Eps-Rest-Api.git](https://github.com/olwpad/Proyecto-Eps-Rest-Api.git).
2. :wrench: Crea el archivo config.js para el frontend
3. :inbox_tray: Instala las dependencias del frontend ejecutando el siguiente comando en la raíz del proyecto:
   
```bash
 npm install
```
4. :wrench: Crear el  archivo .env para el backend.
5. :inbox_tray: Instala las dependencias del backend ejecutando el siguiente comando en la raíz del proyecto:
   
 ```bash
 npm install
```
   
7. :arrow_forward: Inicia el servidor backend ejecutando el siguiente comando en la raíz del proyecto:
   
```bash
 npm run dev
```
   
9. :arrow_forward: Inicia la aplicación frontend ejecutando el siguiente comando en la raíz del proyecto:

  ```bash
 npm run dev
```

¡Y eso es todo! Ahora deberías poder acceder a la aplicación desde tu navegador web en [http://localhost:3000](http://localhost:3000).


