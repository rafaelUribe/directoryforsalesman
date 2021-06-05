const d = document.getElementById('directorio')
const shade = document.getElementById('overlay')
var over = document.getElementById('actividades_over')
var buttons

const MAIN_INFO_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/gdl!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const ACTIVITIES_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/actividades!A:P?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const URL_SLP = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/slp!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const URL_CDMX = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/cdmx!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'

const pintEverything = () => console.log(areas)
const toggleHidden = (elemento) => elemento.classList.toggle('employee')

var main
var mainslp
var maincdmx
var act
var areas = []
var empleados = []
var divs_areas = []
var actividadesHTML

class Area {
    constructor(nombre, actividades, empleados){
        this.nombre = nombre
        this.actividades = actividades
        this.empleados = empleados
    }
}

class Empleado{
    constructor(area, nombre, extension, correo, region){
        this.area = area
        this.nombre = nombre
        this.extension = extension
        this.correo = correo
        this.region = region
    }
}

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {
                (xhttp.status === 200) 
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))               
            }
        });
        xhttp.send();
    });
}

const toggleOverlay = evento => {
    var departamento = areas.filter( a => evento.target.parentElement.innerText.includes(a.nombre))
    over.innerHTML = `<h4 style='font-size: 1.6rem; color: white; margin-bottom: 30px;'>${departamento[0].nombre}</h4>`
    shade.classList.toggle('hidden')
    for(let actividad of departamento[0].actividades){
        over.innerHTML += `<p>${actividad}</p>`
    }
}

const toggleEmpleados = evento => {
    let id =  evento.target.id
    // console.log(id)
    let divs = []
    for(let div of d.children){
        divs.push(div)
    }
    // console.log(divs)
    let divs_a_mostrar = divs.filter( div => div.classList.contains(id))
    for(let element of divs_a_mostrar){
        toggleHidden(element)
    }
}

const toggleEmpleadosPorNombre = evento => {
    let identifier =  evento.target.innerText
    let divs = []
    for(let div of d.children){
        divs.push(div)
    }
    let divs_a_mostrar = divs.filter( div => div.classList.contains(identifier.toLowerCase().replace(' ','').replace(' ','')))
    for(let element of divs_a_mostrar){
        toggleHidden(element)
    }
}

const addSlp = () => {
    
}

const transpose = matrix => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const addGdl = () => {

}

const setVariables = () => {
    // creamos un array de empleados y llenamos con objetos de la clase empleado que traemos desde la varibale main
    // for(let i = 0; i < main.length; i++){
    //     empleados.push(new Empleado(main[i][0].toUpperCase(), main[i][1], main[i][2], main[i][3].trim(), 'gdl'))
    // }

    for(let persona of main) {
        empleados.push(new Empleado(persona[0], persona[1], persona[2], persona[3], 'gdl'))
    }

    for(let i = 1; i < mainslp.length; i++){

    }
    // transponemos el array que recibimos con las areas y sus actividades
    // invocamos la funcion pasandole el array de la peticion y ordenando con sort() por nombre
    var transp = transpose(act).sort()
    // para cada array de area con actividades creamos un objeto de la clase area que le meta el nombre (primer valor de la columna de la hoja de calculo) y las actividades, pero filtrando las que tienen una string vacia o un valor undefined.
    for(let array of transp){
        let filteredarray = array.filter( value => value != undefined).filter( value => value.length > 0)
        let areaname = filteredarray.shift().toUpperCase()
        let employees = empleados.filter( employee => employee.area == areaname)
        areas.push(new Area(areaname, filteredarray, employees))
    }
    // pintEverything()
    // renderizamos el directorio
    for(let area of areas){
        if(area.empleados.length > 0){
            let areaHTML = 
            `<div class='shadow botonarea' id='${area.nombre.toLowerCase().replace(' ','').replace(' ','')}'>
                <h2>${area.nombre}</h2>
                <button class='button_overlay'>Funciones</button>
            </div>`
            d.innerHTML += areaHTML
            for(let empleado of area.empleados){
                let extension = empleado.extension
                let correo = empleado.correo
                if(!empleado.extension){
                    extension = 'no tiene'
                }
                if(!empleado.correo){
                    correo = 'no cuenta con correo'
                }
                d.innerHTML +=
                // ESTO HAY QUE HACERLO MEJOR
                `<div class='${empleado.area.toLowerCase().replace(' ','').replace(' ','')} employee grid'>
                    <p>${empleado.nombre}</p><p>extensión: <span>${extension}</span></p><p>${correo}</p>
                </div>`
            }
        }
    }
    buttons = document.getElementsByClassName('button_overlay')
    for(let boton of buttons){
        boton.addEventListener('click', toggleOverlay)
    }
    for(let div of d.children){
        if(div.classList.contains('botonarea'))
        div.addEventListener('click', toggleEmpleados)
        div.firstElementChild.addEventListener('click', toggleEmpleadosPorNombre)
    }
}

shade.addEventListener('click', toggleOverlay)

const obtenerDatos = async (MAIN_INFO_URL, ACTIVITIES_URL) => {
    try{
        main = await fetchData(MAIN_INFO_URL);
        act = await fetchData(ACTIVITIES_URL);
        mainslp = await fetchData(URL_SLP);
        maincdmx = await fetchData(URL_CDMX)
        main.values.splice(0, 1)
        main = main.values
        act = act.values
        mainslp = mainslp.values
        maincdmx = maincdmx.values
        setVariables()
    } catch (error) {
        console.error(error);
    }
}

obtenerDatos(MAIN_INFO_URL, ACTIVITIES_URL)


