import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import validator from '../../utils/validator';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};

function RepoInfo(props) {
    const { version, name, domain, account, password, btnLoading } = props.repoInfo;
    const { getFieldDecorator } = props.form;

    function handleSubmit() {
        const { form, onSubmit } = props;

        form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                // console.log('Errors in form!!!');
                return;
            }

            onSubmit({ ...values, version });
        });
    }

    return (
        <Form horizontal>
            <FormItem
                {...formItemLayout}
                label="版本："
            >
                <span>{version}</span>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="仓库名称："
                hasFeedback
            >
                {getFieldDecorator('name', {
                    initialValue: name ? `${name}` : undefined,
                    rules: [
                        { required: true, message: '仓库名称不能为空' },
                    ],
                })(
                    <Input
                        type="text"
                        autoComplete="off"
                    />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="域名："
                hasFeedback
            >
                {getFieldDecorator('domain', {
                    initialValue: domain ? `${domain}` : undefined,
                    rules: [
                        { required: true, message: '域名不能为空' },
                        { validator: validator([{ regExpStr: '^([a-zA-Z\\d][a-zA-Z\\d-_]+\\.)+[a-zA-Z\\d-_][^ ]*:[\\d]+$', message: '格式错误，例：docker.56qq.cn:5000' }]) }
                    ],
                })(
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="例如：docker.56qq.cn:5000"
                    />
                )}
            </FormItem>
            <Row style={{ margin: '10px 0' }}>
                <Col offset={2}>
                    <span style={{ color: '#888' }}>如果设置了HTTPS连接 则请输入账号及密码 否则不要输入</span>
                </Col>
            </Row>
            <FormItem
                {...formItemLayout}
                label="账户："
                hasFeedback
            >
                {getFieldDecorator('account', {
                    initialValue: account ? `${account}` : undefined,
                    rules: [
                        { max: '20', message: '最大长度不能超过20' },
                    ],
                })(
                    <Input
                        type="text"
                        autoComplete="off"
                    />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码："
                hasFeedback
            >
                {getFieldDecorator('password', {
                    initialValue: password ? `${password}` : undefined,
                    rules: [
                        { max: '20', message: '最大长度不能超过20' },
                    ],
                })(
                    <Input
                        type="text"
                        autoComplete="off"
                    />
                )}
            </FormItem>
            <Row style={{ margin: '10px 0' }}>
                <Col offset={2}>
                    <Button
                        onClick={handleSubmit}
                        type="primary"
                        loading={btnLoading}
                    >创建</Button>
                </Col>
            </Row>
        </Form>
    );
}

RepoInfo.propTypes = {
    form: PropTypes.object,
    repoInfo: PropTypes.object,
};

export default Form.create()(RepoInfo);
