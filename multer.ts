import multer from "multer";
import path from 'path';

import configDirectory from "./configDirectory";
import { promises as fs } from 'fs';
import{ randomUUID } from "crypto";

const imageStorage = multer.diskStorage({
    destination: async (req, file ,cb) => {
        const destDir = path.join(configDirectory.publicPath, 'images');
        await fs.mkdir(destDir, {recursive: true});
        cb(null, configDirectory.publicPath);
    },
    filename:(req, file, cb) =>  {
        const extension = path.extname(file.originalname);
        const filename = path.join('images', randomUUID() + extension);
        cb(null, filename);
    },
});

export const imageUpload = multer({storage: imageStorage});