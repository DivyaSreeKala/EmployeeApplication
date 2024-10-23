const mongoose =require('mongoose')
const employeeSchema = mongoose.Schema({
    employeeId : String,
    employeeName : String,
    designation : String,
    salary : Number,
    department : String,
    location : String
})
 
const employeeData = mongoose.model('employee',employeeSchema)
module.exports = employeeData;