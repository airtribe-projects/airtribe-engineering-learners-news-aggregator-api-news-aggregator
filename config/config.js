const mongoose=require('mongoose')
const dbConnection= mongoose.connect(process.env.MONGO_URI)
.then((value)=>{
    console.log('Db connected Successfully!'.cyan.underline.bold)
    db=value
    // dbConnection=value
})
.catch((err)=>{
    console.log('Db connection Faield!'.red.underline.bold)
    console.log(err)
})
module.exports=dbConnection