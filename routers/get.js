const express = require('express')
const router = express.Router()
const { getAllUsers,
    getPassportForName,
getUser } = require('../dbUsers')
module.exports = router;
router.get('/', async (req, res) => {
    try {
        const allUser = await getAllUsers()
        res.send(allUser)
    } catch (error) {
        res.send(error.message);
    }

})
.get('/:name',async(req,res)=>{
    try {
        const {name} = req.params;
        if(!Number(name)){
            console.log(123);
            res.send( await getUser(await getPassportForName(name)))
        } else{
            res.send( await getUser(name))
        }
    } catch (error) {
        res.send(error.message);
    }
})
