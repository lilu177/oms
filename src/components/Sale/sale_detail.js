import React from 'react';
import {Row,Col, Button,Form,Input,Select,DatePicker,Upload,Icon,Tabs, Table,InputNumber ,Modal,Alert,Tooltip,message } from 'antd';
import axios from 'axios';
import $ from "jquery";
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;
const confirm = Modal.confirm;
const Search = Input.Search;
const { TextArea } = Input;
const { TabPane } = Tabs;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
//基础信息编辑
class base_form extends React.Component{
    render(){
        const { form,EditBaseEnable } = this.props;
        const onSave = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                EditBaseEnable(fieldsValue);
            });
        };
        return(
            <span>
                <Button  size="small" style={{marginLeft:"8px"}} onClick={EditBaseEnable}>取消</Button >
                <Button  size="small" type="primary" style={{marginLeft:"8px"}} onClick={onSave}>保存</Button >
                <Form hideRequiredMark>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="th">合同编号</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('discount', {
                                             // initialValue:valueText.count,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<Input/>)
                                         }
                                    </FormItem>
                                </td>
                                <td className="th">合同流水号</td>
                                <td colSpan="3"></td>
                            </tr>
                            <tr>
                                <td className="th">合同供方</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('select', {
                                             // initialValue:valueText.title,
                                             rules: [{ required: true, message: '请选择' }],
                                         })(<Select  style={{ width: "100%" }} >
                                             <Option value="jack">Jack</Option>
                                             <Option value="lucy">Lucy</Option>
                                             <Option value="disabled" disabled>Disabled</Option>
                                             <Option value="正在上映的电影-北京">正在上映的电影-北京</Option>
                                         </Select>)}
                                    </FormItem>
                                </td>
                                <td className="th">签订日期</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('input', {
                                             // initialValue:valueText.total,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<DatePicker />)}
                                    </FormItem>
                                </td>
                                <td className="th">签订地点</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                        {form.getFieldDecorator('textArea', {
                                            // initialValue:valueText.total,
                                            rules: [{ required: true, message: '请输入' }],
                                        })(<Input />)}
                                     </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td className="th">合同客户</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('input0', {
                                             // initialValue:valueText.total,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<Select  style={{ width: "100%" }} >
                                             <Option value="jack">Jack</Option>
                                             <Option value="lucy">Lucy</Option>
                                             <Option value="disabled" disabled>Disabled</Option>
                                             <Option value="正在上映的电影-北京">正在上映的电影-北京</Option>
                                         </Select>)}
                                     </FormItem>
                                </td>
                                <td className="th">合同类型</td>
                                <td></td>
                                <td className="th">合同状态</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="th">开票状态</td>
                                <td></td>
                                <td className="th">开票金额</td>
                                <td></td>
                                <td className="th">销账金额</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="th">备注</td>
                                <td colSpan="5">
                                    <FormItem style={{marginBottom:"0px"}}>
                                        {form.getFieldDecorator('Area', {
                                            // initialValue:valueText.total,
                                            rules: [{ required: true, message: '请输入' }],
                                        })(<Input />)}
                                     </FormItem>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </span>
        )
    }
}
const BaseForm=Form.create()(base_form);
//收费信息编辑
class Charge_Form extends React.Component{
    render(){
        const { form,status,ChargeEdit,EditChargeEnable }=this.props;
        const columns = [
            {
                title: '收费项名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '人工计算过程',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '人工收费金额',
                dataIndex: 'address',
                key: 'address',
                align:"right",
            }
        ];
        const data = [
            {
                key: '1',
                name: '工程费',
                age: "32*1",
                address:32,
            }, {
                key: '2',
                name: 'Jim工程费',
                age: 42,
                address:23,
            }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 344,
            }
        ];
        const ChargeOk = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                EditChargeEnable();
            });
        };
        return(
            <Tabs defaultActiveKey="1" size="small">
                <TabPane tab="Tab 1" key="1">
                    <div className="charge_information">
                        <span>订单编号：00001101010</span>
                        {status>1 ? null:
                            <span style={{float:"right"}}>
                                {  ChargeEdit ?
                                  <span>
                                    <Button type="dashed" size="small"  style={{marginRight:"8px"}} onClick={EditChargeEnable}>编辑</Button>
                                    <Button type="dashed" size="small"  style={{marginRight:"8px"}}>重新获取</Button>
                                    <Button type="dashed" size="small">更新结算</Button>
                                  </span>
                                  :
                                  <span>
                                    <Button size="small"  style={{marginRight:"8px"}} onClick={EditChargeEnable}>取消</Button>
                                    <Button type="primary" size="small"  style={{marginRight:"8px"}} onClick={ChargeOk}>保存</Button>
                                  </span>
                                }

                            </span>
                        }
                    </div>
                    <div className="charge_edit">
                        {ChargeEdit ?
                            <span>基材阿诗丹顿多多多多多多多多多多多</span>:
                            <Form>
                                <FormItem style={{marginBottom:"0px"}}>
                                    {
                                        form.getFieldDecorator('TextArea', {
                                            // initialValue:valueText.count,
                                            rules: [{ required: true, message: '请输入' }],
                                        })(<TextArea rows={4} />)
                                    }
                                </FormItem>
                            </Form>
                        }
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                    <div className="charge_information" style={{textAlign:"right"}}>
                        小计：010
                    </div>
                </TabPane>
                <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
                <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                <TabPane tab="Tab 7" key="7">Content of tab 2</TabPane>
                <TabPane tab="Tab 8" key="8">Content of tab 3</TabPane>
                <TabPane tab="Tab 9" key="9">Content of tab 4</TabPane>
                <TabPane tab="Tab 10" key="10">Content of tab 5</TabPane>
                <TabPane tab="Tab 11" key="11">Content of tab 6</TabPane>
                <TabPane tab="Tab 12" key="12">Content of tab 2</TabPane>
                <TabPane tab="Tab 13" key="13">Content of tab 3</TabPane>
                <TabPane tab="Tab 14" key="14">Content of tab 4</TabPane>
                <TabPane tab="Tab 15" key="15">Content of tab 5</TabPane>
                <TabPane tab="Tab 16" key="16">Content of tab 6</TabPane>
                <TabPane tab="Tab 17" key="17">Content of tab 2</TabPane>
                <TabPane tab="Tab 18" key="18">Content of tab 3</TabPane>
                <TabPane tab="Tab 19" key="19">Content of tab 4</TabPane>
                <TabPane tab="Tab 20" key="20">Content of tab 5</TabPane>
                <TabPane tab="Tab 21" key="21">Content of tab 6</TabPane>
            </Tabs>
        )
    }
}
const ChargeForm=Form.create()(Charge_Form);
//结算信息
class Settlement_Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
        const {form,EditSettlementEnable,data,Close,onClose}=this.props;
        const  columns=[
            {
                title: '子订单号',
                dataIndex: 'name',
                width:"10%",
            }, {
                title: '板名',
                dataIndex: 'address',
                width:"20%",
            }, {
                title: '税率',
                dataIndex: 'id',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('id'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(
                                <Select>
                                    <Option value="已含税">已含税</Option>
                                    <Option value="不含税">不含税</Option>
                                    <Option value="disabled" disabled>Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                )
            },{
                title: '优惠类型',
                dataIndex: 'id2',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('id2'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(
                                <Select>
                                    <Option value="优惠类型">优惠类型</Option>
                                    <Option value="优惠类型1">优惠类型1</Option>
                                    <Option value="优惠类型2">优惠类型2</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                )
            }, {
                title: '协议金额',
                dataIndex: 'age',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('age'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(<InputNumber min={0}/>)
                        }
                    </FormItem>
                )
            }, {
                title: '折扣%',
                dataIndex: 'discount',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('discount'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(<InputNumber min={1} max={100} step={1} />)
                        }
                    </FormItem>
                )
            }, {
                title: '减免金额',
                dataIndex: 'money',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('money'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(<InputNumber min={0}/>)
                        }
                    </FormItem>
                )
            }, {
                title: '赊账金额',
                dataIndex: 'id0',
                width:"10%",
                render: (text, record,index) => (
                    <FormItem style={{ margin: 0 }}>
                        {
                            form.getFieldDecorator('id0'+index, {
                                initialValue:text,
                                rules: [{ required: true, message: '请输入' }],
                            })(<InputNumber min={0}/>)
                        }
                    </FormItem>
                )
            },{
                title: '折后金额',
                dataIndex: 'id1',
                width:"10%",
                align:"right"
            }
            ]
        const onSave = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                EditSettlementEnable(fieldsValue);
            });
        };
        const rowSelection = {
            getCheckboxProps: record => ({
                disabled: record.name!='',
                name: record.name,
            }),
        };
        return(
            <span>
                <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={EditSettlementEnable}>取消</Button >
                <Button  size="small" type="primary"style={{marginLeft:"8px"}} onClick={onSave}>保存</Button >
                {
                    Close ?
                        <Alert
                            message="结算信息至少保留一个订单！"
                            type="warning"
                            showIcon
                            closable
                            onClose={onClose}
                            style={{marginBottom:"8px"}}
                        />:null
                }
                <Form>
                    <Table  rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} scroll={{ y: 350 }}/>
                </Form>
            </span>
        )
    }
}
const SettlementForm=Form.create()(Settlement_Form);
//转移
class transfer_Form extends React.Component {
    render(){
        const { ModalVisible, form,  TransferHandleAdd,   TransferHandleModalVisible } = this.props;
        const data=[]
        const Columns=[
            {
                title: '子订单号',
                dataIndex: 'name',
            },{
                title: '产品类型',
                dataIndex: 'name1',
            },{
                title: '下单日期',
                dataIndex: 'name2',
            },{
                title: '客户',
                dataIndex: 'name3',
            },{
                title: '板名',
                dataIndex: 'name4',
            },{
                title: '结算金额',
                dataIndex: 'name5',
            },
        ]
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                TransferHandleAdd(fieldsValue);
            });
        };
        const onCancel = () => {
            form.resetFields();
            TransferHandleModalVisible();
        };
        return (
            <Modal
                title="转移结算单"
                visible={ModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
                width="650px"
            >
                <Form hideRequiredMark className="modal-form">
                    <FormItem  labelCol={{ span: 3}} wrapperCol={{ span: 12 }}  label="合同编号">
                        {form.getFieldDecorator('input', {
                            rules: [{ required: true, message: '请输入' }],
                        })(
                          <Tooltip placement="right" title="查看合同内结算单">
                            <Search
                              onSearch={value => console.log(value)}
                              enterButton
                            />
                          </Tooltip>
                        )}

                    </FormItem>
                    <Table style={{marginBottom:"16px"}} locale={{emptyText:"暂无数据"}} columns={Columns} dataSource={data} size="middle" pagination={false} />
                </Form>
            </Modal>
        )
    }
};
const TransferForm=Form.create()(transfer_Form);
//添加
class Add_Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            expand:false,
            columns: [
                {
                    title: '子订单号',
                    dataIndex: 'name',
                    key: 'name',

                }, {
                    title: '下单日期',
                    dataIndex: 'age',
                    key: 'age',
                }, {
                    title: '下单客户',
                    dataIndex: 'address',
                    key: 'address',
                }, {
                    title: '经手人',
                    key: 'action',
                },{
                    title: '板名',
                    dataIndex: 'name1',
                    key: 'name1',

                }, {
                    title: '商务状态',
                    dataIndex: 'age1',
                    key: 'age1',
                }, {
                    title: '订单状态',
                    dataIndex: 'address1',
                    key: 'address1',
                }, {
                    title: '生产数量1',
                    key: 'action',
                }, {
                    title: '结算金额1',
                    key: 'action',
                }],
            data:[],
        }
    }
    toggle = () => {
        this.setState({
            expand: !this.state.expand,
        });
    };
    render(){
        const {form,AddModalVisible,AddHandleModalVisible}=this.props;
        const handleReset=()=>{
            form.resetFields();
        }
        const handleSearch =(e) => {
            e.preventDefault();
        }
        const okHandle =()=>{
            form.resetFields();
            AddHandleModalVisible();

        }
        const onCancel=()=>{
            form.resetFields();
            AddHandleModalVisible();
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {

            }
        };
        return(
            <Modal
                title="添加"
                visible={AddModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
                width="800px"

            >
                <Form className="search-form"  onSubmit={handleSearch}  style={{padding:"16px 24px"}}>
                    <Row gutter={16}>
                        <Col span={8} className="gutter-row">
                            <FormItem label='产品类型' >
                                {form.getFieldDecorator('no0')(
                                    <Select
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        {children}
                                    </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8} className="gutter-row">
                            <FormItem label='下单客户' >
                                {form.getFieldDecorator('no1')(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    >
                                        {children}
                                    </Select>)}

                            </FormItem>
                        </Col>
                        <Col span={8} className="gutter-row">
                            <FormItem label='子订单号' >
                                {form.getFieldDecorator('no2')(<Input placeholder="请输入" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    { this.state.expand ?
                        <Row gutter={16}>
                            <Col span={8}  className="gutter-row">
                                <FormItem label='板名' >
                                    {form.getFieldDecorator('no3')(<Input placeholder="请输入" />)}
                                </FormItem>
                            </Col>
                            <Col span={8}  className="gutter-row">
                                <FormItem label='下单日期' >
                                    {form.getFieldDecorator('no4')( <DatePicker placeholder="请选择开始" style={{ width: '100%' }}/>)}
                                </FormItem>
                            </Col>
                            <Col span={8}  className="gutter-row">
                                <FormItem label='下单日期'>
                                    {form.getFieldDecorator('no5')( <DatePicker placeholder="请选择结束" style={{ width: '100%' }}/>)}
                                </FormItem>
                            </Col>
                            <Col span={8}  className="gutter-row">
                                <FormItem label='商务状态' >
                                    {form.getFieldDecorator('no1')(
                                        <Select
                                            mode="multiple"
                                            placeholder="请选择"
                                            style={{ width: '100%' }}
                                        >
                                            {children}
                                        </Select>)}
                                </FormItem>
                            </Col>
                        </Row>:null
                    }
                    <Row gutter={16}>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button size="small" type="primary"  htmlType="submit" icon="search">查询</Button>
                            <Button size="small" style={{ marginLeft: 8 }} onClick={handleReset} icon="reload /" >
                                重置
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                展开 <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
                <Table columns={this.state.columns} dataSource={this.state.data}  locale={{emptyText:"暂无数据"}}  rowSelection={rowSelection} style={{marginBottom:"16px"}}/>
            </Modal>
        )
    }
}
const AddForm=Form.create()(Add_Form);
//底部工具栏模态框
class Tool_Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        const {form,ToolModalVisible,ToolHandleModal,title,OkToolHandleModal}=this.props
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                OkToolHandleModal(title,false);
            });
        };
        const onCancel = () => {
            form.resetFields();
            ToolHandleModal(title,false);
        };
        const content = () => {
            if(title=="作废") {
                return (
                    <FormItem label="作废理由" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} >
                        {form.getFieldDecorator('input', {
                            rules: [{required: true, message: '请输入'}],
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>
                )
            }else if(title=="终止"){
                return (
                    <FormItem label="终止理由" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} >
                        {form.getFieldDecorator('input', {
                            rules: [{required: true, message: '请输入'}],
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>
                )
            }else if(title=="导出" || title=="预览"){
                return (
                    <FormItem label="合同模板" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} >
                        {form.getFieldDecorator('input', {
                            rules: [{required: true, message: '请输入'}],
                        })(
                            <Select>
                                <Option value="已含税">已含税</Option>
                                <Option value="不含税">不含税</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        )}
                    </FormItem>
                )
            }else if(title=="签订"){
                return (
                    <FormItem label="签订日期" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} >
                        {form.getFieldDecorator('input', {
                            rules: [{required: true, message: '请输入'}],
                        })(
                            <DatePicker />
                        )}
                    </FormItem>
                )
            }else{

            }
        }
        return(
            <Modal
                title={title}
                visible={ToolModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <Form hideRequiredMark style={{padding:"24px 16px"}}>
                    {content()}
                </Form>
            </Modal>
        )
    }
}
const ToolForm=Form.create()(Tool_Form);


class sale_detail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            status: 0,//0--创建，1--变更 ,2--审核，3--生效，，4--转换，作废，终止
            baseEdit: true,//基础信息编辑
            ChargeEdit: true,//收费信息
            settlementEdit: true,//结算信息
            disabled: true,//结算信息转移、删除
            columns: [
                {
                    title: '子订单号',
                    dataIndex: 'name',
                    width:"10%",
                }, {
                    title: '板名',
                    dataIndex: 'address',
                    width:"20%",
                }, {
                    title: '税率',
                    dataIndex: 'id',
                    width:"10%",
                },{
                    title: '优惠类型',
                    dataIndex: 'id2',
                    width:"10%",
                }, {
                    title: '协议金额',
                    dataIndex: 'age',
                    width:"10%",
                    align:"right",
                },{
                    title: '折扣%',
                    dataIndex: 'discount',
                    width:"10%",
                    align:"right",
                }, {
                    title: '减免金额',
                    dataIndex: 'money',
                    width:"10%",
                    align:"right",
                }, {
                    title: '赊账金额',
                    dataIndex: 'id0',
                    width:"10%",
                    align:"right",
                },{
                    title: '折后金额',
                    dataIndex: 'id1',
                    width:"10%",
                    align:"right",
                }
            ],//结算信息列表
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    id:"已含税",
                    discount: 12,
                    money: 13,
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型",
                }, {
                    key: '2',
                    name: 'John Bro1wn',
                    age: 132,
                    address: 'New Yo221rk No. 1 Lake Park',
                    discount: 112,
                    money: 113,
                    id:"已含税",
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型",
                },{
                    key: '3',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    discount: 12,
                    money: 13,
                    id:"已含税",
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型",
                }, {
                    key: '4',
                    name: 'John Bro1wn',
                    age: 132,
                    address: 'New Yo221rk No. 1 Lake Park',
                    discount: 112,
                    money: 113,
                    id:"已含税",
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型",
                },{
                    key: '5',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    discount: 12,
                    money: 13,
                    id:"已含税",
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型2",
                }, {
                    key: '6',
                    name: 'John Bro1wn',
                    age: 132,
                    address: 'New Yo221rk No. 1 Lake Park',
                    discount: 112,
                    money: 113,
                    id:"不含税",
                    id0: 10,
                    id1: 10,
                    id2: "优惠类型1",
                }
            ],//结算信息数据
            Close:true,//结算信息提示
            ModalVisible:false,//转移form
            AddModalVisible:false,//添加form
            ToolModalVisible:false,//工具栏模态
            title:"",
        }

    }
    componentDidMount() {
        var self = this;
        axios({
            method:"POST",
            url:"/v2/movie/in_theaters",
        }).then(function(response){

        }).catch(function(data){

        });
    }
    //------------------------------------------------基础信息-----------------------------------------------------------------
    BaseEdit =()=>{
        return(
            <span>
                {this.state.status>1 ? null:
                    <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={this.EditBaseEnable}>编辑</Button >
                }
                 <table className="table">
                     <tbody>
                          <tr>
                              <td className="th">合同编号</td>
                              <td></td>
                              <td className="th">合同流水号</td>
                              <td colSpan="3"></td>
                          </tr>
                          <tr>
                              <td className="th">合同供方</td>
                              <td></td>
                              <td className="th">签订日期</td>
                              <td></td>
                              <td className="th">签订地点</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td className="th">合同客户</td>
                              <td></td>
                              <td className="th">合同类型</td>
                              <td></td>
                              <td className="th">合同状态</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td className="th">开票状态</td>
                              <td></td>
                              <td className="th">开票金额</td>
                              <td></td>
                              <td className="th">销账金额</td>
                              <td></td>
                          </tr>
                     </tbody>
                 </table>
            </span>
        )
    }
    BaseEnable=()=>{
        return(
            <BaseForm EditBaseEnable={this.EditBaseEnable}/>
        )
    }
    EditBaseEnable =()=>{
        this.setState({
            baseEdit: !this.state.baseEdit
        })

    }
    HandelBaseEdit =()=>{
        return this.state.baseEdit ? this.BaseEdit() : this.BaseEnable();
    }
    //------------------------------------------------合同信息-----------------------------------------------------------------
    HandleContract=()=>{
        return(
            <table className="table">
                <tbody>
                <tr>
                    <td className="th">折扣</td>
                    <td></td>
                    <td className="th">税率</td>
                    <td ></td>
                    <td className="th">总减免金额</td>
                     <td ></td>
                </tr>
                <tr>
                    <td className="th">总赊账金额</td>
                    <td></td>
                    <td className="th">剩余赊账金额</td>
                    <td></td>
                    <td className="th">总金额</td>
                    <td></td>
                </tr>
                <tr>
                    <td className="th">创建日期</td>
                    <td></td>
                    <td className="th">创建人员</td>
                    <td></td>
                    <td className="th">审核日期</td>
                    <td></td>
                </tr>
                <tr>
                    <td className="th">审核人员</td>
                    <td></td>
                    <td className="th"></td>
                    <td></td>
                    <td className="th"></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        )
    }
    //------------------------------------------------供需方信息-----------------------------------------------------------------
    SupplyAndDemand=()=>{
        return(
            <table className="table">
                <tbody>
                    <tr>
                        <td className="th"></td>
                        <td className="th">供方</td>
                        <td className="th">需方</td>
                    </tr>
                    <tr>
                        <td className="th">单位名称</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">单位地址</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">法定代表人</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">委托代理人</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">电话</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">电报挂号</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">开户银行</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">账号</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="th">邮政编码</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
    //------------------------------------------------资料上传-----------------------------------------------------------------
    UploadEnable=()=>{
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            defaultFileList: [{
                uid: 1,
                name: 'xxx.png',
                status: 'done',
                reponse: 'Server Error 500', // custom error message to show
            }, {
                uid: 2,
                name: 'yyy.png',
                status: 'done',
            }, {
                uid: 3,
                name: 'zzz.png',
                status: 'error',
                reponse: 'Server Error 500', // custom error message to show

            }],

        };
        return(
            <Dragger {...props}>
                { this.state.status>1 ? null:
                   <div>
                       <p className="ant-upload-drag-icon" style={{display:"inline-block",verticalAlign:"middle",marginBottom:"0px"}}>
                           <Icon type="inbox" />
                       </p>
                       <p className="ant-upload-text"  style={{display:"inline-block",verticalAlign:"middle"}}>点击或将文件拖拽到这里上传</p>
                   </div>
                }
            </Dragger>
        )
    }
    //------------------------------------------------收费信息-----------------------------------------------------------------
    ChargeEdit =()=>{
        return(
            <ChargeForm status={this.state.status} ChargeEdit={this.state.ChargeEdit} EditChargeEnable={this.EditChargeEnable}/>
        )
    }
    EditChargeEnable =()=>{
        this.setState({
            ChargeEdit: !this.state.ChargeEdit
        })
    }
    //------------------------------------------------结算信息-----------------------------------------------------------------
    //编辑
    EditSettlementEnable =()=>{
        this.setState({
            settlementEdit: !this.state.settlementEdit
        })

    }
    SettlementEdit =()=>{
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                if(selectedRows.length==this.state.data.length ||selectedRows.length==0 ||this.state.data.length==1){
                    this.setState({
                        disabled:true,
                    })
                }else{
                    this.setState({
                        disabled:false,
                    })
                }
            },
        };
        return(
            <span>
                {this.state.status>1 ? null:
                    <span>
                        <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={this.EditSettlementEnable}>编辑</Button>
                        <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={()=>this.AddHandleModalVisible(true)}>添加</Button>
                        <Button  size="small" type="dashed" style={{marginLeft:"8px"}} disabled={this.state.disabled} onClick={()=>this.TransferHandleModalVisible(true)}>转移</Button>
                        <Button  size="small" type="dashed" style={{marginLeft:"8px"}} disabled={this.state.disabled} onClick={this.SettlementDelete}>删除</Button>
                    </span>
                }
                {
                    this.state.Close ?
                        <Alert
                            message="结算信息至少保留一个订单！"
                            type="warning"
                            showIcon
                            closable
                            onClose={this.onClose}
                            style={{marginBottom:"8px"}}
                        />:null
                }

                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={false} scroll={{ y: 350 }}/>
            </span>
        )
    }
    SettlementEnable=()=>{
        return(
            <SettlementForm disabled={this.state.disabled} data={this.state.data} EditSettlementEnable={this.EditSettlementEnable} Close={this.state.Close} onClose={this.onClose}/>
        )
    }
    HandelSettlementEdit =()=>{
        return this.state.settlementEdit ? this.SettlementEdit() : this.SettlementEnable();
    }
    onClose=()=>{
        this.setState({
            Close:!this.state.Close,
        })
    }
    //删除
    SettlementDelete=()=>{
        confirm({
            title: '你确认删除这些吗?',
            content: '',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //转移
    TransferHandleAdd=()=>{
        message.success('This is a message of success');
        this.TransferHandleModalVisible()
    }
    TransferHandleModalVisible=(flag)=>{
        this.setState({
            ModalVisible:!!flag,
        })
    }
    //添加
    AddHandleModalVisible=(flag)=>{
        this.setState({
            AddModalVisible:!!flag,
        })
    }
    //------------------------------------------底部工具栏------------------------------------------------------------------
    JudgeStatus =()=>{
        if(this.state.status==0){
            return(
                <div className="foot">
                    <Button style={{marginLeft:"32px"}} onClick={()=>this.JudgeLocation(2)}>审核</Button>
                    <Button type="danger" style={{marginLeft:"8px"}} onClick={()=>this.ToolHandleModal("作废",true)}>作废</Button>
                    <Button style={{marginLeft:"8px"}} onClick={()=>this.ToolHandleModal("预览",true)}>预览</Button>
                    <Button style={{marginLeft:"8px"}} onClick={()=>this.ToolHandleModal("导出",true)}>导出</Button>
                </div>
            )
        }else if(this.state.status==1){
            return(
                <div className="foot">
                    <Button  style={{marginLeft:"32px"}} onClick={()=>this.ToolHandleModal("签订",true)}>签订</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("预览",true)}>预览</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("导出",true)}>导出</Button>
                </div>
            )
        }else if(this.state.status==2){
            return(
                <div className="foot">
                    <Button  style={{marginLeft:"32px"}} onClick={()=>this.JudgeLocation(0)}>修改</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("签订",true)}>签订</Button>
                    <Button  type="danger" style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("作废",true)}>作废</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("预览",true)}>预览</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("导出",true)}>导出</Button>
                </div>
            )

        }else if(this.state.status==3){
            return(
                <div className="foot">
                    <Button  style={{marginLeft:"32px"}} onClick={()=>this.JudgeLocation(4)}>转化</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.JudgeLocation(1)}>变更</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("终止",true)}>终止</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("预览",true)}>预览</Button>
                    <Button  style={{marginLeft:"8px"}}  onClick={()=>this.ToolHandleModal("导出",true)}>导出</Button>
                </div>
            )
        }else{}
    }
    JudgeLocation=(key)=>{
        this.setState({
            status:key
        })
    }
    ToolHandleModal=(key,flag)=>{
        this.setState({
            title:key,
            ToolModalVisible:!!flag,
        })
    }
    OkToolHandleModal=(key,flag)=>{
        this.setState({
            ToolModalVisible:!!flag,
        })
        if(key=="作废" || key=="终止"){
            this.setState({
                status:4
            })
        }else{
            message.success("预览导出成功!");
        }
    }
    render(){
        return(
            <section style={{marginTop:"1px"}}>
                <div className="detail_title">合同详情</div>
                <section className="content list">
                    <div className="content_detail">
                        <h className="title">基础信息</h>
                        {this.HandelBaseEdit()}
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">收费信息</h>
                        {this.ChargeEdit()}
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">结算信息</h>
                        {this.HandelSettlementEdit()}
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">合同信息</h>
                        {this.HandleContract()}
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">供需方信息</h>
                        {this.SupplyAndDemand()}
                    </div>
                    <div className="content_detail"  style={{marginTop:"16px",marginBottom:"16px"}}>
                        <h className="title">资料上传</h>
                        {this.UploadEnable()}
                    </div>
                </section>
                {this.state.status!=4 ?
                    this.JudgeStatus():null
                }
                <TransferForm ModalVisible={this.state.ModalVisible } TransferHandleAdd={this.TransferHandleAdd} TransferHandleModalVisible={this.TransferHandleModalVisible}/>
                <AddForm AddModalVisible={this.state.AddModalVisible } AddHandleModalVisible={this.AddHandleModalVisible}/>
                <ToolForm ToolModalVisible={this.state.ToolModalVisible} ToolHandleModal={this.ToolHandleModal} title={this.state.title} OkToolHandleModal={this.OkToolHandleModal}/>
            </section>
        )
    }
}
export default sale_detail
