/* GENERACIONES Y CALCULOS DE LANZAMIENTO DE DARDOS */
const total_iteraciones = 167;
let cantidad_tiros = 600;
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


for (let i = 0; i < total_iteraciones; i++) {
    //En cada iteración del bucle for, el valor de i se incrementa en 1 y se agrega al final del vector labels. Al final de todas las iteraciones, el vector labels contendrá una secuencia de números enteros que va desde 0 hasta total_iteraciones - 1
    labels.push(i);

    dardosenDiana = 0;
    dardosenCuadrado = 0;

    for (let j = 0; j < cantidad_tiros; j++) {
        // La función Math.random() genera un número aleatorio entre 0 y 1, y luego se multiplica por tamaño_cuadrado para obtener un valor aleatorio dentro del rango del tamaño del cuadrado
        const x = Math.random() * tamaño_cuadrado;
        const y = Math.random() * tamaño_cuadrado;

        //Usando la formula de distancia entre dos puntos que se ve en calculo avanzado se puede obtener la distancia del dardo al centro del circulo. Esto sirve para saber si el dardo cayo dentro o fuera del circulo.
        const distancia = Math.sqrt(
            Math.pow(x - radio, 2) + Math.pow(y - radio, 2)
        );
        // Si la distancia del dardo calculada anteriormente es menor o igual al radio eso significa que esta dentro de la diana y si la distancia es mayor eso implica que cae en el cuadrado
        if (distancia <= radio) {
            dardosenDiana++;
        } else {
            dardosenCuadrado++;
        }

        if (i == total_iteraciones - 1) {
            // Creamos un punto y le asignno la clase adecuada dependiendo si está dentro o fuera del círculo
            const dardos = document.createElement("div");
            dardos.setAttribute("id", "dardos");

            if (distancia <= radio) {
                dardos.classList.add("dentro_circulo");
            } else {
                dardos.classList.add("fuera_circulo");
            }
            //Se agregan los dardos generados en la simulación a la pantalla y "px" es para indicar que se está utilizando la unidad de medida en píxeles. De esta manera, se le está diciendo al compilador que coloque el dardo en una posición específica de la pantalla en función de su posición en "x" o en "y".
            dardos.style.top = y + "px";
            dardos.style.left = x + "px";
            cuadrado.appendChild(dardos);
        }
    }

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
    $tdIteracion.textContent = i + 1;
    $tr.appendChild($tdIteracion);


    let $tdTiros = document.createElement("td");
    $tdTiros.textContent = cantidad_tiros;
    $tr.appendChild($tdTiros);


    let $tddardosenDiana = document.createElement("td");
    $tddardosenDiana.textContent = dardosenDiana;
    $tr.appendChild($tddardosenDiana);


    let $tdPi = document.createElement("td");
    $tdPi.textContent = formula_PI//.toFixed(2);
    $tr.appendChild($tdPi);

    $cuerpoTabla.appendChild($tr);

    cantidad_tiros += 600;

}

/* GRAFICO */

// Obtengo la referencia al HTML al elemento, LO usO para configurar y mostrar el grafico
const canvas = document.getElementById("myChart");

const ctx = canvas.getContext("2d");
new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: aproximacion_PI.length }, (_, i) => (i + 1) * 600),
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
        plugins: {
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
                suggestedMin: 3.10,
                suggestedMax: 3.18,
                ticks: {
                    precision: 4,
                },
            },
        },
    },
});