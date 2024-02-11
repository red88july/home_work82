import path from 'path';

const rootPath = __dirname;

const configDirectory = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
};

export default configDirectory;