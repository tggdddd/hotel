import React from 'react';
import AreaPicker from '@/components/AreaPicker';
import {AutoCenter, Button, Form, ImageUploader, Input, NavBar, Radio, Space} from "antd-mobile";
import {useRouteStatus} from "@/common";
import {UPLOAD} from "@/utils/axios";
import {GlobalToast} from "@/utils/toast";
import {saveUser} from "@/state/userState";
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    const routeStatus = useRouteStatus();
    const user = routeStatus.user
    const [form] = Form.useForm()
    //地区显示或者隐藏
    var [area, SetArea] = React.useState(false)
    //组装表单数据
    var [bus, SetBus] = React.useState({
        nickname: user.nickname,
        mobile: user.mobile,
        password: user.password,
        email: user.email ? user.email : '',
        gender: user.gender,
        avatar: {},
        code: user.district ? user.district : null,
        region_text: user.region_text ? user.region_text : ''
    })

    var [avatar, SetAvatar] = React.useState([{
        url: user.avatar_text
    }])

    const DelAvatar = () => {
        SetAvatar([])
    }

    const upload = async (file: any) => {
        SetBus({
            ...bus,
            avatar: file
        })
        return {
            url: URL.createObjectURL(file),
        }
    }

    const AreaConfirm = async (val: any, list: any) => {
        var code = ''
        for (var k = val.length; k >= 0; k--) {
            if (val[k]) {
                code = val[k].toString()
                break;
            }
        }
        var region_text = ''
        if (list[0]) region_text += `${list[0]}`
        if (list[1]) region_text += `-${list[1]}`
        if (list[2]) region_text += `-${list[2]}`

        form.setFieldsValue({
            region_text: region_text,
            code: code
        })
    }

    const profile = async (values: any) => {
        //组装数据
        values.id = user.id
        //头像
        if (bus.avatar) {
            values.avatar = bus.avatar
        }
        if (form.getFieldValue('code')) {
            values.code = form.getFieldValue('code')
        }
        if (!values.password) delete values.password
        //请求接口
        var result = await UPLOAD('/business/profile', values);
        GlobalToast.success(result.msg)
        saveUser(result.data)
        navigate(-1)
    }

    return (
        <>
            <NavBar onBack={() => navigate(-1)}>基本资料</NavBar>
            <AreaPicker visible={area} onClose={() => {
                SetArea(false)
            }} onConfirm={AreaConfirm}/>
            <Form
                form={form}
                name='form'
                onFinish={profile}
                layout='horizontal'
                mode='card'
                initialValues={bus}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交修改
                    </Button>
                }
            >
                <AutoCenter style={{margin: '30px 0px'}}>
                    <ImageUploader value={avatar} maxCount={1} onDelete={DelAvatar} upload={upload}
                                   onChange={SetAvatar}/>
                </AutoCenter>
                <Form.Item name="nickname" label="昵称" rules={[{required: true}]}>
                    <Input placeholder="请输入昵称"/>
                </Form.Item>
                <Form.Item name="mobile" label="手机号"
                           rules={[{required: true}, {
                               pattern: /^1[3456789]\d{9}$/,
                               message: '手机号格式不对'
                           }]}>
                    <Input placeholder="请输入手机号"/>
                </Form.Item>
                <Form.Item name="password" label="密码">
                    <Input type="password" placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{required: true}, {
                    pattern: /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,
                    message: '邮箱格式不对'
                }]}>
                    <Input placeholder="请输入邮箱"/>
                </Form.Item>
                <Form.Item name="gender" label="性别" rules={[{required: true}]}>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='0'>保密</Radio>
                            <Radio value='1'>男</Radio>
                            <Radio value='2'>女</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="region_text" label="地区" onClick={() => SetArea(true)}>
                    <Input placeholder="请选择地区" readOnly/>
                </Form.Item>
                <Form.Header/>
            </Form>
        </>
    )
}

export default Profile