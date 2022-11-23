
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {

    //show all beers in db
    getBeers: (req, res) => {
        sequelize.query(`select * from beer_styles`)
        .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}