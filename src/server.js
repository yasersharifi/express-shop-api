const app = require('./main.js');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server Running On http://${HOST}:${PORT}`);
});