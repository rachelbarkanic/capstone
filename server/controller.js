const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  //show all beers in db
  getBeers: (req, res) => {
    sequelize
      .query(`select * from beer_styles`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  //get a random beer suggestion
  randomBeer: (req, res) => {
   sequelize.query(`select * from beer_styles`).then((dbRes) => {
    let beers = dbRes[0]
      let randomIndex = Math.floor(Math.random() * beers.length);
      let randomBeer = beers[randomIndex];

      res.status(200).send(randomBeer);
    });
  },

  //get a style suggestion based on tasting note
  styleSuggestion: (req, res) => {
    sequelize.query(`select * from beer_styles b join tasting_notes t on b.style_id = t.style_id`).then((dbRes) => {
        let beers = dbRes[0]
        console.log(beers)

        res.status(200).send(styleSuggestion);
    })
  },

    getNotes: (req, res) => {
    sequelize
      .query(`select * from tasting_notes t join beer_styles b on t.style_id = b.style_id`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
