import React from 'react';
import {Table, Icon ,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip,Checkbox} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={"客户 "+ i}>{"客户 "+ i}</Option>);
}
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
    const onChange =  (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
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
                <FormItem>
                    {form.getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                            <Row>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="1" checked={true}>商务人员商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="2">商务人员经理</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="3">商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="4">商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="5">商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="6">商务人员商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="7">商务人员经理</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="8">商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="9">商务人员</Checkbox></Col>
                                <Col span={8} style={{marginBottom:"16px"}}><Checkbox value="10">商务人员</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>,
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});
//查询form
class Table_Form extends React.Component{
    render(){
        const { TableRefresh } = this.props;
        const { getFieldDecorator, } = this.props.form;
        const handleSearch =(e) => {
            e.preventDefault();
        }
        const handleReset = () => {
            this.props.form.resetFields();
            TableRefresh()
        }
        return(
            <Form className="search-form"  onSubmit={handleSearch}>
                <Row gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='姓名' >
                            {getFieldDecorator('no2')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='部门' >
                            {getFieldDecorator('no1')(<Select
                                placeholder="请选择"
                                style={{ width: '100%' }}
                            >
                                {children}
                            </Select>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='角色' >
                            {getFieldDecorator('no0')(
                                <Select placeholder="请选择"  style={{ width: '100%' }}>
                                    {children}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Button type="primary" htmlType="submit" icon="search">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleReset} icon="reload /" >
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const TableForm = Form.create()(Table_Form);


class user extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '用户名',
                    width: '18%',
                    dataIndex: 'id',
                    key:"id",
                },
                {
                    title: '姓名',
                    width: '18%',
                    dataIndex: 'name',
                    key:"name",
                },{
                    title: '部门',
                    width: '18%',
                    dataIndex: 'enable',
                    key:"enable",

                },{
                    title: '小组',
                    width: '18%',
                    dataIndex: 'team',
                    key:"team",

                },{
                    title: '已赋角色',
                    width: '18%',
                    dataIndex: 'role',
                    key:"role",

                },{
                    title: '操作',
                    width: '10%',
                    dataIndex: 'key',
                    key:"key",
                    render: (text, record) =>{
                        return(
                            <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>配置角色</a>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"配置角色"
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
              "id":"用户名"+i,
              "name":"姓名"+i,
              "enable":"部门"+i,
              'team':"小组"+i,
              "role":"商务人员1,商务人员2,",
            })
          }else{
            data.push({
              "key":i,
              "id":"用户名"+i,
              "name":"姓名"+i,
              "enable":"部门"+i,
              'team':"小组"+i,
              "role":"商务人员3",
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
        // }).then(function(response){
        //     var data=self.state.list;
        //     for(var i=0;i<30;i++){
        //         if(i%2==0){
        //             data.push({
        //                 "key":i,
        //                 "id":"用户名"+i,
        //                 "name":"姓名"+i,
        //                 "enable":"部门"+i,
        //                 'team':"小组"+i,
        //                 "role":"商务人员1,商务人员2,",
        //             })
        //         }else{
        //             data.push({
        //                 "key":i,
        //                 "id":"用户名"+i,
        //                 "name":"姓名"+i,
        //                 "enable":"部门"+i,
        //                 'team':"小组"+i,
        //                 "role":"商务人员3",
        //             })
        //         }
        //
        //     }
        //     self.setState({
        //         list: data,
        //         loading: false,
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
    }
  TableRefresh=()=> {
    this.componentDidMount();
  }
    //添加form
    HandleModalVisible = (flag,record) => {
        if(record!=undefined){
            this.setState({
                value: record,
                title:"配置角色",
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
                <TableForm componentDidMount={this.componentDidMount}/>
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={Pagination} loading={this.state.loading}/>
                <CreateForm   ModalVisible={this.state.ModalVisible} title={this.state.title} HandleCancel={this.HandleCancel} value={this.state.value} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
            </section>
        )
    }
}
export default user

