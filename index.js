
const express = require('express')
const app = express()
const cors = require('cors')
const {checkDBConnection } = require('./dbUsers.js') 


app.use(express.json())
app.use(cors())
// Routes
app.use('/api/users',)
app.use('post/api/',)
app.use('put/api/',)


app.get('/', (req, res) => res.send('Hello World!'))







const listen =async ()=>{
const DBConnection = await checkDBConnection()
if(DBConnection){
    const PORT = process.env.PORT || 3555;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

}} 
listen()