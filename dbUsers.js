const mysql = require('mysql2/promise')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sr0583261045',
    database: 'bank-API'
})
 const checkDBConnection = async ()=>{
    try {
        const connection = await pool.getConnection();
        console.log("db connected");
        connection.release();
        return true;
    } catch (error) {
        const message = error.message + "\n" + "can`t connect to db";
        console.log(message);
        return false;
    }
}
const addUser = ()=>{

}

const depositing = ()=>{    // הפקדה

}

const updateCredit = ()=>{

}

const withdrawMoney = ()=>{ // משיכת כספים

}
const transferring = ()=>{  //  ע"י אשראי עברת כספים לחשבון אחר

}
const showDetailsOfUser = ()=>{

}

const showDetailsOfAllUsers = ()=>{
    
}











module.exports.checkDBConnection = checkDBConnection