import React from 'react';
import {Table, Icon ,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

//编辑form
const CreateForm = Form.create()(props => {
    const {  ModalVisible, form, HandleAdd ,value,title,HandleCancel} = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            HandleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
        HandleCancel();
    };
    return (
        <Modal
            title={title}
            visible={ModalVisible}
            cancelText="取消"
            okText="确定"
            onOk={okHandle}
            onCancel={onCancel}
            className="modal"
        >
            <Form hideRequiredMark className="modal-form">
                <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位简称">
                    {form.getFieldDecorator('id', {
                        initialValue:value.id,
                        rules: [{ required: true, message: '请输入' }],
                    })(  <Input placeholder="请输入" disabled/>)}
                </FormItem>
                <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位名称">
                    {form.getFieldDecorator('id0', {
                        initialValue:value.id0,
                        rules: [{ required: true, message: '请输入' }],
                    })(  <Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="单位地址">
                    {form.getFieldDecorator('id1', {
                        initialValue:value.id1,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="法定代表人">
                    {form.getFieldDecorator('id2', {
                        initialValue:value.id2,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="委托代表人">
                    {form.getFieldDecorator('id3', {
                        initialValue:value.id3,
                        // rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="电话">
                    {form.getFieldDecorator('id4', {
                        initialValue:value.id4,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="传真">
                    {form.getFieldDecorator('id5', {
                        initialValue:value.id5,
                        // rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="开户银行">
                    {form.getFieldDecorator('id6', {
                        initialValue:value.id6,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="银行账户">
                    {form.getFieldDecorator('id7', {
                        initialValue:value.id7,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="邮政编码">
                    {form.getFieldDecorator('id8', {
                        initialValue:value.id8,
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

class contract_supplier extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '合同供方简称',
                    dataIndex: 'id',
                    key:"id",
                },
                {
                    title: '单位名称',
                    dataIndex: 'id0',
                    key:"id0",
                },{
                    title: '单位地址',
                    dataIndex: 'id1',
                    key:"id1",
                },{
                    title: '法定代表人',
                    dataIndex: 'id2',
                    key:"id2",
                },{
                    title: '委托代表人',
                    dataIndex: 'id3',
                    key:"id3",
                },{
                    title: '电话',
                    dataIndex: 'id4',
                    key:"id4",
                },{
                    title: '传真',
                    dataIndex: 'id5',
                    key:"id5",
                },{
                    title: '开户银行',
                    dataIndex: 'id6',
                    key:"id6",
                },{
                    title: '银行账户',
                    dataIndex: 'id7',
                    key:"id7",
                },{
                    title: '邮政编号',
                    dataIndex: 'id8',
                    key:"id8",
                },{
                    title: '操作',
                    dataIndex: 'id9',
                    key:"id9",
                    render: (text, record) =>{
                        return(
                            <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>编辑</a>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"添加商务标记"
        }
    }
    componentDidMount() {
        var self = this;
        this.setState({ loading: true });
        self.setState({
          list: [
            {
              "key":0,
              "id":"同步电子",
              "id0":"同步电子有限公司",
              "id1":"华东大厦20楼",
              "id2":"王永康",
              "id3":"",
              "id4":"0510-8888888",
              "id5":"传真",
              "id6":"银行",
              "id7":"账号",
              "id8":"编码",
            },
            {
              "key":1,
              "id":"同步电子",
              "id0":"同步电子有限公司",
              "id1":"华东大厦20楼",
              "id2":"",
              "id3":"王永康",
              "id4":"0510-8888888",
              "id5":"传真",
              "id6":"银行",
              "id7":"账号",
              "id8":"编码",
            }
          ],
          loading: false,
        });
        // axios({
        //     method:"POST",
        //     url:"/v2/movie/in_theaters",
        // }).then(function(data){
        //     self.setState({
        //         list: [
        //             {
        //                 "key":0,
        //                 "id":"同步电子",
        //                 "id0":"同步电子有限公司",
        //                 "id1":"华东大厦20楼",
        //                 "id2":"王永康",
        //                 "id3":"",
        //                 "id4":"0510-8888888",
        //                 "id5":"传真",
        //                 "id6":"银行",
        //                 "id7":"账号",
        //                 "id8":"编码",
        //             },
        //             {
        //                 "key":1,
        //                 "id":"同步电子",
        //                 "id0":"同步电子有限公司",
        //                 "id1":"华东大厦20楼",
        //                 "id2":"",
        //                 "id3":"王永康",
        //                 "id4":"0510-8888888",
        //                 "id5":"传真",
        //                 "id6":"银行",
        //                 "id7":"账号",
        //                 "id8":"编码",
        //             }
        //         ],
        //         loading: false,
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
    }

    //添加form
    HandleModalVisible = (flag,record) => {
        if(record!=undefined){
            this.setState({
                ModalVisible: !!flag,
                value: record,
                title:"编辑合同供方",
            });
        }
    };
    HandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            ModalVisible: false,
            value:{},
        });
        this.componentDidMount();
    };
    HandleCancel =(flag)=>{
        this.setState({
            ModalVisible: !!flag,
            value:{}
        });
    }
    render(){
        //分页
        const Pagination = {
            defaultPageSize:20,
            pageSizeOptions:['20', '30', '50', '100', '200'],
            showQuickJumper:true,
            total: this.state.list.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        };

        return(
            <section className="content">
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={false} loading={this.state.loading}/>
                <CreateForm   ModalVisible={this.state.ModalVisible} title={this.state.title} HandleCancel={this.HandleCancel} value={this.state.value} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
            </section>
        )
    }
}
export default contract_supplier

