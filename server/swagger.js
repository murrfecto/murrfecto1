import swaggerUi from "swagger-ui-express";
import {app} from "./server.js";
import swaggerJsdoc from "swagger-jsdoc";

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
// Swagger UI styled
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Murrfecto API',
            version: '1.0.0',
            description: 'Documentation for Murrfecto API endpoints',
        },
        components: {
            securitySchemes: {
                bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            },
        },
        security: [{ bearerAuth: [] }],
        servers: [
            {
                url: 'http://localhost:3000/',
                description: 'Local server',
            },
            {
                url: 'https://murrfecto1.vercel.app',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
    // Swagger Page
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCssUrl: CSS_URL}));
    // Documentation in JSON format
    app.get('/api/v1/docs/api.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}
