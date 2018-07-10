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
    const columns = [{
        title: '销售部门',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '查看权限',
        dataIndex: 'age',
        key: 'age',
        render: (text, record) =>{
            if(text==1){
                return(
                    <Switch size="small" defaultChecked />
                )
            }else {
                return(
                    <Switch size="small"  />
                )
            }

        }
    }, {
        title: '操作权限',
        dataIndex: 'address',
        key: 'address',
        render: (text, record) =>{
            if(text==1){
                return(
                    <Switch size="small" defaultChecked />
                )
            }else {
                return(
                    <Switch size="small"  />
                )
            }
        }
    }];
    const data = [{
        key: '1',
        name: 'John Brown',
        age: 0,
        address: 1,
    }, {
        key: '2',
        name: 'Jim Green',
        age: 0,
        address: 1,
    }, {
        key: '3',
        name: 'Joe Black',
        age: 1,
        address: 0,
    }];
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
                {form.getFieldDecorator('desc', {

                })(
                  <Checkbox.Group style={{ width: '100%' }} >
                    <span  style={{marginBottom:"8px",marginRight:"8px",display:"block"}}>审核权限</span>
                    <Row>
                      <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                      <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                      <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                      <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                      <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                    </Row>
                    <span  style={{marginBottom:"8px",marginTop:"8px",display:"block"}}>操作权限</span>
                    <Row>
                      <Col span={8}><Checkbox value="AA">A</Checkbox></Col>
                      <Col span={8}><Checkbox value="BB">B</Checkbox></Col>
                      <Col span={8}><Checkbox value="CC">C</Checkbox></Col>
                      <Col span={8}><Checkbox value="DD">D</Checkbox></Col>
                      <Col span={8}><Checkbox value="EE">E</Checkbox></Col>
                    </Row>
                    {/*<Table columns={columns} dataSource={data} size="middle" pagination={false}/>*/}
                  </Checkbox.Group>

                )}

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
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='姓名' >
                            {getFieldDecorator('no2')(<Input placeholder="请输入" />)}
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


class sales_department extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '用户名',
                    width: '10%',
                    dataIndex: 'id',
                    key:"id",
                },
                {
                    title: '姓名',
                    width: '10%',
                    dataIndex: 'name',
                    key:"name",
                },{
                    title: '部门',
                    width: '10%',
                    dataIndex: 'enable',
                    key:"enable",

                },{
                    title: '小组',
                    width: '10%',
                    dataIndex: 'team',
                    key:"team",

                },{
                    title: '对应销售部门(审核权限)',
                    width: '20%',
                    dataIndex: 'role',
                    key:"role",

                },{
                    title: '对应销售部门(操作权限)',
                    width: '20%',
                    dataIndex: 'view',
                    key:"view",

                },{
                    title: '已赋角色',
                    width: '10%',
                    dataIndex: 'user',
                    key:"user",

                },{
                    title: '操作',
                    width: '10%',
                    dataIndex: 'key',
                    key:"key",
                    render: (text, record) =>{
                        return(
                            <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>配置销售部门</a>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"配置销售部门"
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
                title:"配置销售部门",
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
                <TableForm TableRefresh={this.TableRefresh}/>
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={Pagination} loading={this.state.loading}/>
                <CreateForm   ModalVisible={this.state.ModalVisible} title={this.state.title} HandleCancel={this.HandleCancel} value={this.state.value} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
            </section>
        )
    }
}
export default sales_department

