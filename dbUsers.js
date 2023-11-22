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
const getAllPassports = async () => {
    const sql = `
    SELECT passport
    FROM users`
    const [res] = await pool.query(sql)
    console.log(res);
    return res
}
const addUser = async (name, passportNew) => {
    const allPassports = await getAllPassports()

    if (!allPassports.find(({ passport }) => passport === passportNew)) {
        let sql = `
    INSERT INTO accounts()
    VALUE();
`;
        let [{ insertId }] = await pool.query(sql);
        sql = `
    INSERT INTO users (name, passport, id_account)
    VALUES (?, ?,?)
`;
        [{ insertId }] = await pool.query(sql, [name, passportNew, insertId]);
        return getUser(passportNew);

    } else {
        console.log(`user with this passport already exists`);
        return (`user with this passport already exists`);
    }
}
const depositing = async (passport, cash) => {
    const { id_account } = await getUser(passport);
    const sql = `
        UPDATE accounts
        SET cash = cash + ?
        WHERE id_account = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [cash, id_account]);
    if (affectedRows) return getUser(passport);
}
const updateCredit = async (passport, credit) => {
    const { id_account } = await getUser(passport);
    const sql = `
        UPDATE accounts
        SET credit = credit + ?
        WHERE id_account = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [credit, id_account]);
    if (affectedRows) return getUser(passport);
}
const withdrawMoney = async (passport, cash) => { // משיכת כספים
    const sql = `
    UPDATE accounts
    join users s
     USING(id_account)
              SET cash = cash - ?
              WHERE cash - ? >= 0
              AND s.passport = ?
        `;
    const [{ affectedRows }] = await pool.query(sql, [cash, cash, passport]);
    if (affectedRows) return getUser(passport);
}
const transferring = async (passport, numMoney, ohterName) => {  //  ע"י אשראי עברת כספים לחשבון אחר
        const sql = `
        UPDATE accounts aa, accounts ab
        LEFT join users ua
       USING(id_account)
        JOIN users ub
       SET aa.cash =aa.cash - ?, ab.cash =ab.cash + ?
        WHERE ub.passport =?  
        AND aa.cash - ? >=0
        AND ua.name =?  
    `
         const   [ {affectedRows} ] = await pool.query(sql, [numMoney, numMoney,passport,numMoney,ohterName]);
        return affectedRows
}
const getUser = async (passport) => {
    const sql = `
    SELECT *
    FROM users
    JOIN accounts
    USING(id_account)
    WHERE passport  = ? OR name = ?;
`;
    const [[res]] = await pool.query(sql, [passport, passport]);
    console.table(res);
    return res;
}
const getPassportForName = async (name) => {
    const sql = `
    SELECT passport
    FROM users
    WHERE name = ?;
`;
    const [[res]] = await pool.query(sql, [name]);
    console.log(res.passport);
    return res.passport;
}
const getAllUsers = async () => {
    const sql = `
SELECT *
FROM users
    JOIN accounts
    USING(id_account) `
    const [res] = await pool.query(sql)
    console.table(res);
    return res
}
const tast = async () => {
    // await depositing(123123123, 1250)
    // const all = await  getAllUsers()
    // await addUser( 'moshe' , 123456123)
    // getAllPassports()
    // getUser(123456123);
   await transferring(123456123,10,'shimy')
    getAllUsers()
}

tast()










// module.exports.checkDBConnection = checkDBConnection
module.exports = {
    checkDBConnection,
    addUser,
    getUser,
    getAllUsers,
    depositing,
    withdrawMoney,
    transferring,
    getPassportForName
}