const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
})

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connect To Database Successfully !');
    
        await sequelize.sync({ force: false, logging: true });
    } catch (err) {
        console.log(`Unable To Connect The Database ${err}`);
    }
}

checkConnection();

module.exports = sequelize;