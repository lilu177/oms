import React from 'react';
import {Table, Icon ,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

//创建form
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
                <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="优惠类型">
                    {form.getFieldDecorator('desc', {
                        initialValue:value.id,
                        rules: [{ required: true, message: '请输入' }],
                    })(  <Input placeholder="请输入" />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

class preferential_type extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '优惠类型',
                    width: '25%',
                    dataIndex: 'id',
                    key:"id",
                },{
                    title: '设为默认',
                    width: '25%',
                    dataIndex: 'index',
                    key:"index",
                    render: (text, record) =>{
                        if(record.index!=0){
                            return (
                                <span>默认</span>
                            )
                        }else{
                            return (
                                <a href="javascript:;" onClick={()=>this.HandleDefault(record.id)}>设为默认</a>
                            )
                        }

                    }
                },{
                    title: '是否启用',
                    width: '25%',
                    dataIndex: 'enable',
                    key:"enable",
                    render: (text, record) =>{
                        if(record.enable!=0){
                            return (
                                <Switch size="small" checkedChildren={<Icon type="check" />} onClick={()=>this.HandleEnable(record.id)}  unCheckedChildren={<Icon type="cross" />} />
                            )
                        }else{
                            return (
                                <Switch  size="small" checkedChildren={<Icon type="check" />} onClick={()=>this.HandleEnable(record.id)}  unCheckedChildren={<Icon type="cross" />} defaultChecked />
                            )
                        }

                    }
                },{
                    title: '操作',
                    width: '25%',
                    dataIndex: 'key',
                    key:"key",
                    render: (text, record) =>{
                        return(
                            <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>编辑</a>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"添加优惠类型"
        }
    }
    componentDidMount() {
        var self = this;
        this.setState({ loading: true });
        var data=self.state.list;
        for(var i=0;i<30;i++){
          if(i%2==0){
            data.push({
              "key":i,
              "id":"税率名称"+i,
              "name":i,
              "enable":0,
              'index':1,
            })
          }else{
            data.push({
              "key":i,
              "id":"税率名称"+i,
              "name":i,
              "enable":1,
              'index':0,
            })
          }
        }
        self.setState({
          list: data,
          loading: false,
        });
        // axios({
        //     method:"POST",
        //     url:"/v2/movie/in_theaters",
        // }).then(function(data){
        //     //let json = data.data.subjects;
        //     var data=self.state.list;
        //     for(var i=0;i<30;i++){
        //         if(i%2==0){
        //             data.push({
        //                 "key":i,
        //                 "id":"税率名称"+i,
        //                 "name":i,
        //                 "enable":0,
        //                 'index':1,
        //             })
        //         }else{
        //             data.push({
        //                 "key":i,
        //                 "id":"税率名称"+i,
        //                 "name":i,
        //                 "enable":1,
        //                 'index':0,
        //             })
        //         }
        //     }
        //     self.setState({
        //         list: data,
        //         loading: false,
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
    }

    //添加form
    HandleModalVisible = (flag,record) => {
        this.setState({
            ModalVisible: !!flag,
            title:"添加优惠类型",
        });
        if(record!=undefined){
            this.setState({
                value: record,
                title:"编辑优惠类型",
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
    HandleDefault=(id)=>{
        message.success('设置成功');
        this.componentDidMount();
    }
    HandleEnable=(id)=>{
        message.success('设置成功');
        this.componentDidMount();
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
                <div className="Badge">
                    <Button type="primary" icon="plus" onClick={() => this.HandleModalVisible(true)}>添加</Button>
                </div>
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={Pagination} loading={this.state.loading}/>
                <CreateForm   ModalVisible={this.state.ModalVisible} title={this.state.title} HandleCancel={this.HandleCancel} value={this.state.value} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
            </section>
        )
    }
}
export default preferential_type

