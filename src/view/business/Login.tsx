import "@/assets/css/login.css";
import {Avatar, Button, Form, Input, Space} from "antd-mobile";
import {GlobalToast} from "@/utils/toast";
import {useNavigate} from "react-router-dom";
import {loginApi} from "@/api/business";
import {saveToken, saveUser} from "@/state/userState";

export default function () {
    const navigate = useNavigate();

    function submit(values: any) {
        loginApi(values).then((res: any) => {
            saveUser(res.data)
            saveToken(res.data.token)
            GlobalToast.success(res.msg)
            navigate("/")
        })
    }

    return (
        <>
            <Space block direction='vertical' style={{'margin': '24px'}} align="center" justify="center">
                <Avatar src='' style={{'--size': '72px', '--border-radius': '50%'}}/>
            </Space>
            <Form layout='horizontal' mode='card'
                  initialValues={{mobile: '15014586591', password: '123456'}}
                  onFinish={submit}
                  onFinishFailed={(entity) => {
                      GlobalToast.error(entity.errorFields[0].errors[0])
                  }}
                  footer={
                      <Button block type='submit' color='primary' size='large'>
                          登录
                      </Button>
                  }>
                <Form.Item label='手机号' name="mobile"
                           rules={[{required: true}, {pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对'}]}>
                    <Input placeholder='请输入手机号'/>
                </Form.Item>
                <Form.Item label='密码' name="password" rules={[{required: true}]}>
                    <Input type="password" placeholder='请输入密码'/>
                </Form.Item>
            </Form>
            <Space justify="end" align="end" block>
                <Button color='primary' fill='none'>注册账号</Button>
                <Button color='primary' fill='none'>忘记密码</Button>
            </Space>
        </>
    )
}