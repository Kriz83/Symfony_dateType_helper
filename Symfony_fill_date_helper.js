/*
    Symfony use date id convencion like:
    "form_start_(day, year or month)"

    when we set in form:
    'widget' => 'text',
    'format' => 'dd-MM-yyyy',
    to get day, month and year separate fields.

    Script cuts id from '.form-control' and by combining it with name
    passed by user make fill date fields easier.

    - It takes care to avoid pass more than x characters per field,
    - It clears field onclick
*/

//get start of id to pass to fill assistant (cut last string)
let idStart = document.querySelector('.form-control').getAttribute('id');
let res = idStart.split("_");
res.pop();
//reset string after cut
for (let i=0; i < res.length; i++) {
    if (i == 0) {
        idStart = `${res[i]}`;
    } else {
        idStart = `${idStart}_${res[i]}`;
    }        
}

function dateFillAssistant(fieldName, idStart) {
    let max_chars = 2;

    //set day helper
    let day = document.querySelector(`#${idStart}_${fieldName}_day`);
    preventOverfill(day, max_chars);
    resetFieldData(day);
    checkIsNumber(day);

    //set month helper
    let month = document.querySelector(`#${idStart}_${fieldName}_month`);        
    preventOverfill(month, max_chars);
    resetFieldData(month);
    checkIsNumber(month);

    //set year helper
    let max_charsY = 4;
    let year = document.querySelector(`#${idStart}_${fieldName}_year`);  
    preventOverfill(year, max_charsY);
    resetFieldData(year);
    checkIsNumber(year);        
    
}

//check number of signs for field and prevent to pass more than is set
function preventOverfill(fieldNameData, fieldLength) {
    fieldNameData.addEventListener("keyup", function(e){
        
        if ($(this).val().length >= fieldLength) { 
            $(this).val($(this).val().substr(0, fieldLength));
        }
    });
}

//reset field data onclick
function resetFieldData(fieldNameData) {
    fieldNameData.onclick = function(){        
        fieldNameData.value = '';        
    };
}

//check if only number is passed
function checkIsNumber(fieldNameData) {
    fieldNameData.addEventListener("keyup", function(e){        
        if (isNaN($(this).val())) { 
            fieldNameData.style.color = "red";
        } else {
            fieldNameData.style.color = "black";
        }
    });
}
//

//call date assistant (pass only field name from form "fieldName")
dateFillAssistant('fieldName', idStart);
dateFillAssistant('fieldName2', idStart);
//... pass as many as You want
//enjoy
