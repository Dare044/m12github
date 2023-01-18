var dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8000;

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const Personal = require('./models/personal');

const llistaPersonal = [
    {
        nom: 'Admin',
        cognoms: 'Admin',
        gmail: 'admin@vidalibarraquer.net',
        contrasenya: 'Admin',
        carrec: 'Admin'
    },
    {
        nom: 'Silvana',
        cognoms: 'Ribelles',
        gmail: 'depadm@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Família Administrativa'
    },
    {
        nom: 'Joan',
        cognoms: 'Cervós',
        gmail: 'depinfo@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Família Informàtica i Comunicacions'
    },
    {
        nom: 'Aurora',
        cognoms: 'Vinyes',
        gmail: 'depser@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Família Serveis a la Comunitat'
    },
    {
        nom: 'Manel',
        cognoms: 'Garcia',
        gmail: 'depcom@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Família Comercial i Màrqueting'
    },
    {
        nom: 'Maria José',
        cognoms: 'Uribe',
        gmail: 'depfol@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'FOL'
    },
    {
        nom: 'José',
        cognoms: 'Sobrino',
        gmail: 'depidi@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Idiomes'
    },
    {
        nom: 'Iris',
        cognoms: 'Pérez',
        gmail: 'depsoc@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Ciències Socials'
    },
    {
        nom: 'R. Albert',
        cognoms: 'Duch',
        gmail: 'depexp@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Ciències Experimentals'
    },
    {
        nom: 'Raquel',
        cognoms: 'Pérez',
        gmail: 'deplle@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Llengües'
    },
    {
        nom: 'Neus',
        cognoms: 'Castellví',
        gmail: 'emprenedoria@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Emprenedoria'
    },
    {
        nom: 'Xavier',
        cognoms: 'Abillà',
        gmail: 'moodle@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Moodle'
    },
    {
        nom: 'Montse',
        cognoms: 'Treviño',
        gmail: 'web@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Web / SEO / SEM'
    },
    {
        nom: 'Andrea',
        cognoms: 'Lorente',
        gmail: 'sostenibilitat@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Sostenibilitat'
    },
    {
        nom: 'Imma',
        cognoms: 'Ferrús',
        gmail: 'mobilitat@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Mobilitat'
    },
    {
        nom: 'Jordi',
        cognoms: 'Jesús',
        gmail: 'plinguistic@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: 'Projecte Lingüístic'
    },
    {
        nom: 'Ramón',
        cognoms: 'Cervera',
        gmail: 'edc@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Pla d'Educació Digital de Centre"
    },
    {
        nom: 'Mar',
        cognoms: 'Cedó',
        gmail: 'orientafp@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Orientació Professional i Acadèmica"
    },
    {
        nom: 'Laura',
        cognoms: 'Rojas',
        gmail: 'sape@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "S. d'Atenció Pedagògica a l'Estudiant"
    },
    {
        nom: 'Maria',
        cognoms: 'Soler',
        gmail: 'cm@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Community Manager"
    },
    {
        nom: 'Eva',
        cognoms: 'López',
        gmail: 'comissiogenere@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Comissió de Gènere"
    },
    {
        nom: 'Belén',
        cognoms: 'Riola',
        gmail: 'mriola@xtec.cat',
        contrasenya: '12345678',
        carrec: "Xarxa Empresa FP"
    },
    {
        nom: 'Susana',
        cognoms: 'Fernández',
        gmail: 'borsatreball@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Borsa de Treball"
    },
    {
        nom: 'Joan',
        cognoms: 'Cervós',
        gmail: 'futurafp@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Futura FP / CatsKlills"
    },
    {
        nom: 'Gerard',
        cognoms: 'Porto',
        gmail: 'esecretaria@vidalibarraquer.net',
        contrasenya: '12345678',
        carrec: "Projectes Informàtics"
    },
];

const seedDB = async () => {
    await Personal.deleteMany({});
    await Personal.insertMany(llistaPersonal);
};

seedDB().then(() => {
    mongoose.connection.close();
});

// Para ejecutar el seeder hay que poner 'node seeds.js'