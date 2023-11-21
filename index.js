
const express = require('express')
const app = express()
const {checkDBConnection } = require('./dbUsers.js') 
app.get('/', (req, res) => res.send('Hello World!'))







const listen =async ()=>{
const DBConnection = await checkDBConnection()
if(DBConnection){
    const PORT = process.env.PORT || 3555;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

}} 
listen()