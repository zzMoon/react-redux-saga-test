import getServer from '../configs/configureServer';
import createAjax from '../utils/ajax';

const { Post } = createAjax(getServer().cloudMaster);

export function loginPost(param) {
    return Post('api/user/login/common', param);
}
