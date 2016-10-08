import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Form, Button, Select, Input, Modal, Menu, Dropdown, Icon, Row, Col } from 'antd';

import { ps } from '../configs/configureBase';

function Repos({ repos }) {
    const { list, tableLoading, total, pn } = repos;

    const columns = [{
        title: '仓库名称',
        dataIndex: 'name',
        width: '10%',
    }, {
        title: '域名',
        dataIndex: 'domain',
        width: '10%',
    }, {
        title: '版本',
        dataIndex: 'version',
        width: '10%',
    }, {
        title: '账户',
        dataIndex: 'account',
        width: '10%'
    }, {
        title: '密码',
        dataIndex: 'password',
        width: '10%'
    }, {
        title: '操作',
        dataIndex: '',
        width: '10%',
        render: (text, record) =>
            <div>
                <a>修改</a>
                <span className="ant-divider"></span>
                <a>删除</a>
            </div>
    }];

    const pagination = {
        current: pn,
        total,
        pageSize: ps,
        showTotal: all => `共 ${all} 条`
    };

    return (
        <div className="cloud-wrap">
            <Button
                type="primary"
            >新建</Button>
            <Table
                style={{ marginTop: '16px' }}
                rowKey={record => record.uuid}
                columns={columns}
                loading={tableLoading}
                pagination={pagination}
                dataSource={list}
            />
        </div>
    );
}

Repos.propTypes = {
    repos: PropTypes.object,
};

function mapStateToProps({ repos }) {
    return { repos };
}

export default connect(mapStateToProps)(Repos);
