# CSS React

---

Para este y otros ejemplos vamos a utilizar como editor de código [VS-Code](https://code.visualstudio.com/).

El repositorio sobre el que vamos a trabajar y que tenemos que clonarnos.

> https://github.com/juanpms2/4_React_GitHub_Searcher.git

Una vez clonado, hacemos un `npm install` desde el directorio raíz.

Y arrancamos el proyecto con `npm start`.

---

> #### Contexto
>
> Es un proyecto ya montado y funcionando pero supongamos que nos han pedido que hagamos unas modificaciones.
> Todabía no sabemos manejar los estilos que el proyecto tiene implementados con lo que no los tocaremos.
> Iremos viendo diferentes formas de implementar y añadir estilos al proyecto.

Como maquetadores nos deberían proporcionar la infraestructura de bundling (empaquetado) ya montada con todo lo necesario para poder trabajar y solo tener que preocuparnos de hacer las importaciones de nuestros estilos para poder utilizarlos.
Webpack es una parte delicada y que no deberíamos tocar salvo que sepamos lo que estamos haciendo.
Vamos a ver varias opciones de cómo utilizar nuestros estilos y en todas ellas es necesaria una configuración e instalación de dependencias que serán las encargadas de que todo funcione.

## Custom CSS

---

En esta sección vamos a ver cómo crear y utilizar hojas de estilos css personalizadas.

Lo primero será comprobar que tenemos las dependencias necesarias instaladas en nuestro proyecto. Para ello revisamos el archivo `package.json` que es quien tiene definidas las dependencias que se instalarán al hacer un `npm install` desde la consola.

Por ahora necesitamos tener instalados los loaders `style-loader` y `css-loader` que serán los encargados de manejar nuestros estilos.

Podemos instalarlos con `npm install css-loader styles-loader --save-dev` .

**package.json**

```diff
(...)
"devDependencies": {
		"@babel/cli": "^7.14.5",
		"@babel/core": "^7.14.6",
		"@babel/preset-env": "^7.14.7",
		"@babel/preset-react": "^7.14.5",
		"@babel/preset-typescript": "^7.14.5",
		"@types/react": "^17.0.11",
		"@types/react-dom": "^17.0.8",
		"babel-loader": "^8.2.2",
		"clean-webpack-plugin": "^4.0.0-alpha.0",
		"compression-webpack-plugin": "^8.0.1",
+		"css-loader": "^5.2.6",
		"html-loader": "^2.1.2",
		"html-webpack-plugin": "^5.3.2",
		"mini-css-extract-plugin": "^1.6.1",
		"npm-run-all": "^4.1.5",
		"rimraf": "^3.0.2",
		"sass": "^1.35.1",
		"sass-loader": "^12.1.0",
+		"style-loader": "^3.0.0",
		"typescript": "^4.3.4",
		"url-loader": "^4.1.1",
		"webpack": "^5.40.0",
		"webpack-bundle-analyzer": "^4.4.2",
		"webpack-cli": "^4.7.2",
		"webpack-dev-server": "^3.11.2",
		"webpack-merge": "^5.8.0"
	},
  (...)
```

Es momento de definir una estrategia para nuestros estilos. Podríamos crear un directorio `styles` en la carpeta `src` donde incluir todas nuestras hojas de estilos. También podríamos optar por definir en cada componente su hoja de estilos o podríamos utilizar una combinación de ambas. Esto es algo flexible con lo que iremos cambiando de una a otra para ver que pasa.

Vamos a empezar creando un directorio dentro de la carpeta `src` que llamaremos `styles` y dentro nuestra hoja de estilos principal llamada `styles.css` con una clase que tiene la propiedad `background-color`.

**src/styles/styles.css**

```diff
+   .backgroundColor {
+       background-color: salmon;
+   }
```

Ya tenemos nuestra hoja de estilos, pero, ¿cómo la utilizamos?...

#### Opción 1 (no recomendada)

Como ya he comentado no deberíamos tocar la configuración salvo que sepamos qué estamos haciendo así que esta opción no recomendada la veremos para entender un poco qué hay por detrás de todo esto.

Una vez creada nuestra hoja de estilos vamos a indicar a webpack cuál es su punto de entrada.

```diff
entry: {
		app: "./index.tsx",
+		appStyles: ["./styles/styles.css"],
},
```

En la propiedad `entry` iremos incluyendo las rutas a nuestras hojas de estilos.

Ahora vamos a crear una nueva hoja de estilos pero esta vez será específica (o debería) para un componente.

**src/scenes/members-scene.styles.css**

```diff
+   .backgroundColor {
+       background-color: red;
+   }
```

Y añadimos un nuevo punto de entrada a webpack para estos estilos.

```diff
entry: {
		app: "./index.tsx",
-		appStyles: ["./styles/styles.css"],
+		appStyles: ["./styles/styles.css", "./scenes/members-scene.styles.css"],
},
```

¿Es este el comportamiento que esperábamos?...¿Qué ocurre si cambiamos el orden en el punto de entrada de webpack?, miremos en el inspector del navegador cómo se han cargado los estilos.

Lo que hace webpack al generar el bundle es incluir en el `<head>` del `index.html` una etiqueta `<style>...</style>` con las reglas definidas. Se crea una nueva etiqueta por cada hoja de estilos, con lo que debemos tener especial cuidado y tener presente la especificidad y la cascada de estilos. El orden en la declaración importa.

- **Ventajas**
  - Un único punto de entrada donde definir las hojas de estilos.
  - Es fácil controlar el orden de carga para controlar la cascada y la especificidad.
- **Inconvenientes**
  - Será necesario o muy recomendable utilizar una metodología tipo **BEM** en el nombrado de clases para evitar colisiones.
  - Tenemos que parar y volver a arrancar el servidor cada vez que modificamos la configuración de **webpack**.
  - Las rutas pueden llegar a tener mucha profundidad y hacerse complicadas en función de dónde esté definida la hoja de estilos `./pods/header-component/components/avatar-component/avatar-component.styles.css`

> **Recordar que al tratarse de una aplicación en React solo tenemos un único punto de entrada que es `index.html`**

#### Opción 2

Otra opción para cargar nuestro estilos es importarlos en nuestro `index.tsx`.

**index.tsx**

```diff
+	import './styles/styles.css',
+	import  "./styles/other-styles.css";
```

Si observamos en el navegador vemos que la carga es similar a la anterior y seguiremos teniendo en cuenta la especificidad y la cascada de estilos.

- **Ventajas**
  - Un único punto de entrada donde definir las hojas de estilos.
  - Es fácil controlar el orden de carga para controlar la cascada y la especificidad.
  - No es necesario reiniciar el servidor.
  - Si está configurado, el refresh es automático.
- **Inconvenientes**
  - Será necesario o muy recomendable utilizar una metodología tipo **BEM** en el nombrado de clases para evitar colisiones.
  - No se está aislando por componente.
  - Las rutas pueden llegar a tener mucha profundidad y hacerse complicadas en función de dónde esté definida la hoja de estilos `./pods/header-component/components/avatar-component/avatar-component.styles.css`

#### Opción 3 (recomendable)

Tenemos una tercera opción que es crear una hoja de estilos por cada componente y hacer la importación como hemos visto anteriormente pero de manera individual.

Vamos a dejar cargada la hoja de estilos principal en `index.tsx` y a nuestro componente le vamos a incluir la suya propia. Observemos qué pasa... si nos fijamos en el navegador vemos que primero carga los estilos específicos del componente, seguido la hoja de estilos principal, con lo que en caso de conflicto sobrescribirá los estilos del componente.

**members-scene.tsx**

```diff
+   import './members-scene.styles.css'
```

Esta sería la forma recomendada y la aproximación más cercana a lo que es la componentización, ya que estaríamos aislando el componente junto con sus estilos.

- **Ventajas**
  - Componentes aislados.
  - Importación sencilla.
  - No es necesario reiniciar el servidor.
  - Si está configurado, el refresh es automático.
- **Inconvenientes**
  - No se puede controlar el orden de carga.
  - Es necesario o recomendable aplicar metodologías como **BEM** para evitar conflictos de reglas con otros componentes.

## CSS Modules

---

Como hemos visto para conseguir unos componentes aislados cada uno tiene su propia hoja de estilos.

Ya sabemos cómo utilizar nuestros estilos pero el principal problema que nos encontramos es la colisión de clases si no utilizamos una buena metodología a la hora de nombrarlas. Estas metodologías pueden resultar tediosas y tampoco nos libran al 100% de las colisiones, sobre todo en proyectos grandes.

¿Y si pudiésemos automatizar esta tarea?

#### CSS modules al rescate.

¿Qué es **CSS modules**? CSS Modules son archivos CSS que, con la ayuda de bundlers como **Webpack** nos permiten escribir estilos que luego se convertirán en nobres de clase únicos. Están compuestos por: nombre de archivo, nombre de clase y un hash aleatorio. Este nombre lo genera de manera automática el bundler tomando como hemos dicho el nombre de la clase que hayamos declarado y agregando el nombre del componente junto con el hash auto-generado. Esto nos permitirá aislarnos del resto de la aplicación a la hora de trabajar en nuestros elementos o componentes ya que cada nombre será único y específico de ese módulo.

La configuración en **Webpack** es sencilla. Los loaders que utilizaremos son los mismos `style-loader` y `css-loader`, simplemente se añade una configuración extra:

```diff
use: [
  "style-loader",
-  "css-loader",
+  {
+    loader: "css-loader",
+    options: {
+      modules: true,
+    },
+  },
],
```

Importamos nuestros estilos en el componente pero ahora de manera nombrada.

```diff
+	import innerClasses from './members-scene.styles.css';
```

Y utilizamos nuestra clase de la siguiente manera

```diff
<AppLayout>
-	<div className="backgroundColor">
+	<div className={innerClasses.backgroundColor}>
		<div className={classes.root}>
			<BarTitleComponent />
			<MembersCollectionContainer />
		</div>
	</div>
</AppLayout>
```

Veamos en el navegador desde el inspector cómo queda nombrada la clase.

Esta configuración sería suficiente pero vamos a definirla un poco más para tener un mayor control.
A la hora de nombrar las clases por convención se recomienda utilizar sintaxis `camelCase` ya que si utilizamos por ejemplo `kebab-case` y no tenemos la configuración siguiente tendríamos que añadir las clases utilizando corchetes `classes["mi-clase-kebab-case"]` en vez de `classes.miClaseCamelCase` que es más cómoda de utilizar.

```diff
use: [
		"style-loader",
		{
			loader: "css-loader",
			options: {
-				modules: true,
+				modules: {
+					exportLocalsConvention: "camelCase",
+					localIdentName: "[path][name]__[local]--[hash:base64:5]",
+					localIdentContext: helpers.resolveFromRootPath("src"),
+				},
			},
		},
	],
```

Volvemos a comprobar cómo queda el nombrado desde el inspector del navegador.

Acabamos de ver cómo **CSS modules** resuelve todos los problemas e inconvenientes que nos habíamos encontrado a la hora de utilizar nuestros estilos CSS. Ahora nuestros componentes son más independientes, para importar una hoja de estilos solo tenemos que tocar el componente, utilizarlos sigue siendo sencillo y además ya no tenemos la preocupación de colisión de clases.

## SASS

---

Hasta ahora hemos visto como utilizar archivos **CSS** de "manera simple" y utilizando **CSS-modules**.

Ahora veremos cómo utilizar un preprocesador CSS como **SASS**. Para ello seguimos los siguientes pasos:

- Añadimos la extensión `.scss` al archivo `global-types.d.ts` para poder realizar el `import` de nuestra hoja de estilos.

  ```diff
  	declare module "*.jpg";
  	declare module "*.png";
  	declare module "*.svg";
  	declare module "*.css";
  +	declare module "*.scss";
  ```

- Renombramos los archivos `.css` a `.scss`
- Instalamos **sass** y **sass-loader**: `npm install sass sass-loader --save-dev`
- Y por último añadimos la configuración necesaria a **webpack** para que todo funcione.

Los pasos que debemos seguir para utilizar nuestros estilos SASS son los mismos que vimos con CSS.

Si no vamos a utilizar **CSS-modules** encontraríamos una configuración similar a esta en el webpack.config:

**webpack-dev.config.js**

```diff
module: {
		rules: [
+			{
+				test: /\.scss$/,
+				exclude: /node_modules/,
+				use: [
+					"style-loader",
+					"css-loader",
+					{
+						loader: "sass-loader",
+						options: {
+							implementation: require("sass"),
+						},
+					},
+				],
+			},
			{
				test: /\.css$/,

				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: "[path][name]__[local]--[hash:base64:5]",
								localIdentContext: helpers.resolveFromRootPath("src"),
							},
						},
					},
				],
			},
		],
	},
```

Si por el contrario decidimos utilizar (ya hemos visto sus ventajas) **CSS-modules** tenemos que añadir configuración extra:

**webpack-dev.config.js**

```diff
module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
-					"css-loader",
+					{
+						loader: "css-loader",
+						options: {
+							modules: {
+								exportLocalsConvention: "camelCase",
+								localIdentName: "[path][name]__[local]",
+								localIdentContext: helpers.resolveFromRootPath+("src"),
+							},
+						},
+					},
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.css$/,

				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: "[path][name]__[local]--[hash:base64:5]",
								localIdentContext: helpers.resolveFromRootPath("src"),
							},
						},
					},
				],
			},
		],
	},
```

> Como vemos la implementación de la configuración es muy similar a CSS y la utilización de los estilos es idéntica, con lo que podemos seguir los pasos indicados en los ejemplos con **CSS** para probar nuestros estilos **SASS**.
