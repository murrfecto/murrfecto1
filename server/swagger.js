import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
                url: 'http://localhost:3000/api/v1/',
                description: 'Local server',
            },
            {
                url: 'https://murrfecto.foradmin.fun/api/v1/',
                description: 'Development server',
            },
        ],
    },
    apis: [`${__dirname}/routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
    // Swagger Page
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCssUrl: CSS_URL}));
}
