import getServer from '../configs/configureServer';
import createAjax from '../utils/ajax';

const { Get, Post } = createAjax(getServer().cloudMaster);

// 获取布单列表
export function repoListGet() {
	return Get('api/system/docker/repo/list');
}

// 创建新的repo
export function repoPost(param) {
	return Post('api/system/docker/repo/create', param);
}

// 更新repo
export function repoPut(param) {
	return Post('api/system/docker/repo/update', param);
}

// 删除repo
export function repoDelete(param) {
	return Post('api/system/docker/repo/delete', param);
}
