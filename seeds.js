var dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8000;

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const Personal = require('./models/personal');
const Carrec = require('./models/carrec');

const llistaPersonal = [
    {
        nom: 'Admin',
        cognoms: 'Admin',
        gmail: 'admin@vidalibarraquer.net',
        contrasenya: 'Admin',
        familia: 'Admin'
    },
    {
        nom: 'Silvana',
        cognoms: 'Ribelles',
        gmail: 'depadm@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Família Administrativa'
    },
    {
        nom: 'Joan',
        cognoms: 'Cervós',
        gmail: 'depinfo@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Família Informàtica i Comunicacions'
    },
    {
        nom: 'Aurora',
        cognoms: 'Vinyes',
        gmail: 'depser@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Família Serveis a la Comunitat'
    },
    {
        nom: 'Manel',
        cognoms: 'Garcia',
        gmail: 'depcom@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Família Comercial i Màrqueting'
    },
    {
        nom: 'Maria José',
        cognoms: 'Uribe',
        gmail: 'depfol@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'FOL'
    },
    {
        nom: 'José',
        cognoms: 'Sobrino',
        gmail: 'depidi@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Idiomes'
    },
    {
        nom: 'Iris',
        cognoms: 'Pérez',
        gmail: 'depsoc@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Ciències Socials'
    },
    {
        nom: 'R. Albert',
        cognoms: 'Duch',
        gmail: 'depexp@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Ciències Experimentals'
    },
    {
        nom: 'Raquel',
        cognoms: 'Pérez',
        gmail: 'deplle@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Llengües'
    },
    {
        nom: 'Neus',
        cognoms: 'Castellví',
        gmail: 'emprenedoria@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Emprenedoria'
    },
    {
        nom: 'Xavier',
        cognoms: 'Abillà',
        gmail: 'moodle@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Moodle'
    },
    {
        nom: 'Montse',
        cognoms: 'Treviño',
        gmail: 'web@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Web / SEO / SEM'
    },
    {
        nom: 'Andrea',
        cognoms: 'Lorente',
        gmail: 'sostenibilitat@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Sostenibilitat'
    },
    {
        nom: 'Imma',
        cognoms: 'Ferrús',
        gmail: 'mobilitat@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Mobilitat'
    },
    {
        nom: 'Jordi',
        cognoms: 'Jesús',
        gmail: 'plinguistic@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: 'Projecte Lingüístic'
    },
    {
        nom: 'Ramón',
        cognoms: 'Cervera',
        gmail: 'edc@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Pla d'Educació Digital de Centre"
    },
    {
        nom: 'Mar',
        cognoms: 'Cedó',
        gmail: 'orientafp@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Orientació Professional i Acadèmica"
    },
    {
        nom: 'Laura',
        cognoms: 'Rojas',
        gmail: 'sape@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "S. d'Atenció Pedagògica a l'Estudiant"
    },
    {
        nom: 'Maria',
        cognoms: 'Soler',
        gmail: 'cm@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Community Manager"
    },
    {
        nom: 'Eva',
        cognoms: 'López',
        gmail: 'comissiogenere@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Comissió de Gènere"
    },
    {
        nom: 'Belén',
        cognoms: 'Riola',
        gmail: 'mriola@xtec.cat',
        contrasenya: '12345678',
        familia: "Xarxa Empresa FP"
    },
    {
        nom: 'Susana',
        cognoms: 'Fernández',
        gmail: 'borsatreball@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Borsa de Treball"
    },
    {
        nom: 'Joan',
        cognoms: 'Cervós',
        gmail: 'futurafp@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Futura FP / CatsKlills"
    },
    {
        nom: 'Gerard',
        cognoms: 'Porto',
        gmail: 'esecretaria@vidalibarraquer.net',
        contrasenya: '12345678',
        familia: "Projectes Informàtics"
    },
];

const llistaCarrecs = [
    {
        nom: 'Professor'
    },
    {
        nom: 'Director'
    },
    {
        nom: 'Cap de departament'
    },
    {
        nom: 'Responsable'
    },
];

const seedDB = async () => {
    await Personal.deleteMany({});
    await Personal.insertMany(llistaPersonal);

    await Carrec.deleteMany({});
    await Carrec.insertMany(llistaCarrecs);
};

seedDB().then(() => {
    mongoose.connection.close();
});

// Para ejecutar el seeder hay que poner 'node seeds.js'