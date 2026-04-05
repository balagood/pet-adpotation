import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import mongoose from './config/db.js'
import userRoutes from './routes/user.route.js'
import petRoutes from './routes/pet.route.js'
import shelterRoutes from './routes/shelter.route.js'
import applicationRoutes from './routes/application.route.js'
import favoriteRoutes from './routes/favorite.route.js'
import reviewRoutes from './routes/review.route.js'

import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import path from 'path'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://petadoptionstask.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))


//app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/users',userRoutes)
app.use('/pets',petRoutes)
app.use('/shelters',shelterRoutes)
app.use('/application',applicationRoutes)
app.use('/favorites',favoriteRoutes)
app.use('/reviews',reviewRoutes)


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port`)
})



//app.use('/uploads',express.static(path.join(process.cwd(), "uploads")))

//app.use("/uploads", express.static("uploads"));