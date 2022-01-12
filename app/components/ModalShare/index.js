/**
 *
 * ModalShare
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

function ModalShare(props) {
  return (
    <Modal visible={props.visible} title="Share movie" footer={null}>
      <Form ref={props.formRef} layout="vertical" onFinish={props.onOk}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Ingresar un email',
              type: 'email',
            },
          ]}
        >
          <Input
            name="email"
            className="input-share"
            value={props.email}
            onChange={({ target }) => props.onChangeEmail(target.value)}
            placeholder="email"
          />
        </Form.Item>
        <div align="right">
          <Button loading={props.loading} htmlType="submit" type="primary">
            Send
          </Button>{' '}
          <Button
            disabled={props.loading}
            type="detault"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

ModalShare.propTypes = {
  visible: PropTypes.bool,
  formRef: PropTypes.object,
  onOk: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  email: PropTypes.string,
};

export default ModalShare;
