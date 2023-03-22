<div>
<h1 align="center">UWoof API</h1>
</div>

### Descripcion del proyecto:
La problemática de los animales en las calles en México es una situación muy preocupante. Existen miles de perros, gatos y otros animales que deambulan por las calles sin hogar y sin cuidados adecuados. Según la Asociación Mexicana de Médicos Veterinarios Especialistas en Pequeñas Especies, se estima que en México hay alrededor de 23 millones de perros y gatos, de los cuales el 70% viven en las calles.

En la Ciudad de México, se calcula que hay más de 1 millón de perros callejeros. De acuerdo con la Secretaría de Medio Ambiente y Recursos Naturales (SEMARNAT), cada año se abandonan alrededor de 60,000 perros y gatos en el país. La falta de control de la población animal puede llevar a problemas de salud pública, ya que los animales callejeros pueden transmitir enfermedades como la rabia, la leptospirosis y la sarna.

Es por esto que decidimos crear nuestro proyecto de UWoof, una aplicación web diseñada como una red social donde los usuarios o personas en México tengan la oportunidad de adoptar mascotas o dar en adopción, con el objetivo de minimizar el problema de los animales en las calles y darles una mejor calidad de vida. Con esta aplicación se podrá visualizar y publicar animales en la red social esperando ser vistos por otros usuarios con el interés de adoptarlos, los usuarios tendrán la capacidad de publicar mascotas, chatear entre sí para adoptar al animal, modificar su perfil, etc.

Para el desarrollo de la aplicación utilizaremos tecnologías como Node.js, CSS, HTML, SASS, Angular, Javascript, entre otros (más información en el apartado de stack de tecnologías). En conclusión, la problemática de los animales en las calles en México es una situación preocupante que requiere atención y acción. Es por esto que creemos pertinente ofrecer esta solución por nuestra parte y que podamos mejorar la situación en el país.

### Para correr la API:
1.  Clona el repo en la rama main
2.  Entra en el repo clonado
3.  Crea un archivo .env el cual tenga los siguientes parámetros MONGO_URL (con la url de la base de datos de mongodb) y PORT = 3000 (dentro del repo se encuentra un archivo .env.example que sirve para guiarte)
4.  Abre la terminal y escribe los siguientes comandos:
```
npm install
npm run dev
```
5.  Con esto ya debería de estar corriendo la API en  [http://localhost:3000/](http://localhost:3000/)

### Para ver la documentación de Swagger:
1.  Corre el programa con las anteriores instrucciones
2.  Abre en el navegador el siguiente enlace  [http://localhost:3000/swagger](http://localhost:3000/swagger)
3.  Se debe de visualizar algo como esto:
![image](https://user-images.githubusercontent.com/52970365/227041121-f55eb6ff-0874-44af-a8b5-8a1f927c8fa6.png)

### Para hacer las peticiones a la API:
1.  Descomprime el siguiente archivo .zip:  
   [UWoof - dev.postman_collection.zip](https://github.com/pablove2001/UWoof-API/files/11044872/UWoof.-.dev.postman_collection.zip)
2.  Importa el archivo 'UWoof - dev.postman_collection' a Postman
3.  Ejecuta las peticiones

### Dependencias de la API:
- dotenv
- express
- mongoose
- swagger-jsdoc
- swagger-ui-express
- (dev) nodemon