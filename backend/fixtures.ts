import mongoose from "mongoose";
import crypto from "crypto";
import connectToDB from "./connectToDB";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const dropColletction = async (db: mongoose.Connection, collectionsName: string) => {
    try {
        await db.dropCollection(collectionsName);
    } catch (e) {
        console.log(`Collection ${collectionsName} was missing, skipping drop...`)
    }
}

const run = async () => {
    await mongoose.connect(connectToDB.db);
    const db = mongoose.connection;

    const collections = ['users', 'artists', 'albums', 'tracks'];

    for (const collectionsName of collections) {
        await dropColletction(db, collectionsName);
    }

    const artist = await Artist.create([
        {
            author: 'Nightwish',
            photo: 'fixtures/nightwish.jpg',
            info: 'Финская симфоник-метал-группа с женским вокалом, исполняющая песни преимущественно на английском языке.' +
                ' Основана Туомасом Холопайненом, Эмппу Вуориненом и Тарьей Турунен в 1996 году в городе Китеэ.',
            isPublished: true,
        }, {
            author: 'Metallica',
            photo: 'fixtures/metallica.jpg',
            info: 'Американская метал-группа, созданная вокалистом и гитаристом' +
                ' Джеймсом Хетфилдом и барабанщиком Ларсом Ульрихом в Лос-Анджелесе, штат Калифорния, в 1981 году.',
            isPublished: true,
        }, {
            author: 'Кипелов',
            photo: 'fixtures/ariya.jpg',
            info: 'Российская рок-группа под руководством Валерия Кипелова, основанная в 2002 году. ' +
                'По словам Валерия, группа играет в стиле Хард-н-хеви, а главные' +
                ' ориентиры в творчестве — это «хорошая красивая мелодия и достойный текст».',
            isPublished: true,
        }, {
            author: 'HYDE',
            photo: 'fixtures/hyde.jpg',
            info: 'Японский музыкант (певец и гитарист), автор-исполнитель, музыкальный продюсер и актёр. ' +
                'Вокалист рок-группы L’Arc-en-Ciel, которая уже более 30 лет является одним из самых ярких и авторитетных представителей j-rock.',
            isPublished: true,
        }, {
            author: 'Crazy Lixx',
            photo: 'fixtures/crazyLixx.jpeg',
            info: 'Шведская рок-группа, образованная в 2002 году. ' +
                'Это одна из групп шведской хард-рок сцены, основана под влиянием групп Guns N Roses, Aerosmith, Kiss и некоторых других.',
            isPublished: false,
        },
    ]);

    const album = await Album.create([
        {
            album: 'Angels Fall First',
            artist: artist[0]._id,
            date: 1996,
            image: 'fixtures/angelFallFirstAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Oceanborn',
            artist: artist[0]._id,
            date: 1998,
            image: 'fixtures/oceanBornAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Dark Passion Play',
            artist: artist[0]._id,
            date: 2007,
            image: 'fixtures/darkPassionPlayAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Master of Puppets',
            artist: artist[1]._id,
            date: 1986,
            image: 'fixtures/masterOfPuppetsAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Load',
            artist: artist[1]._id,
            date: 1996,
            image: 'fixtures/loadAlbum.jpeg',
            isPublished: true,
        }, {
            album: 'Death Magnetic',
            artist: artist[1]._id,
            date: 2008,
            image: 'fixtures/deathMagneticAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Реки Времен',
            artist: artist[2]._id,
            date: 2005,
            image: 'fixtures/riverOfTimesAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Жить вопреки',
            artist: artist[2]._id,
            date: 2011,
            image: 'fixtures/liveInSpiteOfAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Звезды и Кресты',
            artist: artist[2]._id,
            date: 2017,
            image: 'fixtures/starsAndCrosesAlbum.jpg',
            isPublished: true,
        }, {
            album: 'ANTI',
            artist: artist[3]._id,
            date: 2019,
            image: 'fixtures/antiAlbum.jpg',
            isPublished: true,
        }, {
            album: 'FAITH',
            artist: artist[3]._id,
            date: 2006,
            image: 'fixtures/faithAlbum.jpg',
            isPublished: true,
        }, {
            album: 'ROENTGEN',
            artist: artist[3]._id,
            date: 2004,
            image: 'fixtures/roentgenAlbum.jpg',
            isPublished: true,
        }, {
            album: 'Forever Wild',
            artist: artist[4]._id,
            date: 2019,
            image: 'fixtures/crazyLixxAlbum.jpg',
            isPublished: false,
        },
    ]);

    await Track.create([
        {
            track: 'Elvenpath',
            album: album[0]._id,
            duration: '04:40',
            number: 1,
            isPublished: true,
        }, {
            track: 'Beauty and the Beast',
            album: album[0]._id,
            duration: '06:24',
            number: 2,
            isPublished: true,
        }, {
            track: 'The Carpenter',
            album: album[0]._id,
            duration: '05:57',
            number: 3,
            isPublished: true,
        }, {
            track: 'Astral Romance',
            album: album[0]._id,
            author: 'Nightwish',
            duration: '05:12',
            number: 4,
            isPublished: true,
        }, {
            track: 'Angels Fall First',
            album: album[0]._id,
            duration: '05:34',
            number: 5,
            isPublished: true,
        }, {
            track: 'Stargazers',
            album: album[1]._id,
            duration: '04:28',
            number: 1,
            isPublished: true,
        }, {
            track: 'Gethsemane',
            album: album[1]._id,
            duration: '05:22',
            number: 2,
            isPublished: true,
        }, {
            track: 'Devil & the Deep Dark Ocean',
            album: album[1]._id,
            duration: '04:46',
            number: 3,
            isPublished: true,
        }, {
            track: 'Sacrament of Wilderness',
            album: album[1]._id,
            author: 'Nightwish',
            duration: '04:12',
            number: 4,
            isPublished: true,
        }, {
            track: 'Passion and the Opera',
            album: album[1]._id,
            duration: '04:50',
            number: 5,
            isPublished: true,
        }, {
            track: 'The Poet and the Pendulum',
            album: album[2]._id,
            duration: '13:54',
            number: 1,
            isPublished: true,
        }, {
            track: 'Bye Bye Beautiful',
            album: album[2]._id,
            duration: '04:14',
            number: 2,
            isPublished: true,
        }, {
            track: 'Amaranth',
            album: album[2]._id,
            duration: '03:51',
            number: 3,
            isPublished: true,
        }, {
            track: 'Cadence of Her Last Breath',
            album: album[2]._id,
            duration: '04:14',
            number: 4,
            isPublished: true,
        }, {
            track: 'Master Passion Greed',
            album: album[2]._id,
            duration: '06:02',
            number: 5,
            isPublished: true,
        }, {
            track: 'Battery',
            album: album[3]._id,
            duration: '05:13',
            number: 1,
            isPublished: true,
        }, {
            track: 'Master of Puppets',
            album: album[3]._id,
            author: 'Metallica',
            duration: '08:36',
            number: 2,
            isPublished: true,
        }, {
            track: 'The Thing That Should Not Be',
            album: album[3]._id,
            duration: '06:37',
            number: 3,
            isPublished: true,
        }, {
            track: 'Welcome Home (Sanitarium)',
            album: album[3]._id,
            duration: '06:28',
            number: 4,
            isPublished: true,
        }, {
            track: 'Disposable Heroes',
            album: album[3]._id,
            duration: '08:17',
            number: 5,
            isPublished: true,
        }, {
            track: `Ain't My Bitch`,
            album: album[4]._id,
            author: 'Metallica',
            duration: '05:04',
            number: 1,
            isPublished: true,
        }, {
            track: '2 X 4',
            album: album[4]._id,
            duration: '05:28',
            number: 2,
            isPublished: true,
        }, {
            track: 'The House Jack Built',
            album: album[4]._id,
            duration: '06:39',
            number: 3,
            isPublished: true,
        }, {
            track: 'Until It Sleeps',
            album: album[4]._id,
            duration: '04:29',
            number: 4,
            isPublished: true,
        }, {
            track: 'King Nothing',
            album: album[4]._id,
            duration: '05:28',
            number: 5,
            isPublished: true,
        }, {
            track: 'That Was Just Your Life',
            album: album[5]._id,
            duration: '07:08',
            number: 1,
            isPublished: true,
        }, {
            track: 'The End of the Line',
            album: album[5]._id,
            duration: '07:53',
            number: 2,
            isPublished: true,
        }, {
            track: 'Broken, Beat & Scarred',
            album: album[5]._id,
            duration: '06:25',
            number: 3,
            isPublished: true,
        }, {
            track: 'The Day That Never Comes',
            album: album[5]._id,
            duration: '07:56',
            number: 4,
            isPublished: true,
        }, {
            track: 'All Nightmare Long',
            album: album[5]._id,
            duration: '07:57',
            number: 5,
            isPublished: true,
        }, {
            track: 'На распутье',
            album: album[6]._id,
            duration: '05:01',
            number: 1,
            isPublished: true,
        }, {
            track: 'Дыханье тьмы',
            album: album[6]._id,
            duration: '05:07',
            number: 2,
            isPublished: true,
        }, {
            track: 'Пророк',
            album: album[6]._id,
            duration: '05:26',
            number: 3,
            isPublished: true,
        }, {
            track: 'Не сейчас',
            album: album[6]._id,
            duration: '04:55',
            number: 4,
            isPublished: true,
        }, {
            track: 'Матричный Бог',
            album: album[6]._id,
            duration: '06:36',
            number: 5,
            isPublished: true,
        }, {
            track: 'Интро',
            album: album[7]._id,
            duration: '01:35',
            number: 1,
            isPublished: true,
        }, {
            track: 'Жить вопреки',
            album: album[7]._id,
            duration: '04:36',
            number: 2,
            isPublished: true,
        }, {
            track: 'Власть огня',
            album: album[7]._id,
            duration: '04:47',
            number: 3,
            isPublished: true,
        }, {
            track: 'Гламурная птица',
            album: album[7]._id,
            duration: '06:01',
            number: 4,
            isPublished: true,
        }, {
            track: 'На грани',
            album: album[7]._id,
            duration: '05:03',
            number: 5,
            isPublished: true,
        }, {
            track: 'Интро',
            album: album[8]._id,
            duration: '01:51',
            number: 1,
            isPublished: true,
        }, {
            track: 'Звёзды и кресты',
            album: album[8]._id,
            duration: '05:25',
            number: 2,
            isPublished: true,
        }, {
            track: 'Рождённый летать',
            album: album[8]._id,
            duration: '05:18',
            number: 3,
            isPublished: true,
        }, {
            track: 'Дама пик',
            album: album[8]._id,
            duration: '06:35',
            number: 4,
            isPublished: true,
        }, {
            track: 'Ледяной дождь',
            album: album[8]._id,
            author: 'Кипелов',
            duration: '05:54',
            number: 5,
            isPublished: true,
        }, {
            track: 'WHO’S GONNA SAVE US',
            album: album[9]._id,
            duration: '05:54',
            number: 1,
            isPublished: true,
        }, {
            track: 'MAD QUALIA',
            album: album[9]._id,
            duration: '03:29',
            number: 2,
            isPublished: true,
        }, {
            track: 'SICK (feat. Matt of From Ashes to New)',
            album: album[9]._id,
            duration: '03:17',
            number: 3,
            isPublished: true,
        }, {
            track: 'ANOTHER MOMENT',
            album: album[9]._id,
            duration: '03:14',
            number: 4,
            isPublished: true,
        }, {
            track: 'FAKE DIVINE',
            album: album[9]._id,
            duration: '04:00',
            number: 5,
            isPublished: true,
        }, {
            track: 'JESUS CHRIST',
            album: album[10]._id,
            duration: '04:14',
            number: 1,
            isPublished: true,
        }, {
            track: 'COUNTDOWN',
            album: album[10]._id,
            duration: '04:09',
            number: 2,
            isPublished: true,
        }, {
            track: 'MADE IN HEAVEN',
            album: album[10]._id,
            duration: '03:44',
            number: 3,
            isPublished: true,
        }, {
            track: 'I CAN FEEL',
            album: album[10]._id,
            duration: '05:09',
            number: 4,
            isPublished: true,
        }, {
            track: `SEASON'S CALL`,
            album: album[10]._id,
            duration: '05:22',
            number: 5,
            isPublished: true,
        }, {
            track: `UNEXPECTED`,
            album: album[11]._id,
            duration: '03:50',
            number: 1,
            isPublished: true,
        }, {
            track: `WHITE SONG`,
            album: album[11]._id,
            duration: '05:16',
            number: 2,
            isPublished: true,
        }, {
            track: `EVERGREEN`,
            album: album[11]._id,
            duration: '04:59',
            number: 3,
            isPublished: true,
        }, {
            track: `OASIS`,
            album: album[11]._id,
            duration: '04:37',
            number: 4,
            isPublished: true,
        }, {
            track: `A DROP OF COLOUR`,
            album: album[11]._id,
            duration: '04:34',
            number: 5,
            isPublished: true,
        }, {
            track: `Wicked`,
            album: album[12]._id,
            duration: '03:47',
            number: 1,
            isPublished: false,
        }, {
            track: `Break Out`,
            album: album[12]._id,
            duration: '04:52',
            number: 2,
            isPublished: false,
        }, {
            track: `Silent Thunder`,
            album: album[12]._id,
            duration: '05:08',
            number: 3,
            isPublished: false,
        },
    ]);

    await User.create([
        {
            displayName: 'Ivanov',
            email: 'ivanov@gmail.com',
            password: "Ivanov_123#",
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: 'fixtures/hetfield.jpg',
        },  {
            displayName: 'Petrov',
            email: 'petrov@gmail.com',
            password: "Petrov_123#",
            token: crypto.randomUUID(),
            role: 'user',
            avatar: 'fixtures/hansolo.jpg',
        }
    ])

    await db.close();
};

void run();