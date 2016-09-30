import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Input, Modal } from 'antd';

import './login.scss';

function Login({
    dispatch,
    username,
    password,
    btnLoading,
}) {
    function handleLogin() {
        if (!username) {
            Modal.error({ title: '账号不能为空' });
            return;
        }

        if (!password) {
            Modal.error({ title: '密码不能为空' });
            return;
        }

        dispatch({ type: 'login/login', payload: { password, username } });
    }

    function handleKeyDownLogin(e) {
        const evt = e || window.event; // 获取event对象

        if (evt.keyCode == 13) {
            handleLogin();
        }
    }

    return (
        <div className="login" onKeyDown={handleKeyDownLogin}>
            <div className="loginBox">
                <div className="loginTitle">XX帮云平台</div>
                <div className="loginContent">
                    <div>
                        <div className="line">
                            <label htmlFor="username">帐号</label>
                            <Input
                                id="username"
                                autoFocus="true"
                                type="text"
                                value={username}
                                onChange={e => dispatch({ type: 'login/inputChange', data: { username: e.target.value } })}
                            />
                        </div>
                        <div className="line">
                            <label htmlFor="password">密码</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => dispatch({ type: 'login/inputChange', data: { password: e.target.value } })}
                            />
                        </div>
                    </div>
                    <div className="line">
                        <Button
                            loading={btnLoading}
                            onClick={handleLogin}
                        >登录</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    dispatch: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string,
    btnLoading: PropTypes.bool,
};

function mapStateToProps({ login }) {
    return { ...login };
}

export default connect(mapStateToProps)(Login);
