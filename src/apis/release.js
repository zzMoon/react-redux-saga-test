import getServer from '../configs/configureServer';
import createAjax from '../utils/ajax';
import { obj2url } from '../utils/common';

const { Get } = createAjax(getServer().cloudMaster);

// 获取布单列表
export function releaseListGet(param) {
	return Get(`api/release/manages/list/like?${obj2url(param)}`);
}
