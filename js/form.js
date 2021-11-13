
let dptosLocs = {
  Artigas: ["Artigas", "Bella Unión"],
  Canelones: ["Canelones", "Santa Lucía"],
  Montevideo: ["Montevideo"],
  Salto: ["Salto", "Daymán", "Arapey"],
};

let foo = document.forms.myFrm; // Get the form
let form = document.getElementById("form");
let localidad = document.getElementById("localidad");
let departamento = document.getElementById("departamento");

let departamentos = Object.keys(dptosLocs);
for (let i = 0; i < departamentos.length; i++) {
  let departamento = departamentos[i];
  let option = document.createElement("option");
  option.text = departamento;
  option.value = departamento;
  form.departamento.appendChild(option);
}

for (let i = 0; i < departamentos.length; i++) {
  let departamento = departamentos[i];
  let localidades = dptosLocs[departamento];
  for (let j = 0; j < localidades.length; j++) {
    let localidad = localidades[j];
    let option = document.createElement("option");
    option.text = localidad;
    option.value = localidad;
    form.localidad.appendChild(option);
  }
}


const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const apellido = document.getElementById('apellido');
const cedula = document.getElementById('ci');
const checkbox = document.getElementById('cbox');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    input.addEventListener('focus', function() {
        formControl.className = 'form-control';
    }
    );
    
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Email no es valido');
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} es requerido`)
        }else {
            showSucces(input);
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} debe de contener ${min} caracteres`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} debe de contener ${max} caracteres`);
    }else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validarCedula(ci) {
  if(ci.value === "") {
    return false;
  }
  //Inicializo los coefcientes en el orden correcto
  var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
  var suma = 0;
  //Para el caso en el que la CI tiene menos de 8 digitos
  //calculo cuantos coeficientes no voy a usar
  var difCoef = parseInt(arrCoefs.length - ci.value.length);
  //recorro cada digito empezando por el de más a la derecha
  //o sea, el digito verificador, el que tiene indice mayor en el array
  for (var i = ci.value.length - 1; i > -1; i--) {
      //Obtengo el digito correspondiente de la ci recibida
      var dig = ci.value.substring(i, i + 1);
      //Lo tenía como caracter, lo transformo a int para poder operar
      var digInt = parseInt(dig);
      //Obtengo el coeficiente correspondiente al ésta posición del digito
      var coef = arrCoefs[i + difCoef];
      //Multiplico dígito por coeficiente y lo acumulo a la suma total
      suma = suma + digInt * coef;
      console.log(suma);
  }
  result = false;
  showError(ci, 'Cédula no válida');
  // si la suma es múltiplo de 10 es una ci válida
  if ((suma % 10) === 0) {
      result = true; 
      showSucces(ci);
  }
  return result;
}

//validation checkbox
function validarcheckBox(input) {
  console.log(input);
    if(input.checked) {
        showSucces(input);
    }else {
        showError(input, 'Debes de aceptar los terminos y condiciones');
    }
}


//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([nombre, email, apellido,cedula]);
    checkLength(nombre,3,15);
    checkLength(apellido,6,25);
    checkEmail(email);
    validarCedula(cedula);
    validarcheckBox(checkbox);


    
});