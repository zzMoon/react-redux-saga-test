import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Input } from 'antd';

import './login.scss';

function Login({
    dispatch,
    username,
    password,
    loginBtnLoading,
}) {
    // handleLogin() {
    //     const { actions, userName, passWord } = this.props;

    //     if(!userName) {
    //         Modal.error({ title: '账号不能为空' });
    //         return;
    //     }

    //     if(!passWord) {
    //         Modal.error({ title: '密码不能为空' });
    //         return;
    //     }

    //     actions.login();
    // }

    // handleKeyDownLogin(e) {
    //     var evt = e || window.event; //获取event对象   
    //     var obj = evt.target || evt.srcElement; //获取事件源 

    //     if (evt.keyCode == 13) {
    //         this.handleLogin();
    //     }
    // }

    return (
        <div className="login">
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
                        <Button loading={loginBtnLoading}>登录</Button>
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
    loginBtnLoading: PropTypes.bool,
};

function mapStateToProps({ login }) {
    return { ...login };
}

export default connect(mapStateToProps)(Login);
