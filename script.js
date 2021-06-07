const gdl_button = document.getElementById('gdl-button')
const slp_button = document.getElementById('slp-button')
const cdmx_button = document.getElementById('cdmx-button')
const region_overlay = document.getElementById('region-overlay')

const d = document.getElementById('directorio')
const shade = document.getElementById('activities-overlay')
const over = document.getElementById('actividades_over')

const GDL_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/gdl!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const ACTIVITIES_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/actividades!A:P?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const URL_SLP = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/slp!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'
const URL_CDMX = 'https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/cdmx!A:D?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'

var overlay_buttons
var areas = []
var empleados = []
var region_areas = []
var areas_templates = []

class Area {
    constructor(nombre, actividades, empleados, area_id){
        this.nombre = nombre
        this.actividades = actividades
        this.empleados = empleados
        this.id = area_id
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

const hideOverlay = () => {
    console.log('hola')
    shade.classList.toggle('hidden')
}

shade.addEventListener('click', hideOverlay)

const toggleOverlay = evento => {
    
    shade.classList.toggle('hidden')
    let area_id = evento.target.parentElement.id
    let selected = areas.filter( a => a.id === area_id )
    let area = selected.shift()
    let actividades = area.actividades
    over.innerHTML = `<h4 style='font-size: 1.6rem; color: white; margin-bottom: 30px;'>${area.nombre}</h4>`
    for(let actividad of actividades){
        over.innerHTML += `<p>${actividad}</p>`
    }
}


const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 


const getEmployees = id =>  {
    return empleados.filter(e => e.area.id === id)
}
const getEmployeeTemplates = employees => {
    let templates = []
    for(let e of employees) {
        let n = document.createElement('div')
        n.classList.add(e.area.id, 'employee', 'grid')
        n.id = e.nombre
        n.innerHTML = `<p>${e.nombre}</p><p>extensión: <span>${e.extension}</span></p><p>${e.correo}</p>`
        templates.push(n)
    }
    return templates
}
    
const toggleEmployees = function(event) {
    let button_pressed = event.target
    let container = button_pressed.parentElement
    let area_button = container.firstChild
    let emp
    let emp_templates
    if(container.lastChild.id === button_pressed.id){
        emp = getEmployees(event.target.id)
        emp_templates = getEmployeeTemplates(emp)
        for(let t of emp_templates){
            container.appendChild(t)
        }
    } else {
        container.innerHTML = ''
        container.appendChild(area_button)
    }
}

const getAreaTemplate = (region_areas) => {
    let templates = []
    for(let a of region_areas){
        let n = document.createElement('div')
        n.classList.add('shadow', 'botonarea')
        n.id = a.id
        n.innerHTML =   `
                            <h2>${a.nombre}</h2>
                            <button class='button_overlay'>Funciones</button>
                        `
        let container = document.createElement('div')
        container.classList.add('area_container')
        container.appendChild(n)
        templates.push(container)
    }
    return templates
}

const transpose = matrix => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const getLocalAreas = function(empleados) {
    let local_areas = empleados.map(e => e.area)
    local_areas = local_areas.filter((a, index) => local_areas.indexOf(a) === index)
    return local_areas  
}

const setLocalEmployees = regionaldata => {
    let e = []
    for(let registro of regionaldata){
        let employee_area = areas.filter( a => a.nombre == registro[0])
        e.push(new Empleado(employee_area.shift(), registro[1], registro[2], registro[3], 'gdl'))
    }
    return e
}

const setOverlayButtons = () => {
    overlay_buttons = document.getElementsByClassName('button_overlay')
    for(let b of overlay_buttons){
        b.addEventListener('click', toggleOverlay)
    }
}

const loadRegionalDirectory = function(regionaldata) {
    empleados = setLocalEmployees(regionaldata)   
    region_areas = getLocalAreas(empleados)
    areas_templates = getAreaTemplate(region_areas)
    for(let a of areas_templates){
        d.appendChild(a)
    }
    let area_buttons = document.getElementsByClassName('botonarea')
    setOverlayButtons() 
    for(let e of area_buttons){
        e.addEventListener('click', toggleEmployees)
    }
    
}

// const setVariables = () => {
//     // creamos un array de empleados y llenamos con objetos de la clase empleado que traemos desde la varibale main
//     // for(let i = 0; i < main.length; i++){
//     //     empleados.push(new Empleado(main[i][0].toUpperCase(), main[i][1], main[i][2], main[i][3].trim(), 'gdl'))
//     // }

//     for(let persona of main) {
//         empleados.push(new Empleado(persona[0], persona[1], persona[2], persona[3], 'gdl'))
//     }

//     for(let i = 1; i < mainslp.length; i++){

//     }
//     // transponemos el array que recibimos con las areas y sus actividades
//     // invocamos la funcion pasandole el array de la peticion y ordenando con sort() por nombre
//     var transp = transpose(act).sort()
//     // para cada array de area con actividades creamos un objeto de la clase area que le meta el nombre (primer valor de la columna de la hoja de calculo) y las actividades, pero filtrando las que tienen una string vacia o un valor undefined.
//     for(let array of transp){
//         let filteredarray = array.filter( value => value != undefined).filter( value => value.length > 0)
//         let areaname = filteredarray.shift().toUpperCase()
//         let employees = empleados.filter( employee => employee.area == areaname)
//         areas.push(new Area(areaname, filteredarray, employees))
//     }
//     // renderizamos el directorio
//     for(let area of areas){
//         if(area.empleados.length > 0){
//             let areaHTML = 
//             `<div class='shadow botonarea' id='${area.nombre.toLowerCase().replace(' ','').replace(' ','')}'>
//                 <h2>${area.nombre}</h2>
//                 <button class='button_overlay'>Funciones</button>
//             </div>`
//             d.innerHTML += areaHTML
//             for(let empleado of area.empleados){
//                 let extension = empleado.extension
//                 let correo = empleado.correo
//                 if(!empleado.extension){
//                     extension = 'no tiene'
//                 }
//                 if(!empleado.correo){
//                     correo = 'no cuenta con correo'
//                 }
//                 d.innerHTML +=
//                 // ESTO HAY QUE HACERLO MEJOR
//                 `<div class='${empleado.area.toLowerCase().replace(' ','').replace(' ','')} employee grid'>
//                     <p>${empleado.nombre}</p><p>extensión: <span>${extension}</span></p><p>${correo}</p>
//                 </div>`
//             }
//         }
//     }
//     buttons = document.getElementsByClassName('button_overlay')
//     for(let boton of buttons){
//         boton.addEventListener('click', toggleOverlay)
//     }
//     for(let div of d.children){
//         if(div.classList.contains('botonarea'))
//         div.addEventListener('click', toggleEmpleados)
//         div.firstElementChild.addEventListener('click', toggleEmpleadosPorNombre)
//     }
// }

// shade.addEventListener('click', toggleOverlay)

const obtenerDatosAct = async (URL) => {
    try{
        act = await fetchData(URL);
        return act.values
    } catch (error) {
        console.error(error);
    }
}

const obtenerDatos = async (URL) => {
    try{
        let data = await fetchData(URL);
        data.values.splice(0, 1)
        return data.values
    } catch (error) {
        console.error(error);
    }
}

const setAreaId = name => {
    var n = removeAccents(name)
    for(let i = 0; i < n.length; i++){
        n = n.replace(' ', '_')
    }
    return n.toLowerCase()
}

const setLoadingText = () => {
    region_overlay.innerHTML = `<h2>Cargando...<h2>`
}

const setAreas = async function(URL) {
    setLoadingText()
    let data = await obtenerDatosAct(ACTIVITIES_URL)
    let a = transpose(data)
            .map(area => area.filter(act => act))
    for(let i of a){
        let name = i.shift()
        let id = setAreaId(name)
        areas.push(new Area(name, i, [], id))
    }
    getRegionData(URL)
}

const getRegionData = async function(URL) {
    let regionaldata = await obtenerDatos(URL)
    loadRegionalDirectory(regionaldata)
    region_overlay.classList.add('hidden')
}

const loadGDL = () => {
    setAreas(GDL_URL)
}

const loadSLP = () => {
    setAreas(URL_SLP)
}

const loadCDMX = () => {
    setAreas(URL_CDMX)
}

gdl_button.addEventListener('click', loadGDL)
slp_button.addEventListener('click', loadSLP)
cdmx_button.addEventListener('click', loadCDMX) 


