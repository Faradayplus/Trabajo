/*
Nombre: Glenn Lanyon Alarcon
Profesor: MICHAEL EMIL CRISTI CAPSTICK
Curso: GRAFOS Y LENGUAJES FORMALES
Seccion: 411
*/

/* GENERACIONES Y CALCULOS DE LANZAMIENTO DE DARDOS */
const total_iteraciones = 26; // Cantidad de veces que se lanzan los dardos, a mayor cantidad de veces mas tarda en ejecutar
let cantidad_tiros = 32; // Cantidad de dardos lanzados, se aumenta n iteraciones su valor
let cantidad_aux = cantidad_tiros; // Declarar un auxiliar sirve para que se realicen cambios en el grafico de manera automatica
const epsilon = 0.0025; 
const aproximacion_PI = []; 
let dardosenDiana = 0;
let dardosenCuadrado = 0;
let labels = [];

//Obtengo las referencias de los elementos cuadrado y circulo de HTML
const cuadrado = document.getElementById("cuadrado");
const circulo = document.getElementById("circulo");

// Obtengo el tamaño del cuadrado
const tamaño_cuadrado = cuadrado.getBoundingClientRect().width;

// Calculo el radio del círculo
const radio = tamaño_cuadrado / 2;

// querySelector es para seleccionar el primer elemento que coincida con el selector CSS #cuerpoTabla. Luego, el elemento seleccionado se está almacenando en la variable #cuerpoTabla.
const $cuerpoTabla = document.querySelector("#cuerpoTabla");


for (let i = 0; i < total_iteraciones; i++){
  //En cada iteración del bucle for, el valor de i se incrementa en 1 y se agrega al final del vector labels. Al final de todas las iteraciones, el vector labels contendrá una secuencia de números enteros que va desde 0 hasta total_iteraciones - 1
  labels.push(i);

  dardosenDiana = 0; // Estas variables estan dentro del for para que no se incrementen cada vez que se recorra el bucle
  dardosenCuadrado = 0;

  for (let j = 0; j < cantidad_tiros; j++){
    // La función Math.random() genera un número aleatorio entre 0 y 1, y luego se multiplica por tamaño_cuadrado para obtener un valor aleatorio dentro del rango del tamaño del cuadrado
    const x = Math.random() * tamaño_cuadrado;
    const y = Math.random() * tamaño_cuadrado;

    //Usando la formula de distancia entre dos puntos que se ve en calculo avanzado se puede obtener la distancia del dardo al centro del circulo. Esto sirve para saber si el dardo cayo dentro o fuera del circulo.
    const distancia = Math.sqrt(
      Math.pow(x - radio, 2) + Math.pow(y - radio, 2)
    );
    // Si la distancia del dardo calculada anteriormente es menor o igual al radio eso significa que esta dentro de la diana y si la distancia es mayor eso implica que cae en el cuadrado
    // El uso de epsilon es una forma de permitir un margen de error en la aproximación del valor de pi, ya que algunos dardos pueden estar muy cerca del límite del círculo pero aún así ser considerados fuera del mismo debido a la precisión de las operaciones 
    if (distancia <= radio + epsilon){
      dardosenDiana++;
    } else {
      dardosenCuadrado++;
    }
  }

  //En el caso de que se quiera mostrar el cuadrado impreso se debe habilitar el codigo comentado
  //
  /*if (i == total_iteraciones - 1){
    // Creamos un punto y le asignno la clase adecuada dependiendo si está dentro o fuera del círculo
    const dardos = document.createElement("div");
    dardos.setAttribute("id", "dardos");

    if (distancia <= radio){
      dardos.classList.add("dentro_circulo");
    } 
    else{
      dardos.classList.add("fuera_circulo");
    }
    //Se agregan los dardos generados en la simulación a la pantalla y "px" es para indicar que se está utilizando la unidad de medida en píxeles. De esta manera, se le está diciendo al compilador que coloque el dardo en una posición específica de la pantalla en función de su posición en "x" o en "y".
    //dardos.style.top = y + "px";
    //dardos.style.left = x + "px";
    //cuadrado.appendChild(dardos);
  }*/

  // Formula para calcular la aproximacion de PI
  const formula_PI = 4 * (dardosenDiana / cantidad_tiros);
  aproximacion_PI.push(formula_PI);

  /* TABLA */
  
  // Creo una nueva fila en la tabla:
  const $tr = document.createElement("tr");

  //Creo una nueva celda de datos para la columna de iteraciones y se va mostrando para cada iteracion i+1 o las variables correspondientes.
  // let $td(DatosDeTabla) = document.createElement("td"): crea una nueva celda de datos para la columna correspondiente.
  //appendChild se utiliza en este código para agregar una nueva fila de datos a una tabla HTML
  let $tdIteracion = document.createElement("td");
  $tdIteracion.textContent = i+1;
  $tr.appendChild($tdIteracion);

  
  let $tdTiros = document.createElement("td");
  $tdTiros.textContent = cantidad_tiros;
  $tr.appendChild($tdTiros);

  
  let $tddardosenDiana = document.createElement("td");
  $tddardosenDiana.textContent = dardosenDiana;
  $tr.appendChild($tddardosenDiana);

  
  let $tdPi = document.createElement("td");
  $tdPi.textContent = formula_PI.toFixed(8);
  $tr.appendChild($tdPi);

  $cuerpoTabla.appendChild($tr);
  cantidad_tiros *= 2; // Aumentando 2 veces el valor por cada iteracion se aplica la Martin Gala
}
/* GRAFICO */

// Obtengo la referencia al HTML al elemento, LO usO para configurar y mostrar el grafico
const canvas = document.getElementById("myChart");

const ctx = canvas.getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from({ length: aproximacion_PI.length }, (_, i) => (i + 1) * cantidad_aux),
    datasets: [
      {
        label: "Aproximación de PI",
        data: aproximacion_PI,
        fill: false,
        borderColor: "rgb(128, 0, 128)", // 0, 255, 0 verde
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins:  {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Número de dardos",
        },
      },
      y: {
        title: {
          display: true,
          text: "Aproximación de PI (π)",
        },
        suggestedMin: 3.00,
        suggestedMax: 3.20,
        ticks: {
          precision: 4,
        },
      },
    },
  },
});