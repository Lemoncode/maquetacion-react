## React básico

Antes de empezar a maquetar en React debemos familiarizarnos y entender algunos conceptos y términos que seguro nos aparecerán.

#### SPA (single page application) Aplicación de página única

Es una aplicación que carga una única página HTML y todos los componentes necesarios (js y css) para que se ejecute la aplicación. Cualquier interacción con la página no requiere hacer solicitudes al servidor lo que significa que la página no es recargada.

- Podemos construir SPA pero no es un requerimiento.
- React puede ser utilizado para mejorar pequeñas partes de sitios web existentes.
- React puede coexistir con páginas renderizadas de lado de servidor o cualquier otra biblioteca del lado del cliente.

#### ES6, ES2015, ES2016, etc

Se refieren a las versiones del estándar para JavaScript.

#### Compiladores

Quizá el término más apropiado sería **Transpilador**.

Un compilador de JavaScript toma el código JavaScript, lo transforma y devuelve en un formato diferente. El caso de uso más común es tomar código JavaScript con sintaxis ES6 y transformarlo en código que navegadores más antiguos puedan interpretar. **Babel** es el compilador más usado con React.

#### Bundlers

Los bundlers toman el código JavaScript y CSS escrito como módulos separados, y los combina en unos cuantos archivos mejor optimizados para los navegadore.
**Webpack** es uno de los bundlers más utilizados con React.

#### Package managers

Son herramintas que te permiten administrar las dependencias de tu proyecto. **npm** y **Yarn** son dos package managers muy usados en aplicaciones de React.

#### CDN

Son las siglas en inglés de Content Delivery Network (Red de Entrega de Contenido). Los CDN entregan contenido estático en caché desde una red de servidores alrededor del mundo.

#### JSX

```js
const element = <h1>Hello, world!</h1>;
```

- No es ni un string ni HTML.
- JSX produce "elementos" de React.
- Puedes poner cualquier expresión de JavaScript dentro de llaves en JSX.

  ```js
  const name = "John Doe";
  const element = <h1>Hello, {name}</h1>;
  ```

**React DOM** usa una convención de nombres en **camelCase** para las propiedades en lugar de nombres de atributos HTML. Por ejemplo, **tabindex** se vuelve **tabIndex** en JSX. El atributo **class** se escribe como **className** ya que class es una palabra reservada en JavaScript.

- Puedes utilizar comillas para especificar strings literales como atributos.
  ```js
  const element = <div className="root">Hello World!!</div>;
  ```
- También puedes usar llaves para insertar una expresión JavaScript en un atributo.
  ```js
  const element = <div className={innerClasses.root}>Hello World!!</div>;
  ```
- Pueden contener hijos
  ```js
  const element = (
  	<div className={innerClasses.root}>
  		<h1>Hello World!!</h1>
  	</div>
  );
  ```
- JSX previene ataques de inyección. Todo es convertido en un string antes de ser renderizado.

#### Elementos

```js
const element = <h1>Hello, world!</h1>;
const element2 = <UnComponente />;
```

- Son los bloques de construcción de una aplicación de React.
- Describen lo que quieres ver en pantalla.
- Un elemento no es lo mismo que un componente.
- Pueden representar etiquetas del DOM y componentes.
- Son inmutables. Una vez creas un elemento, no puedes cambiar sus hijos o atributos.
- Un elemento es como un fotograma solitario en una película: este representa la interfaz de usuario en cierto punto en el tiempo.
- Normalmente, los elementos no se utilizan directamente, si no que se devuelven desde los componentes.

#### Componentes

Los componentes permiten separar la interfaz de usuario en piezas independientes, reutilizables y pensar en cada pieza de forma aislada.

La versión más simple de un componente es una función JS que devuelve un elemento.

```js
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}
```

- Pueden estar formados por otros componentes.
- Pueden ser usados en otros componentes.
- Pueden devolver otros componentes, arreglos, cadenas de texto y números.
- Por convención el nombre de un componente debería comenzar con una letra mayúscula.

##### props (propiedades)

- Las props son utilizadas para pasar información desde un componente padre a un componente hijo.
- Son de solo lectura y nunca deben ser modificadas.
  ```js
  // Incorrecto!
  props.number = 42;
  ```

##### props.children

Contiene el contenido ubicado entre las etiquetas de apertura y cierre de un componente.

```js
function HelloComponent(props) {
	return <p>{props.children}</p>;
}
```

```js
<HelloComponent>Hello world!</HelloComponent>
```

##### Estado

- Un componente necesita estado cuando algunos datos asociados a el cambian con el tiempo.
- La diferencia más importante entre estado y props es que las props son pasadas desde un componente padre, pero el estado es manejado por el propio componente.
- Un componente no puede cambiar sus props, pero puede cambiar su estado.

#### Keys

- Una “key” es un atributo especial (cadena de texto) que necesitas incluir cuando creas un arreglo de elementos.
- Deben asignarse a los elementos dentro de un arreglo para darles una identidad estable.

#### Reconciliación

Cuando las props o el estado de un componente de React cambia, React decide si una actualización al DOM es necesaria comparando el elemento recién devuelto con el renderizado previamente. Cuando no son iguales, React actualizará el DOM. Este proceso es llamado “reconciliación”.

---

> Fuente: https://es.reactjs.org/docs/glossary.html
