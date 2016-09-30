import 'whatwg-fetch';
import { Modal } from 'antd';

import { obj2url } from './common';
import { getCookieValue } from './cookie';

function myFetch(url, request, isNotModal) {
    return fetch(url, request)
        .then(res => res.json())
        .then(json => {
            const { code, msg } = json;

            if (code == 200) {
                return json;
            } else if (code == '401') {
                if (location.href.indexOf('login') === -1) {
                    Modal.error({ title: '请重新登录' });
                    location.hash = '#login';
                }
                throw new Error(msg);
            } else {
                // 可以选择不弹框提示错误
                !isNotModal && Modal.error({ title: msg });
                throw new Error(msg);
            }
        });
}

function createRequest(param, method) {
    const sessionId = getCookieValue('gSessionId') || '';
    let body;
    let headers;

    if (typeof param == 'string') {      // json字符串
        body = param;
        headers = { 'Content-Type': 'application/json', Authentication: sessionId };
    } else {                             // Form
        body = obj2url(param);
        headers = { 'Content-Type': 'application/x-www-form-urlencoded', Authentication: sessionId };
    }

    return {
        method,
        headers,
        body
    };
}

export default function createAjax(server, isNotModal) {
    function Get(uri) {
        const sessionId = getCookieValue('gSessionId') || '';
        const request = {
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authentication: sessionId }
        };

        return myFetch(`${server}/${uri}`, request, isNotModal);
    }

    function Post(uri, param) {
        return myFetch(`${server}/${uri}`, createRequest(param, 'post'), isNotModal);
    }

    function Put(uri, param) {
        return myFetch(`${server}/${uri}`, createRequest(param, 'put'), isNotModal);
    }

    function Delete(uri, param) {
        return myFetch(`${server}/${uri}`, createRequest(param, 'delete'), isNotModal);
    }

    return { Get, Post, Put, Delete };
}
