
const sql = require("./db.js");

// machine constructor
const Machine = function (machine) {
    this.machineID = machine.machineID;
    this.moldID = machine.moldID;
    this.moldShots = machine.moldShots;
    this.failedShots = machine.failedShots;
    this.prodRate = machine.prodRate;
    this.prod_start_date = machine.prod_start_date;
    this.prod_end_date = machine.prod_end_date;
}

// check whether a machine exists in the machines table
Machine.checkMachine = async (machineID) => {
    const row = await sql.query("SELECT * FROM machines WHERE machineID = ?", [machineID]);
    if (row.length > 0) {
        return true;
    }
    return false;
}

// Machine.checkMachine = (machineID, result) => {
//     sql.query(`SELECT * FROM machines WHERE machineID = ?`, [machineID], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             return;
//         }
//         if (res.length) {
//             console.log("found machine");
//             return "machine exists";
//         }
//         // not found machine with the id
//         result({ kind: "not_found" }, null);
//         return "machine does not exist";
//     }
//     );
// }

// create a new machine
Machine.create = async (newMachine) => {
    // insert the new machine into machines table
    await sql.query("INSERT INTO machines SET ?", newMachine);
    return true;
}

module.exports = Machine;

const mysql = require('mysql');
const dotenv = require('dotenv');

const db = require("./db.js");

module.exports.all = function(data,callback){
    var sqlmachines = "SELECT * FROM machines;"

    // check whether empID exists in the employees table
    const status = db.query(sqlmachines,callback,function(err,result){
        console.log(status);
        if(result){
            callback(null,result);
        }else{
            this.callback(err,null);
        }    
	})
}


module.exports.show = function(data,callback){
    var sqlmachines = "SELECT * FROM machines where machineID = ?;"

    // check whether empID exists in the employees table
    const status = db.query(sqlmachines,data.machineID,callback,function(err,result){
        console.log(status);
        if(result){
            callback(null,result);
        }else{
            this.callback(err,null);
        }    
	})
}

module.exports.update = function(data,callback){


    if(data.failedShots==1){
        const updateFailedShots = "UPDATE machines SET failedShots = failedShots + 1 WHERE machineID = ? ;"
        db.query(updateFailedShots,data.machineID,(err,result)=>{
            if(err)throw err;
            // res.send(result);
            console.log(result);
            console.log("update");
        })
    }

    const updateMoldShots = "UPDATE machines SET moldShots = moldShots + 1 WHERE machineID = ?;"
    // check whether empID exists in the employees table
    const status = db.query(updateMoldShots,data.machineID,callback,function(err,result){
        console.log(status);
        if(result){
            callback(null,result);
        }else{
            this.callback(err,null);
        }    
	})
}