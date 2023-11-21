const mysql = require('mysql2/promise')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sr0583261045',
    database: 'bank-API'
})
const checkDBConnection = async () => {
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
const addUser = async (name, passport) => {
    let sql = `
    INSERT INTO accounts()
    VALUE();
`;
    let [{ insertId }] = await pool.query(sql);

console.log(insertId);
    sql = `
    INSERT INTO users (name, passport, id_account)
    VALUES (?, ?,?)
`;
    [{ insertId }] = await pool.query(sql, [name, passport, insertId]);
console.log(insertId);
    return getUser(insertId);
}

const depositing = () => {    // הפקדה

}

const updateCredit = () => {

}

const withdrawMoney = () => { // משיכת כספים

}
const transferring = () => {  //  ע"י אשראי עברת כספים לחשבון אחר

}
const getUser = async (id) => {
    const sql = `
    SELECT *
    FROM users
    WHERE id_user = ?;
`;
    const [[res]] = await pool.query(sql, [id]);
    console.log(res);
    return res;
}

const getIdUserForName = async (name) => {
    const sql = `
    SELECT id_user
    FROM users
    WHERE name = ?;
`;
    const [[res]] = await pool.query(sql, [name]);
    return res;
}
const getAllUsers = () => {

}
addUser('shimy',123123123)










module.exports.checkDBConnection = checkDBConnection