## Node y npm

### ¿Qué es Node.js?

Es un entorno de lado de servidor que trabaja en tiempo de ejecución, de código abierto, multiplataforma, orientado a eventos asíncronos no bloqueantes y que utiliza el motor V8 de Chrome para ejecutar código JavaScript fuera del navegador.

### ¿Cómo funciona?

A diferencia de las técnicas tradicionales de servicio web donde cada conexión genera un nuevo subproceso ocupando la memoria RAM del sistema, Nodejs opera en un único subproceso que se encarga de procesar todas las peticiones. Mientras esta petición se procesa podemos seguir realizando otras peticiones. Cuando la respuesta está lista se coloca en lo que se llama **cola de eventos (Event Queue)** que es monitorizada por el **Event Loop** de tal manera que cuando una petición está lista Node la toma, la procesa y la devuelve.

![Ejemplo Node](./assets/ejemplo-node.gif)

### ¿Cómo instalar Nodejs?

La manera más sencilla es descargar el instalador desde su [web oficial](https://nodejs.org/es/download/) y seguir los pasos.

O podemos utilizar **NVM (Node Version Manager)** si queremos trabajar con distintas versiones de Node. [Documentación de NVM](https://github.com/nvm-sh/nvm#install-script)

### ¿Qué es NPM?

**NPM** (Node Package Manager) es un gestor de paquetes por línea de comandos que tendremos disponible al instalar Nodejs. Este nos permite instalar librerías y administrar dependencias en nuestros proyectos de manera sencilla.

Cuando instalamos un paquete en nuestro proyecto de manera local este se incluye en el directorio **node_modules** pero también podemos indicarle que se instale de manera global si fuera necesario.

**Comandos básicos:**

- **npm -v** nos muestra la versión que tenemos instalada.
- **npm init -y** Crea el package.json inicial del proyecto con los valores por defecto (-y).
- **npm install** Instala el proyecto utilizando el package.json.
- **npm install package --save** Instala una librería como dependecia de producción.
- **npm install --sava-dev** Instala una librería como dependencia de desarrollo.
- **npm uninstall package** Elimina una librería.
- **npm start** Arranca el proyecto.
- **npm stop** Para el proyecto.

[Web oficial de npm](https://www.npmjs.com/)

### Semver 2.0

Define el estándar para denominar versiones con el formato X.Y.Z donde:

- **X** corresponde a la **versión mayor** que se incrementa cuando se añade nueva funcionalidad que puede no ser compatible con versiones anteriores.
- **Y** corresponde a la **versión menor** que se incrementa cuando se añade nueva funcionalidad compatible con versiones anteriores.
- **Z** corresponde a la **versión parche** que se incrementa al añadir nuevas correcciones de errores y mantiene la compatibilidad con versiones anteriores.

La versión **0.0.Z** debe ser considerada como una versión inestable.

[Web oficial de Semver](https://semver.org/lang/es/)
