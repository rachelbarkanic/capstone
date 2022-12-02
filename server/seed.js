
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
        drop table if exists entries;
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

        create table entries (
            entries_id serial primary key,
            beer_name varchar(200),
            brewery_name varchar(200),
            beer_pic text,
            style_id integer references beer_styles(style_id)
        );

        insert into beer_styles (name, picture)
        values ('Lagers', 'https://lh3.googleusercontent.com/pw/AL9nZEUv9bEYqnBW6ubdxdEGDOxO0HZ75mroy1vtm6xdqd9MX-mmFkq3MUvhVpdgnq1d9Hijy6dKW0T5A3WrsKY0QJTk9ZkgXcPAPy5Eu7deVerIQWzYz-2L3eZbuGloDSnumneTzw5DePr07Sru_ZySQsCg594PP-FV-gb88CDBW0DnIN6t3_wVen_y7zO19ELzvp468ErSjkIAExrz0Cd48FqKiiNr6arUn8cOJfgXG9weXNJhlVFR0SJmbzlI343qGspcT0WJuarG0kH4mkIZLX6em38akZlrsz1DFGdWhJNByZaahf--NdXjuHqk7migpbwNDW_BY4grZKfwFDl7NH-eRjeOdQo6SSYGeNirWq5H3FSSQor3XM2-V9LRJHZa8pXK47-6N48SL9D1R1T--9WpJZW36brvTn1xOw3lzCa6-CioeOggGMa3n6a99gJJIPJUKofTfSLuLXZFkvOwfhtk-fDjOtfRMNcVKGyC4ZDkmxYbUrQprZkGutOlfoqDVJUiiLtoo3XjBwzvJLb-eCebEe3EE6EEEuASu8V0aWeXtPzPZFUDc33n-b-JZnAYtlK_I2DsyU0BD_LCk4FII2pFrWefjHOAYaIgVvkEFlJM6QV7jjoxiGfmGEFli4rZyZLbTVc2w3MPO7FQyKwKJcTfv8UKcl5nDo_1OPIla1ElhGI2RPevBMOIH-B7jjLVNl_m8Wub7D_UM3w_-rJdvh-Z3wcsHOlYwp0y3Xti1o-JsH6X739gc9nn0O5BlC_mqJ3Hnx5ITiBAFIPddFJ80vwtJM_z7FEoCKJy6GEAMcS4V9oioI6SrWtRkT-SRlPmDOOmySZM0boOnL2Z5d2XszTCFOQr1qkWo0693FkKq5-lISMlXRjDN7oeLkMF4jvxhpM848rrx-up=w494-h544-no?authuser=0'),
        ('IPAs', 'https://lh3.googleusercontent.com/pw/AL9nZEU0eXgOLOZG82g0l3E_insVQSxY5agAQGdAVCpWazBgS9UguW7ErnbIyHazAyhzt3A3Ljrmn4MFXi2KIX9OlcQrXDkqIhR244JyqCrfECZzLbzsk4yvxa2Jraar3VwJ3JhVmErAkci7GZaLp2ZoQkRaPtBzjDZjoI52Mi8GkQ6vhdMveGoFYEYF41SwXKVvHm9qx2aNBjMOXYGpqMBgkVGPrsLuvwDmRobvS52gkYWXwcHh7g4dmmhvjMiOelFsyiq5Jv-45rI-81tmu84NjKjfMFPCnxW2xi7C_LKSYmCd3nZjZ_7VA5evZlupU_YpnwVBqhb4cEsxKdIpF-rgGSSuGzrk7tw2Y_I90EztcgRi-hSI3L1xsAPnctSkFCUojmKrdb0b0CvS3_MWtXSYK7-83Tow5eQVS55nUQBGojzt3LP8bcS3e9h6j7CaGzXGRKEx-4SdQB5nW1jq8IuSUM7QbCaHGY8WuFT--5jqOvdBC_8-PSiGBofdy3DnWIZL_s814M2E3YG1zWZ1NCyf9NfAHrfun6aDrtSFaa96CvjOHiiRYGzu_WCdHu3HKQuGZCXeGfexHojTVzO-72B6z453uICj-ExLijfffs8caI9yDR9rbZCS2psFkEn_JXeIQVW06PYfqKnbF1S9Nua2klG-mnX5XTlap4BhOmqZg9aqXgQis61pV1PXc0hb-wqOUreI5YWUcis79lq2M1Sy4K4PPL0pQNewf9xNYQTouATweJNafTzmn0jxiXM8Ho-MF3SEr5u5lqB5KSBToiAR20PK8-r2VgYuZQY1g1h7fGzmKikvFUt-wBGobPkv-oJglqiKvnvu3dbKIhG00CeEwuX99m2POqCCZMCYHHJfjP1OtakV6C57H1TbhnW2Qze91Pc2FVULNpSH=w494-h544-no?authuser=0'),
        ('Belgians', 'https://lh3.googleusercontent.com/pw/AL9nZEWkqrSu5fcBuyO1YF9SQkNEwRsgpC88S8Fr-0bhMEKCvN_IxaFbab19SFfN8yyVfu4hqyXYnFWjn4kdUmMMY1sWNAxPw6ZJWFVvj_DVvnztY9s2fxZPxRFOxWknqnB9yhcvGOneDfTHLiJG5yyE580_Sa0qLIo4oSE7jFhy6hxSF1euA9CiUW1QmrQthJACJHHBeaRvCBm0GvEYRgOy3G54UJ_OJxsJWxEwaVmckwwjXyJEgdf_GWCNbKCPwQK9tUG4t46VSp9Fr6w_XoZP_ynBKX5MV5WvVL5rXpoh1Am9MttLGkzpuoFoN8rnKOC_oibFpkuYPeZ1E3urDaq9Q5roahaeEJnnmFpyuBtBw0T3HlXRBF2w_xjLVk80VQTUVBI2S9Id8t6z2pscV5ZPXR6Bdk8ChBNtpiWChZ_p7gk4ziFaTquIBfyO2mbUUw2Aco2MobmBaaMi_WY-vLJG8iZUCfrsCf3DF8l_0LwWUk6qLcc4kvkJ3-hsEP5JCAVytrYnb9sc-8RenboozuqRgykgaUu7ELKhcpeIptd30jkJpdvMDMfCVLyrr9KkkohhjcfospMR3dpl6QthFT2tVp2ujYKYiTNhpa3DTulRgT5DyO1_C0VwKrc6eoYM_dhEdgBttoOC1X60H1lxgZIw5w7E_RqJt1dbLfKh9KPa0aJlNq2N8Epa_rQbfhiNeoOaatB3W5J8ovv9mYShh9Gnb3GSRSixy6n5EmSUrvu7T8V7yP6OaoVnHsRbecz6uJajRKSEGm2J6DvsXwe-RvCbwd3QvytINieoOkwOk4HXU8qdjlpUrOUg5YpBr4OWVNasrzVHsN7w4uedzGMKOjkFCkF4-wq7kZvwoNUu_ggDmIQ-IOIwHnaSfBC6m0p4S44-7WKmyCvybm-w=w494-h544-no?authuser=0'),
        ('Wild Ales', 'https://lh3.googleusercontent.com/pw/AL9nZEXRY9NwCyP0IeG5iK893vIPIl5spu-YYc8Mkzkx9vgID1dBtpQuH94rA9ECQPBIOAf-B02tnA34Tgm-sU2epDsk2BViVn8FWamr14eUqgdak9YfEZ6SHQwJlAhxh_24tLBy6Xb9gCCnC7Mbc5UKD620LHOhrYaIzICWV0zpjHCrex9_896kDO6CXuyfjHQpd2ciUrHhLI9VvPzghDpdPVZdd8vMnRz59UglqT-TuYxcpm7YNgV8JwMi-3Hl8MXuTIctb1oYKYMLMQBviJJsj4NK1TTh4XB9_rMGKtUvj4wv3gH0tVKAn7QzpWQhBwIK5TOQZQ-1dltYzGR_xetfbHVNipsuAc_X0iwvVAVCNM785-ZPs12Jwxn9S3XFtFtQOLQWNQ31RV0YTg2Ii80zoH3ufcbMZAI1294Esyv6POWtP3dw_49aUT1wn88XuVTvnTuXJOKQpIIzRA1AwqMY3lwNuMz8sywLcT-Yxno9rJ0qdu8Ardv8LmOuBn8Ni8yiMpkR1lbFa90Ae0fwrl9J9SzspetgwEsCTBclpfdA0NemB-E6G6XvjfFOKxw6yolIVLtnd3SaHJ0gfbqo19HIStafO201BgEpbPRmoz5WGEXQLXB7VaZ4TjTYlb9Fd3ZrrChirWX9vA2kk7cHohUBUcxLKl2PgyXsCqbim0v-eUnqp_mxmeSY3ucolUw0GhDZUPYAdh6vQh-bHRZ0BMcrpw5tVYLoWdIP310h919zLPfVdzHjZ9oz5uRxNAWSZAZ7vc1j2dtJvRG12behSTs4e05Ev85hoaX-bIMLVe1CV6dJDGM8R-HgA60BAW38HKJTwUUEtsOELkbtVyfLJWx3vN9OiKtpSEVd5FWDZ6IX1C629i4lVtdgrGEl4iaKvuxc2gqNt6hXQcqj=w494-h544-no?authuser=0'),
        ('Porters and Stouts', 'https://lh3.googleusercontent.com/pw/AL9nZEU50VEk0WlfT5De45voQDu8Gcn2Jjq6Ht8gr2rmQn7pXOFb1zWeg8gp90NAkmC5fQtZfnCb9YFEnkTtZLAN4jD-BI09YnFhTBYC9W4CFaWNPf0iD8DpDV4wcvf_2aTPslZCWMwAJxN1zctwS8RbU-tZIoyLCcjp8UUKNyoGyZfwOOZOgT0R5BdbGkqxpFlPfuSmzK2OQ-iLwq62kq9vOaLZ3gm3-wacETZOWd2rE7hk3cYYd-njin-DcYz8sUJEbGDlG9kv2fVE4bQ5br4cc49gODS5BurUgI0akL8D0BFbR-LxLYbMA9yTefLuVhtwcNpv__jJuGo1oyuRXu34rQgqR6p5yZSfownQhrZLxqZzYyZvTqgISlAz5hTywN8mk8S4xvcOo6ybiKyTwRAc_Y09YZphrvJJ2gKqNHVRUG2M_-PuWqE83vp3Q5V6BCgP5Mkj1sL7ThCw6tdIm590GCCmGHLUIEHTtxn6HJDbAx94FZzTHmB68UE2t6mDQCy48qOP5zMweIt7CaHMmZ6Tj7GA3fJOUbB6qkpxBU-Z9_x0ozHvjRGD8Xtso25tF_45eIZdtNO6pMkfE6cUZAGIRORZ1fRveZZKa-b2E3t2RfhUwbrHZXyACzyyzmDd9yGexdRYb8es-dSwBRwcegl0A_c-SWdYXtPZugIiLQ0cvBWxsDK3_FujtzxNnxN6Y1lmmjj5vtlt7XuHOAp-mom1Fqf3R8OzxeGHvoU18VrdPpo4HuioLLwMooXgAoI5wISSP3LWkOO2_6-AyT97r2qB6oZHYSW_BdQ661kTXjqETGjQzCipVIjUy60znxK5HV2HYkLS1i7foC6o5C-XDwlQSsQn04J5dMfYfxGk03iZw8R4ID8kWxLe9Vo6szsodWikLfcZyCV88XM5=w494-h544-no?authuser=0'),
        ('Sours', 'https://lh3.googleusercontent.com/pw/AL9nZEXMUOvccpdFpFAlZ5yhcCeJ5c6pHHE80et_TOgaHFnZ30nhzKJi42-fBi5MIy0uxnnF37X7RlFembQjYWaT8SzzXxLrN4K7uP2PXJ854wOX6MBY0-EyEf3oe30SW9sSsomK0CM2OhIZX8CZisymO2QE22BrMsfCzYE6W7nU7mpS05zTSawNOjLi-TqXrlthwwbyi1tjPFcs-x1R0xoGBmuoFGEMuSq8pgd_x9WslpZBdmxjDmJbnIPWDSaYJjlj-NE-woGYWUSlNp8Yn4PE3CWLOZwEmvP3qWh76P2OlQ5HkGQKDErrPFutYpVLf9aUFLRMeU9bZzenSaqBJEXkLuK_mcVUocM6dQoJVjGqfrwwUaEKOZSyaNuLQ8rzkJsxrqGZvQXJjFkEjs805OlfZwPxwHcSnk-VOulODcxBksmCZwFpTS_Fx_3mzQe5DdwEyT2yyIdNJLD4Suom8zo5bZYgIGOZOFgNRCdugFQzduROrtZqlYmCxezbDtoyu_DXUy8py4UfFAv-JavMKA9keeWhyNv_EKA3ALQjufM32MoL9m0_fyXwQDFqSo7jchIpSbglxXuNI-6EwkdL1BvCJxcHhExMAHHRHMZ3m72xS9EqR1OJmVUtKLQNn3GoSCzzihz2on3tJF_36-o-o34SX0tP4h2oetTeT8jGUlj1ZfLKiPBOibuG7ZxHV57qIMXEPrkffbP0B0t-HoUCc3YIlhNa-P5_5VJFEk3bT7tqj4zBDg972-9y5awCEGkAVCC7HPgs9cPxecPtSh4ULCaU-DhDWSuxb_CudujPqxS4VGKAwALpbvsZSncK_yQr5dlmf1AHBmt7xiDXjKmpEWbVqjzdKHEdy2GD4rfgPfgKX0U_LMYaez-cOI4lS8ElXIJx-jpAYeQEl4pa=w494-h544-no?authuser=0');

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

        insert into entries (beer_name, brewery_name, beer_pic, style_id)
        values ('Helles Lager', 'pFriem', 'https://lh3.googleusercontent.com/pw/AL9nZEWuNy1n_4Oxj4-QnPVnXqWndConDVCFwTfq8wT7x4fhWxtf5W7eHmdoIfst_6jwzOHSszT-qcEOxgiqXTaj-20RWJRNC0b1AFijzf7J6Fx0-vSqL1-8qCxPFtaAWIdt3K1HwkXKvD0C5wn0IPU41D7qbYr5MISvZd7afWw0OOHtax6GKqk8FcL57Qun_2qSnFQBVUtf44ca4v6XAz21cUF1qCNCwYa5qXwDlxYbG_5pYnu0Px77UoqT64rnman8PnITVEKGQbFo4ScxCXGC2bsKpirFjMIm9X5pp-9MR6Js-_lqVcJjxLjO26b5AVYYtYdCbnPsw1z50Rc56f2ENMoDSXzPweoFl4mbwjjSyp3mmQYvlV-WmX87R41GOm_T9nL9NSacAuK028kdLyBr5Osdnj1sx4HY-sInt1TuHXFU7fEipjYcZMhwWb106KtYm7UYJv0dM4sHMEW0KJAs_s6hkPzmKzas1lLdM2ZLYILRcbaSIpL6e6_ydHL5esQ9sC8Q7Zs8HeSP0ZrpMK3QEu3ZmU2AaGUKj2wQuvM8uZDj57LjOJ40jkpf0Eb828nMFczOupWaRL7T1PY_S_tyfng_1EO6eqzVpahM2bxu58M23BGShHiVI_aSFpxevga9Ljt_JXNfpAf5-j7ByIN2n6nyayHWcOG4c6BrNybo2dg02vdjcqJOeCpH4a1pvNjyQRqOSlR3Jf4NfOv_i5NgD-H4i7fmXxnajl0Hlbv_j3z9wq3NC8PxlawSfgrbNye3VQQxFRgpP_-ctk7NjlbHVS57CiXtbMw6VcQcvB1Ac6hyNe1utNIIkzs5Fr96FNfAbxbAPSy2v0_3s-0MMcrwxOpn2afN74ltIAAlsBZLzxX5AL_9yFO4BwL5-P3p64lLUPyhluNXqCtv=w603-h969-no?authuser=0', 1),
        ('Blind Pig', 'Russian River', 'https://lh3.googleusercontent.com/pw/AL9nZEVXxuguclgFWMlO1fHfB44CPAF6T3PPGcU-LKF5j_90XpFflivNxAxjqT-H_BmbQgov7ex9N-aPL272i87ilBQCUBiL78RV3wW4wkBP45NwqPTYDlqipt9-esgse5CdO7jdmon5Z89derFyZlXpq8wXIVNBo185E9phtQbTEfmXdpaJyCLHysUHesjtJLJnI-z6Wo1IqghXHsuwaYAxNW1WydstgWKuLsfEN4aNTuGqViwRXAlaSOPNINxsUZO_vPB64zlJmPHUoe3rkV9maPgm1TlCTOsRG5IN5LeeFr84y1v0kt9NpQy4Zs17RcvyGiITx_fH9iMowhX3xCXwyW0SLlZEoK7xnAIYhjhAYcgQSGQgyGn66WO-Xr3EHnIrWYamAt-ombcIpjpW31JaD881Z5JHQbdgqOM3Czxc66UN0i2XnFm-AlT9LltgjfAZZ6I9v-H-nQGK-rq7kxAkxV2tNMBMat3MAm2dbQnl4SIWoPY_RwWv7kxpTeNmWI_N8Vk7RecLI-h1wn1zxrujG5oDxxSCMmYt_FM95EuXqc11TdqYDlIXc0Y4guzb9td0mFWiUCjFZ5galRLxp7-VrySx-eqz7CwLTI3dbJhOzOW4LI0aRvtp4siJLqJMqngMtXoDXrH8Atyqik6Fkbgae9jEHUDraVWPSZSx4Xy1q7125vuWwVxKDS2SVbLyx6N6t0qacTQQirIoCSr3Yw4rwFxR0bsVRfhl8JAYnKat5uKORzAC5hXE6b8HjgemDB-ls1Mty5Px0GpWhsriLd_5GTH-mSI0BxjO5WsKB0KeSJohrFJthR9-41MaLm2IscMvMK6JsaZlITD2JR4MWxISxh77ByrgJWWDHdyUw5KEuN37pAH_GPna2SnxRoB07FI13mgYjYFnvXsD=s490-no?authuser=0', 2),
        ('Prism', 'Perennial', 'https://lh3.googleusercontent.com/pw/AL9nZEVoiQc_IFQyow_gRfc46uECjKYDd34XObdFtdIVHH5RM8-j_wNtF0Zq0OC4jrWHX7fYNchcsB4j7A-vHfEsavZd4GeeQpxhtYwKQwYmwUv9PLDz8G3uWaj-YSW4olKa0SPtedB7_DTG0gl4r0H7N6IM5wppsC5tNBLPee_G5grAFgQBlxy1mETMWS5sTX6NDFN66ap5ulN6dy1nQU4k63ACONkbn_ZtF5lUrJBf7Zrt3Kw-t9yX2bsE6edGmPKReJDa3l03QGc_M3WBu1POhSVLjF2gDGC0ztC8175NWMUao71vEVVev8cgP5w-kHHuCA2Uv9r2LWorx4VUGaCcZe5g3khLftVxv2A7uDdcwfs9rr9L4ZFYFk7S0gmk4o4LoGqmkpK1P7oL8G9olrruwoDfzYSE3YCJ4VYEhdkEnmQqTl-IT0ZQJTz4WSdVpvnRArrIy1gkTDGPpQHWXcI02coXg19HmwoGHlbhUYqiCuaQNxfCRxcVuj9OcS2vfPj-opi-Ircj_o7Ef3Ko8zDoeP_JN3keVMqlc6gQTDTNccIhHCZR-rZXi1tSDEB4L6IdNyIBfXEEYF-P4rnsTBOyzta1Q8stBrDMUgIINGBISYRAXGyvLyIm1cnvLBlo4va4sj4OrK0dURBDmpoVSVb5rPm6ibG_cPi0WmOus8cBre8ZsuaLWC07AmrHS_s5EUbIvpYuldmHbMA9HeVxqh40yRcxTaCrgqCD3wyAn2KW6spyW1MSezVqyineklnQYGZXZj6ryGOU735cB3WuSCXCJCpA3Ts62TUm1-AvVD0VXZESnu2lEvcJD-yjLKtLrHmRKGYqLxh06hr3SD5pWyd3Gpmg7T6JTfbtNoNPP2-Cqbw8qjYva-naoYzqSFVWo9UU3irh8SrnDgpw=w400-h600-no?authuser=0', 3),
        ('Practice in Patience', 'Yeast of Eden', 'https://lh3.googleusercontent.com/pw/AL9nZEXcXARIfhdZTcRBq-VXF_g7cE16YjiPFwBvtD3Yppq7NofFx-sFfYpE9BfN9QFIZxYgGtPy_fqilyZy6rBeq0nyALJ-QjlLv_vSKZ7NWv4fe3j-zjPaldPBpaf1-JD-aYVX1a4UW6czkWTp6vp0eZBCYCR2teFa1Ot3I6ZZCeS_ePilPA468LhdtkWqZhlCWzetE6m_R9r1aSWukamNiKv6utB1UBcH8bTa8RiAjvjtiDNYmEYGJ_58qaDtKvcA7KyRLWyl-mmCS-Yj9RDWp3XJ6LbyYQp2OZK2VD6eJFyyB0Z-E_Tay-RzAPbyRcFebft1FX49BozvvIRlLhfnBoArSnoZ9USmoLYigwyk6u_jwXHAx15QS9G9CGlpny5ozU8yaNVJuhrBGVpdKov0SaEwPt7TjayLVoJigm2cFLqc06n9C1JrUF8ZJ2lLvGtLocia6taoPBP4vm8KbDv0dyWhGprBMLdb_RipdMx8u9GvCX47N7nmYb4cw6aZmtapw6nGjUOnFaGcaOOrBLXUPPdFiyGxjxxSP3lG8tSJMaIoC5u6UYC-eDs1Qz1G9OoeuepAZUZGp8M_YJTF7vYo21omXHyRu2vC0RmJ4xu8stfpkFMXdU4fp2inlb5lWR7ih2EUNgrnLSjpoepAdHUUnBmsQ_Vh_w0B3favcJ4pKKnrOoTJdHRwrgQZuTlMcJEhI61lFjbvQvp7XuzhHC0FRSVhCSd6K4P8AW44vPnUDxVb4Gnd8SIpigjqNolIzCG324OiZHMVpQBDEGeb772tzDJSVUA258o5IasUZiVwOP7Dt-OsS7P2bWkNWrhGcW4IJhlMWObNPTBxRxqikAW2oXcr-TGDce0msdvF24619q8ua3i6cQFTxGb8qjUoYsyfIsqX3OZ72n60=s900-no?authuser=0', 4),
        ('Old Rasputin', 'North Coast', 'https://lh3.googleusercontent.com/pw/AL9nZEU1TEfzlJ23mNa48hyy0K4VRDQ6C-IHLdBp6Rnk6Sjc6WdeIAUrNw9jcqEMNFrMnkNlur4GnDs_fazF9YKpcS7Hz6olDVZMT4S56LtEHcmt33KSyZtThVeV6Q5xZoCfe2teFRP4nER4ozlR-5vxfDvu4nr4wrjfa4fKeXi652u1sgQ4cv9IBMzw4_lKecaczr-JkHc6sL_bTmOm4xQm2fO4Q4vqXMZx6IcJtZipCKfRQOfYiJiWj74rYzdmgi7LizRxgCn6W5satS0boMf8BB1NxZd64NkkICAPO0KNa0P4VSY5RD22OdSGweC8zJ9MajMvNe7OAWk017x96_HS0yb5FhWRDwYLeqTq4KM5Uj6vrzUDXdUcMdkKV6FGqmzl91lX953nXRXz67O_e1yZu9xMd9RBzR6M6FCj9_J6YkYmai2BACPVAkFFIQIwrCAN-isno8qh5hu6uxXDF2uPHz3M-c9-EGlgAQ8KI7sX9MT3jcY9VNTRr-1uLkAVW4eOU6flD6QZrb7EesI1kMxDtMv6N3u4Jsv4jscJ_mDHQvNmwMASTmzK3g4WmD7Q7lty-UQSGn5ZmiNhKQADzI4YYpl5NQfPzCeIi6g_VWKbhLJ2HyEv-KZrJszLI9J7jumwtnyuKkjKkg-B52Z_Iecw4GHRebMzZGLAA-wEMXfoDzuMkuUZhzjwUJqq-xgcYxkn8FpYq_eo3uXHZ2e70S0zp5wJTkycSDdGTPd4YMr4LrC2btCMGVcq_lkwzFk2rnVuZ3ftqM0trkK5-MI_uVNGN7Yc2DZK4DeMsph0t66XwdIjxNVmeXqeRu-YccVSQt1pIwGLOI7N3k-IcVA9fdfbyx8-pBKjC4EubhOan1r_rLlRVAhVQ_ijQHBpsj7O2U6-eVAzgVmKwhpb=w490-h686-no?authuser=0', 5),
        ('Fou Foune', 'Cantillon', 'https://lh3.googleusercontent.com/pw/AL9nZEUIG3cTbA7Nk_kefMtMJGyO-9p7WBqSjCxDFHGs90KUdzMr2Zf4qGUV4mVC4ihOF6pGUAC0fmFszwb2oUp8KwxlfsbFngOiSIz0ErpEtC4-N-y6394A_L5cQHKZPtCNygCdvMfyzJp_yDF2bIS_H_pX4i_0iMQwpz1L7o0q0ma_CPXxxpAaGc-ZPV_0joGBD_mPm6N7boNpbGCqJie_BoS4nbcW8BGkv598lGuctR7SYMiiAY2PN_L2Ltb-YJF4pli9FGrkxngwn7WVjPNFsGvnPPbud9PJehIfzNTxfWQ6ezgz4c2IfmOfui8Ac49_60nXJn96OHLQU9i_PtNShtFPyYn90-pG_qrSeZDTmgCQ8mo7xSOpBpSPCraD-C4N5nencyydz3AzZbBAKn3J4yLT4E-2tEDY1oKE7YQawBltOPDCrSQcMbovCNEQv2Qy1TxDPRmGqZPiSLFxY4mvMyyxQ8efIcCsTUh1J9vkARN8HXZ6D5DvBVtdAah-lDm71YmwLPwxMVlithar2qCBd0P6YV8pHJpOCVigHpkUvs1Kf4Pjwzl2KMfBbgkM0KHVOg3H52XnoNJEU6NbVN7q_6ueSqJWgh6_DF831bxKiPrKh8n69n-3ztcCvD-lY_sV87yND1P-WwshxXvpLc_7Ycn1GqA6WvDUf3pvLXAQ4kmVxBRadLHwFnA3oOPwZcFTwLX97iubl_HkEdpk9A4uFkuEkM5Ip6g3QlZF9IElX37xU-X6qemyHAGTck0agU7nPNdD-564fUduuscsMV0hb5NZU-iJXjnck9HSX6BaXPczV5uFAxD-KqFn0qTsxaqcgD8vBPoUOo8XqyZW5c3C0nwhoc1owdzq09-k1u2YTLYI2gxztfRkummPpsgXv5PmSnsMzgitRPfY=s375-no?authuser=0', 6)
        ;

    

`).then(() => {
    console.log('DB seeded!')
    res.sendStatus(200)
}).catch(err => console.log('error seeding DB', err))
}
}