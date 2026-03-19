import swaggerJsDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'

dotenv.config()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PET Backend',
            version: '1.0.0',
            description: "API Document for E-Commerce Project"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'This is for the development environment'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

export default swaggerJsDoc(options)