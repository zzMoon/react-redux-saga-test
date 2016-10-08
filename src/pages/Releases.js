import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Form, Button, Select, Input, Modal, Menu, Dropdown, Icon, Row, Col } from 'antd';

import { ps } from '../configs/configureBase';

function Releases({ releases }) {
    const { releaseInfoList, releaseLoading, total, pn } = releases;

    const columns = [{
        title: '发布名称',
        dataIndex: 'name',
        width: '15%',
    }, {
        title: '应用名称',
        dataIndex: 'appName',
        width: '10%'
    }, {
        title: '服务名称',
        dataIndex: 'microServiceNameList',
        width: '13%',
        render: text =>
            <div>
                {text.map((x, index) => <p key={index}>{x}</p>)}
            </div>
    }, {
        title: '业务线',
        dataIndex: 'departmentName',
        width: '6%'
    }, {
        title: '部署类型',
        dataIndex: 'deployType',
        width: '6%',
    }, {
        title: '来源',
        dataIndex: 'releaseType',
        width: '6%',
    }, {
        title: '创建人',
        dataIndex: 'createUser',
        width: '6%'
    }, {
        title: '修改时间',
        dataIndex: 'updateTime',
        width: '10%',
    }, {
        title: '状态',
        dataIndex: 'status',
        width: '5%',
    }, {
        title: '操作',
        width: '9%',
    }];

    const pagination = {
        current: pn,
        total,
        pageSize: ps,
        showTotal: all => `共 ${all} 条`
    };

    return (
        <div className="cloud-wrap">
            <Table
                style={{ marginTop: '16px' }}
                rowKey={record => record.uuid}
                columns={columns}
                loading={releaseLoading}
                pagination={pagination}
                dataSource={releaseInfoList}
            />
        </div>
    );
}

Releases.propTypes = {
    children: PropTypes.element,
    actions: PropTypes.object,
    releaseInfoList: PropTypes.array,
    releaseLoading: PropTypes.bool
};

function mapStateToProps({ releases }) {
    return { releases };
}

export default connect(mapStateToProps)(Releases);
