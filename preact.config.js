import envVars from 'preact-cli-plugin-env-vars';
const WorkboxPlugin = require('workbox-webpack-plugin');
const preactCliFlow = require('preact-cli-plugin-flow');

export default (config, env, helpers) => {
    process.env.PREACT_APP_ENV_NAME = process.env.PREACT_APP_ENV_NAME ? process.env.PREACT_APP_ENV_NAME : 'dev';
    envVars(config, env, helpers);
    config.output.publicPath = process.env.PREACT_APP_BASE_PATH;
    console.log('Environment : ' + process.env.PREACT_APP_ENV_NAME);
    console.log('Public path : ' + process.env.PREACT_APP_BASE_PATH);


    config.plugins.push(
        new WorkboxPlugin.InjectManifest({
            swSrc: './service-worker.js',
            swDest: './service-worker.js',
            include: [/\.png$/, /\.ico$/],
        })
    );
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
    });

    return preactCliFlow(config);
};
