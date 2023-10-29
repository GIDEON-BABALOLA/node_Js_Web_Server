const path = require("path");
const Employee = require(path.join(__dirname, "..", "model", "Employees"))
const firedEmployee = require(path.join(__dirname, "..", "model", "firedEmployees"))
const mongoose = require("mongoose")
const get =  (req, res)=>{
     Employee.find()
    .then((data)=>{
      
        res.status(200).json(data)
    }).catch((error)=>{
        res.send(error)
    })
    
};
const post = async (req, res)=>{
    const num = await Employee.find();
    const newman = num.slice(-1);
    const normal = newman[0].id
  
    const newEmployee = {
        id : normal + 1,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
    
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({"message": "firstname and lastname are required"})
    }
    //Adding A New Employee
    const newEmployees = await Employee.create(newEmployee)
    const newEmployeesNumber = await Employee.countDocuments()
    res.status(201).json(newEmployees)
    console.log(`Total Employees ${newEmployeesNumber}`)
    // status code 201 means a new record was created
}
const put = async (req, res)=>{
    const {firstname, lastname} = req.body
    const {id} = req.params
    const employee = await Employee.findOne({id : id})
    if(!employee){
        return res.status(404).json({"message": `EmployeeID ${req.body.id} not found`})
    }
    if(!firstname && !lastname){
return res.json({"messae": "Enter The Employee firstname or lastname"})
    }
    await  Employee.replaceOne({id : id}, {firstname : firstname, lastname : lastname, id : id})
     Employee.findOne({id : id})
     .then((data)=>{
        res.status(201).json(data)
     }).catch((error)=>{
        res.send(error)
     })
}
const patch = async (req, res)=>{
    const {firstname, lastname} = req.body
    console.log(firstname, lastname)
    const {id} = req.params
    const employee = await Employee.findOne({id : id})
    if(!employee){
        return res.status(404).json({"message": `EmployeeID ${req.body.id} not found`})
    }
    if(!firstname && !lastname){
return res.json({"message": "Enter The Employee firstname or lastname"})
    }
try {
await Employee.updateOne({id : id}, { $set: req.body })
await Employee.findOne({id : id})
  .then((data)=>{
    res.status(201).json(data)
  })
  .catch((error)=>{
    res.send(error)
  })
   }
    catch(error){
        res.status(500).json({"message": "Internal Server Error"});
    }
}
const deleted = async (req, res) => {
const { id } = req.params
await Employee.findOne({id : id})
.then( async (data)=>{

     // Create a new ObjectId for the firedEmployee document.
     const newObjectId = new mongoose.Types.ObjectId();

     // Create a firedEmployee document with the new ObjectId and the employee data.
     const firedEmployeeData = {
        id : id,
       _id: newObjectId,
       firstname: data.firstname, // Add other relevant fields here
       lastname : data.lastname
       // Copy other fields as needed
     };
 
     await firedEmployee.create(firedEmployeeData);
})
.catch((error)=>{
    console.log(error)
})
const toBeDeleted = await Employee.findeOne({id : id})
if(!toBeDeleted){
    return res.status(404).json({"message": "Employee does not exist"})
}
await Employee.deleteOne({id : id})
Employee.find()
.then((data)=>{
    res.status(200).json(data)
}).catch((error)=>{
    res.send(error)
})
}
const getEmployee =  (req, res) => {
    const {id} = req.params
     Employee.findOne({id : id})
     .then((data)=>{
        if(!data){
            return res.json({"message" : `No employee with id ${id}`})
        }
        res.status(200).json(data)
     })
     .catch((error)=>{
        res.send(error)
     })
}
module.exports = {get, post, put, deleted, patch, getEmployee}
// SQL https://www.youtube.com/live/hysukrNKZs8?si=svKk82XQ-qut1h_f