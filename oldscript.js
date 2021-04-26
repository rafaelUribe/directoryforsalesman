//BASE URL
// https://sheets.googleapis.com/v4/spreadsheets/ID-HOJA-CALCULO/values/RANGO?key=CLAVE-API

// https://sheets.googleapis.com/v4/spreadsheets/1R4zsBES3OfzXTUC4E9H0RuMIpTzkKVtQgLWf7As0Gv4/values/BASE1!A1:C3?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU

// ID-HOJA-CALCULO: el identificador de la hoja de cálculo, igual que en el paso anterior, sacado de la propia dirección de la misma.

// RANGO: el rango de datos que queremos sacar. En este documento (https://developers.google.com/sheets/api/guides/concepts#a1_notation) tienes información sobre rangos, pero básicamente un rango se define de la siguiente manera: NombreHoja|Celda1:Celda2. Es decir, en nuestro ejemplo, si queremos tener los datos de la primera hoja (que he llamado Cursos, entre las celdas A1 y E6), sería: Cursos!A1:E6. Del mismo modo, si queremos todos los datos que haya en las columnas de la A a la E, podemos poner: Cursos!A:E, y así si en el futuro añades más filas aparecerán automáticamente en el resultado.

// CLAVE-API: es la clave de la API que acabamos de generar. No te preocupes porque sea pública: sólo tendrá acceso de lectura a las hojas que hayas puesto públicas y además tendrían que saberse el identificador, así que no hay problema.



// var Http = new XMLHttpRequest();
// Http.open('GET', MAIN_INFO_URL);
// Http.send();

// var main_data

// Http.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200){
//         main_data = (JSON.parse(Http.responseText))
//     }
// }

// var Http2 = new XMLHttpRequest();
// Http2.open('GET', ACTIVITIES_URL);
// Http2.send();

// var activities

// Http2.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200){
//         activities = (JSON.parse(Http2.responseText))
//     }
// }



// function createXHR() {
//     try {
//         return new XMLHttpRequest();
//     } catch (e) {
//         try {
//             return new ActiveXObject("Microsoft.XMLHTTP");
//         } catch (e) {
//             return new ActiveXObject("Msxml2.XMLHTTP");
//         }
//     }
// }

// var peticionMain = url => {
//     var Http = createXHR()
//     Http.open('GET', url);
//     Http.send();
//     Http.onreadystatechange = function(){
//         if(this.readyState == 4 && this.status == 200){
//             main_data = (JSON.parse(Http.responseText))
//         }
//     }
// }

// var peticionAct = url => {
//     var Http = createXHR()
//     Http.open('GET', url);
//     Http.send();
//     Http.onreadystatechange = function(){
//         if(this.readyState == 4 && this.status == 200){
//             activities = (JSON.parse(Http.responseText))
//         }
//     }
// }


// const setVariables = () => {
//     let areas_length = act[0].length
//     // for(let i = 0; i < areas_length; i++){
//     //     let thisarea = act.values[0][i]
//     //     let actividades = []
//     //     for(let v = 0; v < areas_length; v++){
//     //         actividades.push(act.values[v][i])
//     //     }
//     //     actividades.shift()
//     //     areas.push(new Area(thisarea, actividades))        
//     // }
//     function transpose(matrix) {
//         return matrix[0].map((col, i) => matrix.map(row => row[i]));
//     }
//     var transp = transpose(act)
//     console.log(transp)
//     for(let array of transp){
//         let filteredarray = array.filter( value => value != undefined).filter( value => value.length > 0)
//         let areaname = filteredarray.shift()
//         areas.push(new Area(areaname, filteredarray))
//     }
//     console.log(areas)
// }

