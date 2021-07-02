## Custom CSS

---

En esta sección vamos a ver cómo crear y utilizar hojas de estilos css personalizadas.

Para este y otros ejemplos vamos a utilizar como editor de código [VS-Code](https://code.visualstudio.com/).

El repositorio sobre el que vamos a trabajar y que tenemos que clonarnos.

> https://github.com/juanpms2/4_React_GitHub_Searcher.git

Hacemos un `npm install` desde el directorio raíz.

Y arrancamos el proyecto con `npm start`.

---

> #### Contexto
>
> Es un proyecto ya montado y funcionando pero supongamos que nos han pedido que hagamos unas modificaciones.
> Todabía no sabemos manejar los estilos que el proyecto tiene implementados con lo que no los tocaremos.
> Empezaremos trabajando con lo que conocemos; hojas de estilos css.

Como maquetadores nos deberían proporcionar la infraestructura de bundling (empaquetado) ya montada con todo lo necesario para poder trabajar y solo tener que preocuparnos de hacer las importaciones de nuestros estilos para poder utilizarlos.
Webpack es una parte delicada y que no deberíamos tocar salvo que sepamos lo que estamos haciendo.
Vamos a ver varias opciones de cómo utilizar nuestros estilos y en todas ellas es necesaria una configuración e instalación de dependencias que serán las encargadas de que todo funcione.

---

## A los teclados!!

Lo primero será comprobar que tenemos las dependencias necesarias instaladas en nuestro proyecto. Para ello revisamos el archivo `package.json` que es quien tiene definidas las dependencias que se instalarán al hacer un `npm install` desde la consola.

Por ahora necesitamos tener instalados los loaders `style-loader` y `css-loader` que serán los encargados de manejar nuestros estilos.

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

Ya tenemos nuestra hoja de estilos, pero, ¿cómo la utilizamos?...Vamos a ver varias opciones y en todas ellas es necesaria una configuración e instalación de dependencias que serán las encargadas de que todo funcione.

#### Opción 1 (no recomendada)

Como ya he comentado no deberíamos tocar la configuración salvo que sepamos qué estamos haciendo así que esta opción no recomendada la veremos para entender un poco qué hay por detrás de todo esto.

Una vez creada nuestra hoja de estilos vamos a indicar a webpack cuál es su punto de entrada.

```diff
entry: {
		app: "./index.tsx",
+		appStyles: ["./styles/styles.css"],
},
```

En la propiedad `entry` iremos incluyendo las rutas a nuestras hojas de estilos. Lo que hace webpack al generar el bundle es incluir en el `<head>` del `index.html` una etiqueta `<style>...</style>` con las reglas definidas. Se crea una nueva etiqueta por cada hoja de estilos, con lo que debemos tener especial cuidado y tener presente la especificidad y la cascada de estilos. Esto mismo es lo que hará en las diferentes formas que veremos.

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

¿Es este el comportamiento que esperábamos?...¿Qué ocurre si cambiamos el orden en el punto de entrada de webpack?, miremos en el inspector del navegador cómo se han cargado los estilos... exacto!! el orden en la declaración importa.

> **Este es el principal problema si no tenemos definina una buena metodología a la hora de nobrar nuestras clases.**

- **Ventajas**
  - Un único punto de entrada donde definir las hojas de estilos.
  - Es fácil controlar el orden de carga para controlar la cascada y la especificidad.
- **Inconvenientes**
  - Será necesario o muy recomendable utilizar una metodología tipo **BEM** en el nombrado de clases para evitar colisiones.
  - Tenemos que parar y volver a arrancar el servidor cada vez que modificamos `webpack.config`
  - Las rutas pueden llegar a tener mucha profundidad y hacerse complicadas en función de dónde esté definida la hoja de estilos `./pods/header-component/components/avatar-component/avatar-component.styles.css`

> **Recordar que al tratarse de una aplicación en React solo tenemos un único punto de entrada que es `index.html`**

#### Opción 2

Otra opción para cargar nuestro estilos es importarlos en nuestro `index.tsx`, la carga es similar a la anterior y seguiremos teniendo en cuenta la especificidad y la cascada de estilos.

# // TODO......

Si observamos en el navegador.....

**index.tsx**

```diff
+   import globalClass './styles/styles.css'
```

- **Ventajas**
  - Un único punto de entrada donde definir las hojas de estilos.
  - Es fácil controlar el orden de carga para controlar la cascada y la especificidad.
  - No es necesario reiniciar el servidor.
  - Si está configurado, el refresh es automático.
- **Inconvenientes**
  - No se está aislando por componente.
  - Las rutas pueden llegar a tener mucha profundidad y hacerse complicadas en función de dónde esté definida la hoja de estilos `./pods/header-component/components/avatar-component/avatar-component.styles.css`

#### Opción 3

Tenemos una tercera opción que es crear una hoja de estilos por cada componente y hacer la importación como hemos visto anteriormente pero de manera individual. Esta sería la forma recomendada y la aproximación más cercana a lo que sería la componentización, ya que estaríamos aislando el componente junto con sus estilos.

**my-component.tsx**

```diff
+   import innerClass './.styles.css'
```

- **Ventajas**
  - Componentes aislados.
  - Importación sencilla.
  - No es necesario reiniciar el servidor.
  - Si está configurado, el refresh es automático.
- **Inconvenientes**
  - No se puede controlar el orden de carga.
  - Es necesario o recomendable aplicar metodologías como BEM para evitar conflictos de reglas con otros componentes.

Podríamos pensar en una cuarta opción que sería incluir las hojas de estilos de "manera tradicional" en el `index.html` con la etiqueta `<link>`. Esto no tiene mucho sentido si conocemos la funcionalidad de webpack que en este caso es la de empaquetar y procesar todos nuestro estilos en un único archivo css. Si utilizásemos esta formula tendríamos que añadir nueva configuración para que en vez de procesar, copiase esos archivos en la ruta correcta para que puedan ser utilizados. Veremos un ejemplo similar con imágenes.

```
Assuming you are on Webpack 4, you have two options:

    Upgrade to webpack@5.x, which copy-webpack-plugin@8.x supports.
    Downgrade to copy-webpack-plugin@6.x, which is the last version that supports webpack@4.x.

```
