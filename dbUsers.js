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
    sql = `
    INSERT INTO users (name, passport, id_account)
    VALUES (?, ?,?)
`;
    [{ insertId }] = await pool.query(sql, [name, passport, insertId]);
    return getUser(passport);
}

const depositing = async (passport, cash) => {
    const { id_account } = await getUser(passport);
    const sql = `
        UPDATE accounts
        SET cash = ?
        WHERE id_account = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [cash, id_account]);
    if (affectedRows) return getUser(passport);
}

const updateCredit = async (passport, credit) => {
    const { id_account } = await getUser(passport);
    const sql = `
        UPDATE accounts
        SET credit = ?
        WHERE id_account = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [credit, id_account]);
    if (affectedRows) return getUser(passport);
}

const withdrawMoney = async (passport, cash) => { // משיכת כספים
    const { id_account } = await getUser(passport);
    const sql = `
            UPDATE accounts
            SET cash = cash - ?
            WHERE id_account = ?
        `;
    const [{ affectedRows }] = await pool.query(sql, [cash, id_account]);
    if (affectedRows) return getUser(passport);
}
const transferring = async (passport, numMoney, ohterName) => {  //  ע"י אשראי עברת כספים לחשבון אחר
    let { id_account } = await getUser(passport);
    let otherAccount = await getUser(await getIdUserForPassport(ohterName));
    const sql2 = `
    UPDATE accounts
    SET credit = credit - ?
    WHERE id_account = ?
    `
    const sql = `
    UPDATE accounts
    SET cash = cash + ?
    WHERE id_account = ?;
    `;
    let [{ affectedRows }] = await pool.query(sql2, [numMoney, id_account]);
    if (affectedRows) {
        [{ affectedRows }] = await pool.query(sql, [numMoney, otherAccount.id_account]);
        if (affectedRows) return console.log('transferring');
    }
}
const getUser = async (passport) => {
    const sql = `
    SELECT *
    FROM users
    JOIN accounts
    USING(id_account)
    WHERE passport  = ?;
`;
    const [[res]] = await pool.query(sql, [passport]);
    console.table(res);
    return res;
}

const getIdUserForPassport = async (name) => {
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
    await depositing(123123123, 1250)
    getAllUsers()
}
tast()











module.exports.checkDBConnection = checkDBConnection