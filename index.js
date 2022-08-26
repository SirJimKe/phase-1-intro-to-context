//Loads Array elements into corresponding Object properties.
function createEmployeeRecord (employeeArray){
    let obj;
    obj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return obj;
}

//Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(array){
    const newEmployeeArray = array.map(createEmployeeRecord);
    return newEmployeeArray;
}

//Add an Object with keys to the timeInEvents Array on the record Object:
function createTimeInEvent(employeeRecord, dateStamp){
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeInEvents.push(timeInObj);

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeOutEvents.push(timeOutObj);

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    let wages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return parseFloat(wages,toString())
}


function allWagesFor(employeeRecord) {
    let wagesArray = []
    const dates = employeeRecord.timeInEvents.map((e) => e.date)
    for (let item of dates){
        wagesArray.push(wagesEarnedOnDate(employeeRecord,item))
    }
    return wagesArray.reduce((prevVal, currentVal) => prevVal + currentVal)
}

function calculatePayroll(employeeArray) {
    let sumOfPayOwed = employeeArray.map(obj => allWagesFor(obj))
    .reduce((a, b) => (a = a + b), 0);

    return sumOfPayOwed;
}