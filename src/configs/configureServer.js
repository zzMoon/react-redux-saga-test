const server = {
    dev: {
        cloudMaster: 'http://cloudmaster.dev-ag.56qq.com/',
    },
    qa: {},
    devTest: {},
    prod: {},
};

const port = window.location.port;
export const host = window.location.host;

export default function getServer() {
    if (port == '8011') {                     // 开发环境
        return server.dev;
    } else if (host == 'dev.cloud.56qq.cn') { // 开发测试环境
        return server.devTest;
    } else if (host == 'cloud.56qq.cn') {     // 正式环境
        return server.prod;
    }

    return { cloudMaster: 'http://cloudmaster.dev-ag.56qq.com/' };   // 其他环境
}
