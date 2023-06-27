import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'Murrfecto API',
            version: '1.0.0',
            description: 'Documentation for Murrfecto API endpoints',
        },
        servers: [
            {
                url: 'https://murrfecto1.vercel.app', // Replace with your API base URL
                description: 'Development server',
            },
        ],
    },
    apis: ["./routes/*.js"],
};


export const swaggerSetup = (app) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
const specs = swaggerJsdoc(options);

