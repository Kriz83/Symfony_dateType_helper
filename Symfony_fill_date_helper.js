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

function dateFillAssistant(idStart, fieldName, charsNumberDayMonth, charsNumberYear) {
    //set values for inputs width
    let multipler = 20;
    let dayMonthFieldWidth = multipler * charsNumberDayMonth;
    let yearFieldWidth = multipler * charsNumberYear;

    //set day helper
    let day = document.querySelector(`#${idStart}_${fieldName}_day`);
    
    preventOverfill(day, charsNumberDayMonth);
    resetFieldData(day);
    checkIsNumber(day);
    styleDates('day', dayMonthFieldWidth);

    //set month helper
    let month = document.querySelector(`#${idStart}_${fieldName}_month`);        
    preventOverfill(month, charsNumberDayMonth);
    resetFieldData(month);
    checkIsNumber(month);
    styleDates('month', dayMonthFieldWidth);

    //set year helper
    let year = document.querySelector(`#${idStart}_${fieldName}_year`);  
    preventOverfill(year, charsNumberYear);
    resetFieldData(year);
    checkIsNumber(year);  
    styleDates('year', yearFieldWidth);      
    
}

//check number of signs for field and prevent to pass more than is set
function preventOverfill(fieldNameData, fieldLength) {
    fieldNameData.addEventListener("keyup", function(e){
        
        if (this.value.length >= fieldLength) { 
            this.value = this.value.substr(0, fieldLength);
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
        if (isNaN(this.value)) { 
            fieldNameData.style.color = "red";
        } else {
            fieldNameData.style.color = "black";
        }
    });
}
//

//set css style for dates
function styleDates(inputName, fieldWidth) {
    let inputs = document.querySelectorAll(`input[name*='[${inputName}]']`); 
    
    if (inputs.length > 0) {                    
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.position = 'relative';
            inputs[i].style.width = `${fieldWidth}px`;
        }
    }
}
//

/*
 call date assistant 
 (pass "field name" from form "fieldName" (formType), number of chars for day and month, number of chars for year)
*/
dateFillAssistant(idStart, 'fieldName', 2, 4);
dateFillAssistant(idStart, 'fieldName', 2, 4);
//... pass as many as You want
//enjoy
