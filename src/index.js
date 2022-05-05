const app= require("./app")
const Token = require("./models/Token")
const port=process.env.PORT

app.listen(port,()=>{
    console.log('server working '+port)
})
setInterval(tokenClear,86400000)
async function tokenClear(){
    await Token.deleteMany({expiredAt:{$lte:Date.now()}});
}