
const express = require('express')
const app = express()
const cors = require('cors')
const { checkDBConnection } = require('./dbUsers.js')
const  getRou  = require('./routers/get');
// const  postRou  = require('./routers/post');
// const  putRou  = require('./routers/put');
app.use(express.json())
app.use(cors())
// Routes
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use('/api/users/', getRou);
// app.use('post/api/', postRou)
// app.use('put/api/', putRou)



// app.get('/', (req, res) => res.send('Hello World!'))







const listen = async () => {
    const DBConnection = await checkDBConnection()
    if (DBConnection) {
        const PORT = process.env.PORT || 3555;
        app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

    }
}
listen()