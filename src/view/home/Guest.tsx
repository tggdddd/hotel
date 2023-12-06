import React, {useState} from 'react';
import {AddOutline} from 'antd-mobile-icons'
import {
    Button,
    Dialog,
    Form,
    InfiniteScroll,
    Input,
    List,
    NavBar,
    Popup,
    PullToRefresh,
    Radio,
    Space,
    SwipeAction
} from "antd-mobile";
import {POST, Result} from "@/utils/axios";
import {GlobalToast} from "@/utils/toast";
import {CommonPageInterface, guestAddOrUpdateApi, guestDelApi, GuestInterface} from "@/api/business";


function Add({submit}: { submit: Function }) {
    // const routeStatus = useRouteStatus();
    const add = async (values: any) => {
        var result = await guestAddOrUpdateApi(values)
        GlobalToast.success(result.msg);
        submit()
    }

    return (
        <>
            <NavBar
                backArrow={false}
            >添加住客</NavBar>

            <Form
                initialValues={{mobile: '', nickname: ''}}
                onFinish={add}
                name='add'
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item name="nickname" label="昵称" rules={[{required: true}]}>
                    <Input placeholder="请输入昵称"/>
                </Form.Item>
                <Form.Item name='mobile' label='手机号' rules={[{required: true}, {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '手机号格式不对'
                }]}>
                    <Input placeholder='请输入手机号'/>
                </Form.Item>
                <Form.Item name="sex" label="性别" rules={[{required: true}]}>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='1'>男</Radio>
                            <Radio value='2'>女</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    )
}


const Component = ({selectedList, changeSelected}: {
    selectedList: Array<GuestInterface>, changeSelected: any
}) => {
    let [page, SetPage] = React.useState(1)
    let [list, SetList] = React.useState<Array<GuestInterface>>([])
    let [hasMore, SethasMore] = React.useState(true)
    let ref = React.useRef(null)

    // 下拉刷新
    const onRefresh = async () => {
        SetPage(1)
        SetList([])
        SethasMore(true)
        await ListData()
    }

    function isSelected(id: string | undefined) {
        return selectedList.find(e => e.id == id)
    }

    function delSelected(id: string | undefined) {
        const index = selectedList.findIndex(e => e.id == id);
        if (index != -1) {
            changeSelected([
                ...selectedList.slice(0, index),
                ...selectedList.slice(index + 1)
            ])
        }
    }

    function changeItemSelected(item: GuestInterface) {
        const index = selectedList.findIndex(e => e.id == item.id);
        if (index != -1) {
            changeSelected([
                ...selectedList.slice(0, index),
                ...selectedList.slice(index + 1)
            ])
        } else {
            changeSelected([item, ...selectedList])
        }
    }

    //上拉加载
    const loadMore = async () => {
        await ListData()
    }

    //请求数据
    const ListData = async () => {
        const result = await POST('/business/guest_list', {
            page: page
        }) as Result<CommonPageInterface<GuestInterface>>
        console.log(result)
        //没有更多数据
        SethasMore(result.data.hasMore)
        SetPage(result.data.page)
        console.log(result.data.list)
        if (result.data.list.length > 0) {
            SetList(list.concat(result.data.list))
        }

    }

    const ClickGuest = async (gid: any) => {
        let confirm = await Dialog.confirm({
            content: '是否确认删除'
        })
        console.log(gid)
        if (!confirm) return false
        const result = await guestDelApi(gid) as Result<any>
        await GlobalToast.success(result.msg)
        delSelected(gid)
        await onRefresh()
    }

    //封装右侧滑动的按钮数据
    const right = [
        {
            key: 'delete',
            text: '删除信息',
            color: 'danger',
        }
    ]
    const [addVisible, setAddVisible] = useState(false)
    return (
        <>
            <NavBar
                right={(
                    <AddOutline
                        fontSize={30}
                        onClick={() => setAddVisible(true)}
                    />)}
                backArrow={false}
            >住客列表</NavBar>
            <PullToRefresh onRefresh={onRefresh}>
                <List>
                    {list.map((item, key) => (
                        <SwipeAction ref={ref} key={item.id} rightActions={right}
                                     onAction={ClickGuest.bind(this, item.id)}>
                            <List.Item description={item.mobile}
                                       extra={
                                           isSelected(item.id) ?
                                               <Button onClick={changeItemSelected.bind(this, item)}
                                                       color="warning">已选</Button> :
                                               <Button onClick={changeItemSelected.bind(this, item)}>选择</Button>
                                       }
                                       arrow={false}>
                                {item.nickname}({item.sex_text})
                            </List.Item>
                        </SwipeAction>
                    ))}
                </List>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0}/>
            </PullToRefresh>

            {/*添加*/}
            <Popup
                visible={addVisible}
                onMaskClick={() => {
                    setAddVisible(false)
                }}
                position='bottom'
            >
                <Add submit={() => {
                    setAddVisible(false);
                    onRefresh();
                }}/>
            </Popup>
        </>
    )
}

export default Component