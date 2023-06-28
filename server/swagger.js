import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Murrfecto API',
            version: '1.0.0',
            description: 'Documentation for Murrfecto API endpoints',
        },
        servers: [
            {
                url: 'https://murrfecto1.vercel.app',
                description: 'Development server',
            },
        ],
    },
    apis: ["./routes/cats.routes.js", "./routes/login.routes.js"],
};

const specs = swaggerJsdoc(options);

export const swaggerSetup = (app) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs, {customCssUrl: CSS_URL}));
};
