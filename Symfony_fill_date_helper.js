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
    - It checks if only numbers are passed (red font when not)
*/

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

//set assistant to choosed fields
function dateFillAssistant(fieldName, charsNumberDayMonth, charsNumberYear) {
    //set values for inputs width
    let multipler = 20;
    let dayMonthFieldWidth = multipler * charsNumberDayMonth;
    let yearFieldWidth = multipler * charsNumberYear;

    //set day helper
    let day = document.querySelector(`#${fieldName}_day`);
    
    preventOverfill(day, charsNumberDayMonth);
    resetFieldData(day);
    checkIsNumber(day);
    styleDates('day', dayMonthFieldWidth);

    //set month helper
    let month = document.querySelector(`#${fieldName}_month`);        
    preventOverfill(month, charsNumberDayMonth);
    resetFieldData(month);
    checkIsNumber(month);
    styleDates('month', dayMonthFieldWidth);

    //set year helper
    let year = document.querySelector(`#${fieldName}_year`);  
    preventOverfill(year, charsNumberYear);
    resetFieldData(year);
    checkIsNumber(year);  
    styleDates('year', yearFieldWidth);      
    
}

//cut name from id
function getFormName(formId) {
    let res = formId.split("_");
    res.pop();//cut "day"
    return res.join('_');
}

//get all dateType forms
function findDateForms() {
    let inputs = document.querySelectorAll(`input[name*='[day]']`); 
    let idData;
    let formNames = [];
    if (inputs.length > 0) { 
        for (let i=0; i < inputs.length; i++) { 
            idData = inputs[i].getAttribute('id');                 
            formNames[i] = getFormName(idData);  
        }         
    }
    return formNames;
}

//get result of search
let dateFormNames = findDateForms();
//change attributes for all date fields (add dateFillAssistant)
if (dateFormNames.length > 0) {
    //only when names were found
    let fieldName;
    for (let i = 0; i < dateFormNames.length; i++) {
        fieldName = dateFormNames[i];
        dateFillAssistant(fieldName, 2, 4);
    }
}
//enjoy
