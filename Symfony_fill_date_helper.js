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

class DateFields
{
    constructor(fieldName) {
        this.fieldName = fieldName;
        this.day = `#${fieldName}_day`;
        this.month = `#${fieldName}_month`;
        this.year = `#${fieldName}_year`;
        this.fieldWidthMultipler = 20;
        this.dayChars = 2; 
        this.monthChars = 2; 
        this.yearChars = 4; 
        this.setUpAssistants();
    }

    //invoke all assistants methods
    setUpAssistants() {
        this.dayAssistant();
        this.monthAssistant();
        this.yearAssistant();
    }

    dayAssistant() {
        let dayField = document.querySelector(this.day);
        dayField.style.position = 'relative';
        dayField.style.width = `${this.fieldWidthMultipler * this.dayChars}px`;
        this.resetFieldData(dayField);
        this.checkIsNumber(dayField);
        this.preventOverfill(dayField, this.dayChars);
    }

    monthAssistant() {
        let monthField = document.querySelector(this.month);
        monthField.style.position = 'relative';
        monthField.style.width = `${this.fieldWidthMultipler * this.monthChars}px`;
        this.resetFieldData(monthField);
        this.checkIsNumber(monthField);
        this.preventOverfill(monthField, this.monthChars);
    }

    yearAssistant() {
        let yearField = document.querySelector(this.year);
        yearField.style.position = 'relative';
        yearField.style.width = `${this.fieldWidthMultipler * this.yearChars}px`;
        this.resetFieldData(yearField);
        this.checkIsNumber(yearField);
        this.preventOverfill(yearField, this.yearChars);
    }

    //reset field data onclick
    resetFieldData(fieldNameData) {
        fieldNameData.onclick = function(){        
            fieldNameData.value = '';        
        };
    }

    //check number of signs for field and prevent to pass more than is set
    preventOverfill(fieldNameData, fieldLength) {
        fieldNameData.addEventListener("keyup", function(e){        
            if (this.value.length >= fieldLength) { 
                this.value = this.value.substr(0, fieldLength);
            }
        });
    }
    
    //check if only number is passed
    checkIsNumber(fieldNameData) {
        fieldNameData.addEventListener("keyup", function(e){        
            if (isNaN(this.value)) { 
                fieldNameData.style.color = "red";
            } else {
                fieldNameData.style.color = "black";
            }
        });
    }

}

class DateObjectCreator
{
    constructor() {
        this.findDateForms();
    }
    
    //cut name from id
    getFormName(formId) {
        let res = formId.split("_");
        res.pop();//cut "day"        
        return res.join('_');
    }

    //get all dateType forms
    findDateForms() {
        let inputs = document.querySelectorAll(`input[name*='[day]']`); 
        let idData;
        let formObjects = [];

        if (inputs.length > 0) { 
            for (let i=0; i < inputs.length; i++) { 
                //get form names and create objects for all
                idData = this.getFormName(inputs[i].getAttribute('id')); 
                formObjects[i] = new DateFields(idData);
            }         
        }   
    }

}

/*
    set up assistants for all date fields
    DateObjectCreator gets all date forms and create object for each one
*/
const createObjectDates = new DateObjectCreator();
//enjoy
