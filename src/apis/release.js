import getServer from '../configs/configureServer';
import createAjax from '../utils/ajax';

const { Get } = createAjax(getServer().cloudMaster);

// 获取布单列表
export function releaseListGet() {
	return Get('api/system/docker/repo/list');
}
