
let myData = ['Banana','not Banana', 'Apple'];

function init(){
    getFromLocalStorage();
    render()
    // localStorage.setItem("myFriend", "Flo");
    // localStorage.setItem("names", JSON.stringify(names));
    // console.log(myData);
    // console.log(JSON.stringify(myData))

}



function saveData(){
    let inputRef = document.getElementById('data_input');

    if(inputRef.value != ""){
        myData.push(inputRef.value);
    }

    saveToLocalStorage();

    render();
    inputRef.value = "";
}


function saveToLocalStorage(){
     localStorage.setItem("myData", JSON.stringify(myData)); 
}


function getFromLocalStorage() {
    const cat = localStorage(myData);
    console.log(cat);
}


function render(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let index = 0; index < myData.length; index++) {
        contentRef.innerHTML += `<p>${myData[index]}</p>`
    }
}


// ¿Qué es localStorage?

// localStorage es una forma de almacenamiento web que permite a los sitios web guardar 
//datos en el navegador del usuario. 💾 Es como una pequeña base de datos local que solo tu 
//sitio web puede leer y escribir.

// El dato más importante es que los datos en localStorage persisten. Esto significa que los datos
// se quedan guardados incluso cuando el usuario cierra el navegador o apaga su computadora. 
//No tienen fecha de expiración.

// ¿Cómo funciona?

// localStorage funciona con un sistema simple de clave-valor. 🔑 Esto significa que 
//guardas cada pieza de información con un nombre único (la "clave") y le asignas un valor. Todo, tanto la clave como el valor, se guarda como texto (string).

// Puedes usarlo con estas funciones básicas de JavaScript:

//     localStorage.setItem('clave', 'valor');

//         Guarda un par de clave-valor.

//     localStorage.getItem('clave');

//         Recupera el valor de una clave.

//     localStorage.removeItem('clave');

//         Elimina una clave específica.

//     localStorage.clear();

//         Elimina todos los datos guardados por tu sitio.