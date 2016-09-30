export function dateFormat(date, fmt) {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    let tmpDate = date || new Date;
    let tmpFmt = fmt || 'yyyy-MM-dd hh:mm:ss';

    tmpDate = new Date(tmpDate);

    const o = {
        'M+': tmpDate.getMonth() + 1, // 月份
        'd+': tmpDate.getDate(), // 日
        'h+': tmpDate.getHours(), // 小时
        'm+': tmpDate.getMinutes(), // 分
        's+': tmpDate.getSeconds(), // 秒
        'q+': Math.floor((tmpDate.getMonth() + 3) / 3), // 季度
        S: tmpDate.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(tmpFmt)) {
        tmpFmt = tmpFmt.replace(RegExp.$1, (`${tmpDate.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    Object.keys(o).map(k => {
        if (new RegExp(`(${k})`).test(tmpFmt)) {
            tmpFmt = tmpFmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
        return k;
    });

    return tmpFmt;
}

export function obj2url(o) {
    if (!o) return '';

    const change = (arr, x) => {
        arr.push(`${x}=${o[x]}`);
        return arr;
    };

    // return R.compose(R.join('&'), R.reduce(change, []), R.keys)(o);
    return Object.keys(o).reduce(change, []).join('&');
}

// 跳转页面并替换上一个url
export function historyPushState(url, searchParam, nextParam = {}, obj) {
    const paramUrl = obj2url(searchParam); // 把对象变成url字符串
    const noParamUrl = location.href.split('?')[0]; // 去掉当前url中的参数
    const nextParamUrl = obj2url(nextParam); // 把对象变成url字符串

    history.replaceState(obj, '', `${noParamUrl}?${paramUrl}`);

    location.hash = `${url}?${nextParamUrl}`;
}

// 从列表中获取指定id的列
export function getListFromUuid(lists, uuid, uuidName) {
    const data = lists.filter(value => value[uuidName] == uuid);

    return data[0] || {};
}
