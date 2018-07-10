import React from 'react';
import {Table, Icon ,Divider,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker,Upload, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={"客户 "+ i}>{"客户 "+ i}</Option>);
}


//创建form
class Create_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render(){
        const {  ModalVisible, form, HandleAdd ,value,title,HandleCancel,fileList,upload,handleChange,type,HandleSelectChange} =this. props;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                if(fileList.length==0){
                  message.error("请先上传文件");
                  return;
                }
                form.resetFields();
                HandleAdd(fieldsValue);
            });
        };
        const onCancel = () => {
            form.resetFields();
            HandleCancel();
        };
        const Change = (value) => {
            HandleSelectChange(value);
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
                    <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板类型">
                        {form.getFieldDecorator('id', {
                            initialValue:value.id,
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <Select placeholder="请选择" onChange={Change}>
                                <Option value="同步标准模板">同步标准模板</Option>
                                <Option value="客户合同模板">客户合同模板</Option>
                            </Select>
                        )}
                    </FormItem>
                    {   type!="客户合同模板" ? null :
                        <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="适用客户">
                            {   value.index!='' ?
                                form.getFieldDecorator('index', {
                                    initialValue:value.index,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                <Select
                                    mode="multiple"
                                    placeholder="请选择"
                                    style={{ width: '100%' }}
                                >
                                    {children}
                                </Select>
                                ) :
                                form.getFieldDecorator('index', {
                                    //initialValue:value.index,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        {children}
                                    </Select>
                                )
                            }

                        </FormItem>
                    }
                    <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板名称">
                        {form.getFieldDecorator('name', {
                            initialValue:value.name,
                            rules: [{ required: true, message: '请输入' }],
                        })(  <Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板文件">
                        <Upload {...upload} fileList={fileList} onChange={handleChange}>
                            {fileList.length >= 1 ? null :
                                <Button>
                                    <Icon type="upload" /> 选择文件
                                </Button>
                            }
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const CreateForm = Form.create()(Create_Form);
//查询form
class Table_Form extends React.Component{
    render(){
        const { componentDidMount } = this.props;
        const { getFieldDecorator, } = this.props.form;
        const handleSearch =(e) => {
            e.preventDefault();
        }
        const handleReset = () => {
            this.props.form.resetFields();
            componentDidMount()
        }
        return(
            <Form className="search-form"  onSubmit={handleSearch}>
                <Row gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='模板类型' >
                            {getFieldDecorator('no0')(
                                <Select placeholder="请选择" >
                                    <Option value="同步标准模板">同步标准模板</Option>
                                    <Option value="客户合同模板">客户合同模板</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='适用客户' >
                            {getFieldDecorator('no1')(<Select
                                mode="multiple"
                                placeholder="请选择"
                                style={{ width: '100%' }}
                            >
                                {children}
                            </Select>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='模板名称' >
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




class contract_template extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            list:[],
            columns:[
                {
                    title: '模板类型',
                    width: '20%',
                    dataIndex: 'id',
                    key:"id",
                },{
                    title: '适用客户',
                    width: '25%',
                    dataIndex: 'index',
                    key:"index",
                },{
                    title: '合同模板名称',
                    width: '20%',
                    dataIndex: 'name',
                    key:"name",
                },{
                    title: '是否启用',
                    width: '20%',
                    dataIndex: 'enable',
                    key:"enable",
                    render: (text, record) =>{
                        if(record.enable!=0){
                            return (
                                <Switch size="small" checkedChildren={<Icon type="check" />} onClick={()=>this.HandleEnable(record.id)}  unCheckedChildren={<Icon type="cross" />} />
                            )
                        }else{
                            return (
                                <Switch size="small" checkedChildren={<Icon type="check" />} onClick={()=>this.HandleEnable(record.id)}  unCheckedChildren={<Icon type="cross" />} defaultChecked />
                            )
                        }

                    }
                },{
                    title: '操作',
                    width: '20%',
                    dataIndex: 'key',
                    key:"key",
                    render: (text, record) =>{
                        return(
                            <span>
                                <a href="javascript:;" onClick={() => this.HandleModalVisible(true,record)}>编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" >下载</a>
                            </span>
                        )
                    }
                }
            ],
            ModalVisible:false,
            value:{},
            title:"",
            fileList: [ {
                uid: 1,
                name: 'xxx.png',
                status: 'done',
                reponse: 'Server Error 500', // custom error message to show
                url: 'http://www.baidu.com/xxx.png',
            }],
            disabled:false,
            type:"",
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
            "id":"同步标准模板",
            "index":"",
            "name":"合同模板名称"+i,
            "enable":0,
            "id0":"模板文件"+i
          })
        }else{
          data.push({
            "key":i,
            "id":"客户合同模板",
            "index":"客户"+i,
            "name":"合同模板名称"+i,
            "enable":1,
            "id0":"模板文件"+i
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
        //     var data=self.state.list;
        //     for(var i=0;i<30;i++){
        //         if(i%2==0){
        //             data.push({
        //                 "key":i,
        //                 "id":"同步标准模板",
        //                 "index":"",
        //                 "name":"合同模板名称"+i,
        //                 "enable":0,
        //                 "id0":"模板文件"+i
        //             })
        //         }else{
        //             data.push({
        //                 "key":i,
        //                 "id":"客户合同模板",
        //                 "index":"客户"+i,
        //                 "name":"合同模板名称"+i,
        //                 "enable":1,
        //                 "id0":"模板文件"+i
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
            title:"添加合同模板",
            disabled:false,
            value:[],
            fileList: [],
        });
        if(record!=undefined){
            this.setState({
                value: record,
                title:"编辑合同模板",
                disabled:true,
                type:record.id,
                fileList: [ {
                    uid: 1,
                    name: 'xxx.png',
                    status: 'done',
                    reponse: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/xxx.png',
                }]
            });
        }
    };
    HandleAdd = fields => {
      message.success('添加成功');
      this.setState({
        ModalVisible: false,
        value:{},
        fileList:[],
        type:""
      });
    };
    HandleCancel =(flag)=>{
        this.setState({
            ModalVisible: !!flag,
            value:{},
            type:"",
        });
    }
    HandleEnable=(id)=>{
        message.success('设置成功');
        this.componentDidMount();
    }
    HandleSelectChange =(value)=>{
        this.setState({
            type:value,
        });
    }
    //上传
    handleChange = ({ fileList }) => {
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        message.error("上传错误")
        return true;
      });
      this.setState({ fileList })
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
        //上传
        const upload = {
            action:"//jsonplaceholder.typicode.com/posts/"
        };
        const parentMethods = {
            HandleCancel:this.HandleCancel,
            HandleModalVisible:this.HandleModalVisible,
            HandleAdd:this.HandleAdd,
            upload:upload,
            handleChange:this.handleChange,
            HandleSelectChange:this.HandleSelectChange,
        };
        return(
            <section className="content">
                <TableForm componentDidMount={this.componentDidMount}/>
                <div className="Badge">
                    <Button type="primary" icon="plus" onClick={() => this.HandleModalVisible(true)}>添加</Button>
                </div>
                <Table size="middle" locale={{emptyText:"暂无数据"}}  columns={this.state.columns} dataSource={this.state.list}   pagination={Pagination} loading={this.state.loading}/>
                <CreateForm {...parentMethods} value={this.state.value} type={this.state.type} fileList={this.state.fileList} ModalVisible={this.state.ModalVisible} title={this.state.title} />
            </section>
        )
    }
}
export default contract_template

