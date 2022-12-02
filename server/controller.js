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
  //show all beer styles in db
  getBeers: (req, res) => {
    sequelize
      .query(`select * from beer_styles b join tasting_notes t on b.style_id = t.style_id`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  

  //get a random beer suggestion
  randomBeer: (req, res) => {
   sequelize.query(`select * from beer_styles`).then((dbRes) => {
    let beers = dbRes[0]
      let randomIndex = Math.floor(Math.random() * beers.length);
      let randomBeer = beers[randomIndex];

      res.status(200).send(randomBeer)
      
    })
    .catch((err) => console.log(err));
  },


  //get a style suggestion based on tasting note
  styleSuggestion: (req, res) => {
    sequelize.query(`select * from beer_styles b join tasting_notes t on b.style_id = t.style_id where b.style_id = ${req.params.id}`).then((dbRes) => {
        let beers = dbRes[0]

        res.status(200).send(beers[0])
        
    })
    .catch((err) => console.log(err));
  },

    getNotes: (req, res) => {
    sequelize
      .query(`select * from tasting_notes t join beer_styles b on t.style_id = b.style_id`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getEntries: (req, res) => {
    sequelize 
    .query(`select * from entries e join beer_styles b on e.style_id = b.style_id`)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => console.log(err));
  },


  addEntries: (req, res) => {
    const {beerName, breweryName, beerPic, styleId} = req.body
    if (!beerName || !breweryName || !beerPic) {
      return res.sendStatus(500)
    }
    sequelize.query(`insert into entries(beer_name, brewery_name, beer_pic, style_id) values('${beerName}', '${breweryName}', '${beerPic}', ${styleId}); select * from entries;`)
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch(() => res.sendStatus(500));
  }
};

