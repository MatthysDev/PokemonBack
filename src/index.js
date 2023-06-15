const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3001;
const glob = require('glob');
const path = require('path');


const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger.json');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to database
require('./database')();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

const routes = glob.sync('./src/**/*.router.js');
routes.forEach((route) => {
    import(path.resolve(route)).then((router) => {
        const routeName = route.split('/').pop().replace('.router.js', '');
        app.use(`/api/${routeName}`,router.default);
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});