// Selector Regiones
let selector = document.getElementById('S1')
selector.length = 0;
let sDefault = document.createElement('option');
sDefault.text = ':: Seleccione Region ::';
selector.add(sDefault);
selector.selectedIndex = 0;

// Selector Comunas
let selector2 = document.getElementById('S2');
selector2.length = 0;
let sDefault2 = document.createElement('option');
sDefault2.text = ':: Seleccione Comuna ::';
selector2.add(sDefault2);
selector2.selectedIndex = 0;

// JSON Regiones
fetch('https://api.jsonbin.io/b/5ece71bcbbb0e41480fffc84').then(  
    function(respuesta){  
      if (respuesta.status !== 200){  
        console.warn('Hubo un problema al conectar. Codigo: ' + respuesta.status);  
        return;  
      }

      // Examina la respuesta 
        respuesta.json().then(function(data){  
            let opcion;
        
            for (let i = 0; i < data.length; i++){
                opcion = document.createElement('option');
                opcion.text = data[i].nombre;
                opcion.value = data[i].id;
                selector.add(opcion);
            }    
        });  
    }  
).catch(function(error){  
    console.error('Error Fetch -', error);  
});

// Evento onChange del selector de regiones que rellena el selector de las comunas
function jsFunction(){
    selector2.length = 0;
    let sDefault2 = document.createElement('option');
    sDefault2.text = ':: Seleccione Comuna ::';
    selector2.add(sDefault2);
    selector2.selectedIndex = 0;

    // JSON Comunas 
    fetch('https://api.jsonbin.io/b/5ece78debbb0e41480000191').then(  
        function(respuesta){  
            if (respuesta.status !== 200){  
                console.warn('Hubo un problema al conectar. Codigo: ' + respuesta.status);  
                return;  
            }

            // Examina la respuesta
            respuesta.json().then(function(data){  
                let opcion;
                let opt = selector.options[selector.selectedIndex];
            
                for (let i = 0; i < data.length; i++){
                    if(opt.value == data[i].region_id){
                        console.log(true, " opt.id: " + opt.value + " data.region_id: " + data[i].region_id);
                        opcion = document.createElement('option');
                        opcion.text = data[i].nombre;
                        opcion.value = data[i].id;
                        selector2.add(opcion);
                    }
                }
            });  
        }  
    ).catch(function(error){  
        console.error('Error Fetch -', error);  
    });
}

function getInput(){
    // Inputs
    let inom = document.getElementById("_nom");
    let iap = document.getElementById("_ap");
    let iam = document.getElementById("_am");
    let idir = document.getElementById("_dir");

    let gri = document.getElementById("_liCon");

    if((inom.value === '' && inom.hasAttribute('required')) |
    (iap.value === '' && iap.hasAttribute('required')) |
    (iam.value === '' && iam.hasAttribute('required')) |
    (idir.value === '' && idir.hasAttribute('required')) |
    (selector.selectedIndex === 0) |
    (selector2.selectedIndex === 0)){
        alert('Por favor complete todos los campos!');
    }else{
        let a = document.createElement("label");
        let b = document.createElement("label");
        let c = document.createElement("label");
        let d = document.createElement("label");
        let e = document.createElement("label");
        let f = document.createElement("label");

        a.innerText = inom.value; 
        b.innerText = iap.value; 
        c.innerText = iam.value; 
        d.innerText = idir.value; 
        e.innerText = selector.options[selector.selectedIndex].text;
        f.innerText = selector2.options[selector2.selectedIndex].text;
        
        gri.append(a);
        gri.append(b);
        gri.append(c);
        gri.append(d);
        gri.append(e);
        gri.append(f);

        inom.value = '';
        iap.value = '';
        iam.value = '';
        idir.value = '';

        selector.selectedIndex = 0;
        selector2.selectedIndex = 0;
    }
}