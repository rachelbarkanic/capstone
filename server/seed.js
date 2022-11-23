
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
    seed: (req, res) => {
        sequelize.query(`

        create table beer_styles (
            style_id serial primary key,
            name varchar(200)
        );

        create table lagers (
            lager_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            lager_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table ipas (
            ipa_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            ipa_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table belgian (
            belgian_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            belgian_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table wild_ales (
            wild_ales_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            wild_ale_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table porters_and_stouts (
            porters_and_stouts_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            porter_and_stout_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table sours (
            sours_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            sour_pic text,
            style_id integer references beer_styles(style_id)
        );

        create table tasting_notes (
            tasting_notes_id serial primary key,
            note varchar(200),
            style_id integer references beer_styles(style_id)
        );

        insert into beer_styles (name)
        values ('lagers'),
        ('ipas'),
        ('belgians'),
        ('wild ales'),
        ('porters and stouts'),
        ('sours');

        insert into lagers (beer_name, brewery_name, lager_pic, style_id)
        values ('Pilsner', 'pFriem', 'C:\Users\hbark\Desktop\devMountain\Beer Images - DO NOT MOVE\pils.png', 1);

        insert into ipas (beer_name, brewery_name, style_id)
        values ('Blind Pig', 'Russian River', 2);

        insert into belgian (beer_name, brewery_name, style_id)
        values ('Prism', 'Perennial', 3);

        insert into wild_ales (beer_name, brewery_name, style_id)
        values ('Practice in Patience', 'Yeast of Eden', 4);

        insert into porters_and_stouts (beer_name, brewery_name, style_id)
        values ('Old Rasputin', 'North Coast', 5);

        insert into sours (beer_name, brewery_name, style_id)
        values ('Fou Foune', 'Cantillon', 6);

        insert into tasting_notes (note, style_id)
        values ('crisp', 1),
        ('hoppy', 2),
        ('banana', 3),
        ('funky', 4),
        ('roasty', 5),
        ('tart', 6);

`).then(() => {
    console.log('DB seeded!')
    res.sendStatus(200)
}).catch(err => console.log('error seeding DB', err))
}
}