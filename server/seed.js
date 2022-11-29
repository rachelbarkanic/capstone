
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

        drop table if exists lagers;
        drop table if exists ipas;
        drop table if exists belgian;
        drop table if exists wild_ales;
        drop table if exists porters_and_stouts;
        drop table if exists sours;
        drop table if exists tasting_notes;
        drop table if exists beer_styles;

        create table beer_styles (
            style_id serial primary key,
            name varchar(200),
            picture text        
            );

        create table lagers (
            lager_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table ipas (
            ipa_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table belgian (
            belgian_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table wild_ales (
            wild_ales_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table porters_and_stouts (
            porters_and_stouts_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table sours (
            sours_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            style_id integer references beer_styles(style_id)
        );

        create table tasting_notes (
            tasting_notes_id serial primary key,
            note varchar(200),
            style_id integer references beer_styles(style_id)
        );

        insert into beer_styles (name, picture)
        values ('lagers', 'https://lh3.googleusercontent.com/pw/AL9nZEUv9bEYqnBW6ubdxdEGDOxO0HZ75mroy1vtm6xdqd9MX-mmFkq3MUvhVpdgnq1d9Hijy6dKW0T5A3WrsKY0QJTk9ZkgXcPAPy5Eu7deVerIQWzYz-2L3eZbuGloDSnumneTzw5DePr07Sru_ZySQsCg594PP-FV-gb88CDBW0DnIN6t3_wVen_y7zO19ELzvp468ErSjkIAExrz0Cd48FqKiiNr6arUn8cOJfgXG9weXNJhlVFR0SJmbzlI343qGspcT0WJuarG0kH4mkIZLX6em38akZlrsz1DFGdWhJNByZaahf--NdXjuHqk7migpbwNDW_BY4grZKfwFDl7NH-eRjeOdQo6SSYGeNirWq5H3FSSQor3XM2-V9LRJHZa8pXK47-6N48SL9D1R1T--9WpJZW36brvTn1xOw3lzCa6-CioeOggGMa3n6a99gJJIPJUKofTfSLuLXZFkvOwfhtk-fDjOtfRMNcVKGyC4ZDkmxYbUrQprZkGutOlfoqDVJUiiLtoo3XjBwzvJLb-eCebEe3EE6EEEuASu8V0aWeXtPzPZFUDc33n-b-JZnAYtlK_I2DsyU0BD_LCk4FII2pFrWefjHOAYaIgVvkEFlJM6QV7jjoxiGfmGEFli4rZyZLbTVc2w3MPO7FQyKwKJcTfv8UKcl5nDo_1OPIla1ElhGI2RPevBMOIH-B7jjLVNl_m8Wub7D_UM3w_-rJdvh-Z3wcsHOlYwp0y3Xti1o-JsH6X739gc9nn0O5BlC_mqJ3Hnx5ITiBAFIPddFJ80vwtJM_z7FEoCKJy6GEAMcS4V9oioI6SrWtRkT-SRlPmDOOmySZM0boOnL2Z5d2XszTCFOQr1qkWo0693FkKq5-lISMlXRjDN7oeLkMF4jvxhpM848rrx-up=w494-h544-no?authuser=0'),
        ('ipas', 'https://lh3.googleusercontent.com/pw/AL9nZEU0eXgOLOZG82g0l3E_insVQSxY5agAQGdAVCpWazBgS9UguW7ErnbIyHazAyhzt3A3Ljrmn4MFXi2KIX9OlcQrXDkqIhR244JyqCrfECZzLbzsk4yvxa2Jraar3VwJ3JhVmErAkci7GZaLp2ZoQkRaPtBzjDZjoI52Mi8GkQ6vhdMveGoFYEYF41SwXKVvHm9qx2aNBjMOXYGpqMBgkVGPrsLuvwDmRobvS52gkYWXwcHh7g4dmmhvjMiOelFsyiq5Jv-45rI-81tmu84NjKjfMFPCnxW2xi7C_LKSYmCd3nZjZ_7VA5evZlupU_YpnwVBqhb4cEsxKdIpF-rgGSSuGzrk7tw2Y_I90EztcgRi-hSI3L1xsAPnctSkFCUojmKrdb0b0CvS3_MWtXSYK7-83Tow5eQVS55nUQBGojzt3LP8bcS3e9h6j7CaGzXGRKEx-4SdQB5nW1jq8IuSUM7QbCaHGY8WuFT--5jqOvdBC_8-PSiGBofdy3DnWIZL_s814M2E3YG1zWZ1NCyf9NfAHrfun6aDrtSFaa96CvjOHiiRYGzu_WCdHu3HKQuGZCXeGfexHojTVzO-72B6z453uICj-ExLijfffs8caI9yDR9rbZCS2psFkEn_JXeIQVW06PYfqKnbF1S9Nua2klG-mnX5XTlap4BhOmqZg9aqXgQis61pV1PXc0hb-wqOUreI5YWUcis79lq2M1Sy4K4PPL0pQNewf9xNYQTouATweJNafTzmn0jxiXM8Ho-MF3SEr5u5lqB5KSBToiAR20PK8-r2VgYuZQY1g1h7fGzmKikvFUt-wBGobPkv-oJglqiKvnvu3dbKIhG00CeEwuX99m2POqCCZMCYHHJfjP1OtakV6C57H1TbhnW2Qze91Pc2FVULNpSH=w494-h544-no?authuser=0'),
        ('belgians', 'https://lh3.googleusercontent.com/pw/AL9nZEWkqrSu5fcBuyO1YF9SQkNEwRsgpC88S8Fr-0bhMEKCvN_IxaFbab19SFfN8yyVfu4hqyXYnFWjn4kdUmMMY1sWNAxPw6ZJWFVvj_DVvnztY9s2fxZPxRFOxWknqnB9yhcvGOneDfTHLiJG5yyE580_Sa0qLIo4oSE7jFhy6hxSF1euA9CiUW1QmrQthJACJHHBeaRvCBm0GvEYRgOy3G54UJ_OJxsJWxEwaVmckwwjXyJEgdf_GWCNbKCPwQK9tUG4t46VSp9Fr6w_XoZP_ynBKX5MV5WvVL5rXpoh1Am9MttLGkzpuoFoN8rnKOC_oibFpkuYPeZ1E3urDaq9Q5roahaeEJnnmFpyuBtBw0T3HlXRBF2w_xjLVk80VQTUVBI2S9Id8t6z2pscV5ZPXR6Bdk8ChBNtpiWChZ_p7gk4ziFaTquIBfyO2mbUUw2Aco2MobmBaaMi_WY-vLJG8iZUCfrsCf3DF8l_0LwWUk6qLcc4kvkJ3-hsEP5JCAVytrYnb9sc-8RenboozuqRgykgaUu7ELKhcpeIptd30jkJpdvMDMfCVLyrr9KkkohhjcfospMR3dpl6QthFT2tVp2ujYKYiTNhpa3DTulRgT5DyO1_C0VwKrc6eoYM_dhEdgBttoOC1X60H1lxgZIw5w7E_RqJt1dbLfKh9KPa0aJlNq2N8Epa_rQbfhiNeoOaatB3W5J8ovv9mYShh9Gnb3GSRSixy6n5EmSUrvu7T8V7yP6OaoVnHsRbecz6uJajRKSEGm2J6DvsXwe-RvCbwd3QvytINieoOkwOk4HXU8qdjlpUrOUg5YpBr4OWVNasrzVHsN7w4uedzGMKOjkFCkF4-wq7kZvwoNUu_ggDmIQ-IOIwHnaSfBC6m0p4S44-7WKmyCvybm-w=w494-h544-no?authuser=0'),
        ('wild ales', 'https://lh3.googleusercontent.com/pw/AL9nZEXRY9NwCyP0IeG5iK893vIPIl5spu-YYc8Mkzkx9vgID1dBtpQuH94rA9ECQPBIOAf-B02tnA34Tgm-sU2epDsk2BViVn8FWamr14eUqgdak9YfEZ6SHQwJlAhxh_24tLBy6Xb9gCCnC7Mbc5UKD620LHOhrYaIzICWV0zpjHCrex9_896kDO6CXuyfjHQpd2ciUrHhLI9VvPzghDpdPVZdd8vMnRz59UglqT-TuYxcpm7YNgV8JwMi-3Hl8MXuTIctb1oYKYMLMQBviJJsj4NK1TTh4XB9_rMGKtUvj4wv3gH0tVKAn7QzpWQhBwIK5TOQZQ-1dltYzGR_xetfbHVNipsuAc_X0iwvVAVCNM785-ZPs12Jwxn9S3XFtFtQOLQWNQ31RV0YTg2Ii80zoH3ufcbMZAI1294Esyv6POWtP3dw_49aUT1wn88XuVTvnTuXJOKQpIIzRA1AwqMY3lwNuMz8sywLcT-Yxno9rJ0qdu8Ardv8LmOuBn8Ni8yiMpkR1lbFa90Ae0fwrl9J9SzspetgwEsCTBclpfdA0NemB-E6G6XvjfFOKxw6yolIVLtnd3SaHJ0gfbqo19HIStafO201BgEpbPRmoz5WGEXQLXB7VaZ4TjTYlb9Fd3ZrrChirWX9vA2kk7cHohUBUcxLKl2PgyXsCqbim0v-eUnqp_mxmeSY3ucolUw0GhDZUPYAdh6vQh-bHRZ0BMcrpw5tVYLoWdIP310h919zLPfVdzHjZ9oz5uRxNAWSZAZ7vc1j2dtJvRG12behSTs4e05Ev85hoaX-bIMLVe1CV6dJDGM8R-HgA60BAW38HKJTwUUEtsOELkbtVyfLJWx3vN9OiKtpSEVd5FWDZ6IX1C629i4lVtdgrGEl4iaKvuxc2gqNt6hXQcqj=w494-h544-no?authuser=0'),
        ('porters and stouts', 'https://lh3.googleusercontent.com/pw/AL9nZEU50VEk0WlfT5De45voQDu8Gcn2Jjq6Ht8gr2rmQn7pXOFb1zWeg8gp90NAkmC5fQtZfnCb9YFEnkTtZLAN4jD-BI09YnFhTBYC9W4CFaWNPf0iD8DpDV4wcvf_2aTPslZCWMwAJxN1zctwS8RbU-tZIoyLCcjp8UUKNyoGyZfwOOZOgT0R5BdbGkqxpFlPfuSmzK2OQ-iLwq62kq9vOaLZ3gm3-wacETZOWd2rE7hk3cYYd-njin-DcYz8sUJEbGDlG9kv2fVE4bQ5br4cc49gODS5BurUgI0akL8D0BFbR-LxLYbMA9yTefLuVhtwcNpv__jJuGo1oyuRXu34rQgqR6p5yZSfownQhrZLxqZzYyZvTqgISlAz5hTywN8mk8S4xvcOo6ybiKyTwRAc_Y09YZphrvJJ2gKqNHVRUG2M_-PuWqE83vp3Q5V6BCgP5Mkj1sL7ThCw6tdIm590GCCmGHLUIEHTtxn6HJDbAx94FZzTHmB68UE2t6mDQCy48qOP5zMweIt7CaHMmZ6Tj7GA3fJOUbB6qkpxBU-Z9_x0ozHvjRGD8Xtso25tF_45eIZdtNO6pMkfE6cUZAGIRORZ1fRveZZKa-b2E3t2RfhUwbrHZXyACzyyzmDd9yGexdRYb8es-dSwBRwcegl0A_c-SWdYXtPZugIiLQ0cvBWxsDK3_FujtzxNnxN6Y1lmmjj5vtlt7XuHOAp-mom1Fqf3R8OzxeGHvoU18VrdPpo4HuioLLwMooXgAoI5wISSP3LWkOO2_6-AyT97r2qB6oZHYSW_BdQ661kTXjqETGjQzCipVIjUy60znxK5HV2HYkLS1i7foC6o5C-XDwlQSsQn04J5dMfYfxGk03iZw8R4ID8kWxLe9Vo6szsodWikLfcZyCV88XM5=w494-h544-no?authuser=0'),
        ('sours', 'https://lh3.googleusercontent.com/pw/AL9nZEXMUOvccpdFpFAlZ5yhcCeJ5c6pHHE80et_TOgaHFnZ30nhzKJi42-fBi5MIy0uxnnF37X7RlFembQjYWaT8SzzXxLrN4K7uP2PXJ854wOX6MBY0-EyEf3oe30SW9sSsomK0CM2OhIZX8CZisymO2QE22BrMsfCzYE6W7nU7mpS05zTSawNOjLi-TqXrlthwwbyi1tjPFcs-x1R0xoGBmuoFGEMuSq8pgd_x9WslpZBdmxjDmJbnIPWDSaYJjlj-NE-woGYWUSlNp8Yn4PE3CWLOZwEmvP3qWh76P2OlQ5HkGQKDErrPFutYpVLf9aUFLRMeU9bZzenSaqBJEXkLuK_mcVUocM6dQoJVjGqfrwwUaEKOZSyaNuLQ8rzkJsxrqGZvQXJjFkEjs805OlfZwPxwHcSnk-VOulODcxBksmCZwFpTS_Fx_3mzQe5DdwEyT2yyIdNJLD4Suom8zo5bZYgIGOZOFgNRCdugFQzduROrtZqlYmCxezbDtoyu_DXUy8py4UfFAv-JavMKA9keeWhyNv_EKA3ALQjufM32MoL9m0_fyXwQDFqSo7jchIpSbglxXuNI-6EwkdL1BvCJxcHhExMAHHRHMZ3m72xS9EqR1OJmVUtKLQNn3GoSCzzihz2on3tJF_36-o-o34SX0tP4h2oetTeT8jGUlj1ZfLKiPBOibuG7ZxHV57qIMXEPrkffbP0B0t-HoUCc3YIlhNa-P5_5VJFEk3bT7tqj4zBDg972-9y5awCEGkAVCC7HPgs9cPxecPtSh4ULCaU-DhDWSuxb_CudujPqxS4VGKAwALpbvsZSncK_yQr5dlmf1AHBmt7xiDXjKmpEWbVqjzdKHEdy2GD4rfgPfgKX0U_LMYaez-cOI4lS8ElXIJx-jpAYeQEl4pa=w494-h544-no?authuser=0');

        insert into lagers (beer_name, brewery_name, style_id)
        values ('Helles Lager', 'pFriem', 1);

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