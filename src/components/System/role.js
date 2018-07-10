import React from 'react';
import {Table,Divider, Checkbox ,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const { TextArea } = Input;

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
                <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名称">
                    {form.getFieldDecorator('desc', {
                        initialValue:value.id,
                        rules: [{ required: true, message: '请输入' }],
                    })(  <Input placeholder="请输入" />)}
                </FormItem>
                <FormItem  labelCol={{ span: 5}} wrapperCol={{ span: 15 }}  label="角色说明">
                    {form.getFieldDecorator('input', {
                        initialValue:value.name,
                        rules: [{ required: true, message: '请输入至少5个字符',min:5 }]
                    })(<TextArea placeholder="请输入" rows={4} />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

//配置权限form
class Role_Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    "key":0,
                    "title":"结算单管理",
                    "children":["查看客户结算单1","查看客户结算单2","查看客户结算单3","查看客户结算单4"]
                },
                {
                    "key":1,
                    "title":"合同管理",
                    "children":["合同管理1","合同管理2","合同管理3","合同管理4","合同管理5","合同管理6","合同管理7","合同管理8"]
                },
                {
                    "key":2,
                    "title":"参数管理",
                    "children":["参数管理1","参数管理2","参数管理3","参数管理4","参数管理5","参数管理6"]
                },
                {
                    "key":3,
                    "title":"系统管理",
                    "children":["系统管理1","系统管理2","系统管理3","系统管理4","系统管理5","系统管理6","系统管理7","系统管理8"]
                }
            ],
            disabled0:true,
            disabled1:true,
            disabled2:true,
            disabled3:true,
        }
    }
    load_list = () =>{
        var list=this.state.data;
        var items = [];
        for(var i=0;i<list.length;i++){
            items.push(
                <Checkbox.Group style={{ width: '100%' }} key={list[i].title}>
                    <Switch size="small"  style={{marginBottom:"8px",marginRight:"8px"}} onChange={this.onChange.bind(this,"disabled"+list[i].key)}/>{list[i].title}
                    <Row>{this.load_list_children(list[i].children,list[i].key)}</Row>
                </Checkbox.Group>
            )
        }
        return items
    }
    load_list_children=(children,id)=>{
        var items_children=[];
        for(var i=0;i<children.length;i++){
            if(id==0){
                items_children.push(
                    <Col span={12} style={{marginBottom:"8px"}} key={children[i]}><Checkbox value={children[i]} disabled={this.state.disabled0}>{children[i]}</Checkbox></Col>
                )
            }else if(id==1){
                items_children.push(
                    <Col span={12} style={{marginBottom:"8px"}} key={children[i]}><Checkbox value={children[i]} disabled={this.state.disabled1}>{children[i]}</Checkbox></Col>
                )
            }else if(id==2){
                items_children.push(
                    <Col span={12} style={{marginBottom:"8px"}} key={children[i]}><Checkbox value={children[i]} disabled={this.state.disabled2}>{children[i]}</Checkbox></Col>
                )
            }else{
                items_children.push(
                    <Col span={12} style={{marginBottom:"8px"}} key={children[i]}><Checkbox value="1" disabled={this.state.disabled3}>{children[i]}</Checkbox></Col>
                )
            }
        }
        return items_children
    }
    onChange(id,checked) {
        console.log(id);
        this.setState((prevS,props)=>({
            [id]: !prevS[id]
        }));
    }
    render(){
        const {  RoleModalVisible, form, RoleHandleAdd ,value,RoleHandleCancel} = this.props;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                RoleHandleAdd(fieldsValue);
            });
        };
        const onCancel = () => {
            form.resetFields();
            RoleHandleCancel();
        }
        var list=this.state.data
        return (
            <Modal
                title="配置权限"
                visible={RoleModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <Form hideRequiredMark className="modal-form">
                    {this.load_list()}
                </Form>
            </Modal>
        )
    }
}
const RoleForm = Form.create()(Role_Form);


class role extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '名称',
                    width: '18%',
                    dataIndex: 'id',
                    key:"id",
                },
                {
                    title: '说明',
                    width: '18%',
                    dataIndex: 'name',
                    key:"name",
                },{
                    title: '创建时间',
                    width: '18%',
                    dataIndex: 'enable',
                    key:"enable",

                },{
                    title: '更新时间',
                    width: '18%',
                    dataIndex: 'team',
                    key:"team",

                },{
                    title: '操作',
                    width: '10%',
                    dataIndex: 'key',
                    key:"key",
                    render: (text, record) =>{
                        return(
                            <span>
                                <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={() => this.RoleHandleModalVisible(true,record)}>配置权限</a>
                            </span>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"",
            RoleModalVisible:false,
        }
    }
    componentDidMount() {
        var self = this;
        this.setState({ loading: true });
        var data=self.state.list;
        for(var i=0;i<30;i++){
          data.push({
            "key":i,
            "id":"名称"+i,
            "name":"说明"+i,
            "enable":"创建时间"+i,
            'team':"更新时间"+i,
          })
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
        //         data.push({
        //             "key":i,
        //             "id":"名称"+i,
        //             "name":"说明"+i,
        //             "enable":"创建时间"+i,
        //             'team':"更新时间"+i,
        //         })
        //     }
        //     self.setState({
        //         list: data,
        //         loading: false,
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
    }
    //添加编辑form
    HandleModalVisible = (flag,record) => {
        this.setState({
            ModalVisible: !!flag,
            title:"添加角色",
            value:'',
        });
        if(record!=undefined){
            this.setState({
                value: record,
                title:"编辑角色",
                ModalVisible: !!flag,
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


    //配置权限form
    RoleHandleModalVisible = (flag,record) => {
        this.setState({
            value: record,
            RoleModalVisible: !!flag,
        });
    };
    RoleHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            RoleModalVisible: false,
            value:{},
        });
        this.componentDidMount();
    };
    RoleHandleCancel =(flag)=>{
        this.setState({
            RoleModalVisible: !!flag,
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
                <div className="Badge">
                    <Button type="primary" icon="plus" onClick={() => this.HandleModalVisible(true)}>添加</Button>
                </div>
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={Pagination} loading={this.state.loading}/>
                <CreateForm   ModalVisible={this.state.ModalVisible} title={this.state.title} HandleCancel={this.HandleCancel} value={this.state.value} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
                <RoleForm   RoleModalVisible={this.state.RoleModalVisible}  RoleHandleCancel={this.RoleHandleCancel} value={this.state.value} RoleHandleModalVisible={this.RoleHandleModalVisible} RoleHandleAdd={this.RoleHandleAdd}/>
            </section>
        )
    }
}
export default role

