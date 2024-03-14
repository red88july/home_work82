import { configDotenv } from 'dotenv';

configDotenv();

const connectToDB = {
    db: 'mongodb://localhost/music',

    google: {
        clientId: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    },
}

export default connectToDB;