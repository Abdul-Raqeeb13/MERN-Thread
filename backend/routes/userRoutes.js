import express from 'express'
const router = express.Router();

router.get("/signup", (req,res)=>{
    res.send("Signed upto success")
})

export default router