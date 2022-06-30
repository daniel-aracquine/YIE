const express = require('express')
require('./db')
const adminRouter = require('./routers/adminRoutes')
const authRouter = require('./routers/authRoutes')
const productRouter = require('./routers/productRoutes')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(authRouter)
app.use(adminRouter)
app.use(productRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})