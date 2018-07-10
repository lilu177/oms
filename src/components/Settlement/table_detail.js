import React from 'react';
import { Row,Col,Table,Button ,Input,Popconfirm,Badge,message,InputNumber,Modal,Form,Select,Checkbox,Divider,Icon,Tooltip,Tabs,Popover,List,Switch,Radio,Tree  } from 'antd';
import axios from 'axios';
import $ from "jquery"
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


//人工结算form
const ArtificialForm = Form.create()(props => {
    const { ArtificialModalVisible, form, ArtificialHandleAdd, ArtificialHandleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            $("#ArtificialContent").html("")
            form.resetFields();
            ArtificialHandleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
        $("#ArtificialContent").html("")
        ArtificialHandleModalVisible();
    };
    const onChange =(value) => {
        console.log(value)
        $("#ArtificialContent").html("")
        var str=""
        str+="<div>报价协议编号：89320003203</div>"
        str+="<div>报价协议备注：89320003203备注备注备注</div>"
        $("#ArtificialContent").html(str)
    };
    return (
        <Modal
            title="选择报价协议"
            visible={ArtificialModalVisible}
            cancelText="取消"
            okText="确定"
            onOk={okHandle}
            onCancel={onCancel}
        >
            <Form hideRequiredMark>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="报价协议">
                    {form.getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请选择' }],
                    })( <Select
                        showSearch
                        placeholder="请选择"
                        style={{ width: '100%' }}
                        onChange={onChange}
                    >
                        {children}
                    </Select>)}
                </FormItem>
            </Form>
            <div id="ArtificialContent" style={{ marginLeft:"30px"}}></div>
        </Modal>
    );
});
//拆分结算单form
class Split_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }
    render(){
        const { SplitModalVisible, form, SplitHandleAdd, SplitHandleModalVisible } = this.props;
        const SplitColumns = [
            {
                title: '拆分后结算单',
                width: '30%',
                dataIndex: 'id',
                key:"id",
            }, {
                title: '生产数量set',
                width: '35%',
                dataIndex: 'original_title',
                key:"original_title",
                render: () => <InputNumber min={0} max={10} />
            }, {
                title: '生产数量pcs',
                width: '35%',
                dataIndex: 'collect_count',
                key:"collect_count",
                render: () => <InputNumber min={0} max={10} />
            }
        ]
        const SplitColumns1 = [
            {
                title: '收费项',
                width: '20%',
                dataIndex: 'id',
                key:"id"
            }, {
                title: '计算方式',
                width: '20%',
                dataIndex: 'original_title',
                key:"original_title",
                render: () =>
                    <Select defaultValue="lucy" style={{ width: "120px" }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
            }, {
                title: '选择拆分结算单',
                width: '40%',
                dataIndex: 'collect_count',
                key:"collect_count",
                render: () =>
                    <Select defaultValue="lucy" style={{ width: "120px" }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
            }
        ]
        const data1=[
            {
                "id": "收费1"
            },{
                "id":"收费qee"
            },{
                "id": "收费ewe1"
            },{
                "id":"收费qewwe"
            },{
                "id":"收费qqqewwe"
            }

        ]
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                this.setState({
                    data:[],
                })
                SplitHandleAdd(fieldsValue);
            });
        };
        const onCancel = () => {
            form.resetFields();
            this.setState({
                data:[],
            })
            SplitHandleModalVisible();
        };
        const pagination=false;
        const onChange= (value) => {
            var data_list=this.state.data
            data_list.splice(0,data_list.length);//清空数组
            for (let i = 0; i < value; i++) {
                data_list.push({
                    key: i.toString(),
                    id:"结算单"+(i+1)+"",
                });
            }
            this.setState({
                data:data_list,
            })
        };
        return (
            <Modal
                title="拆分结算单"
                visible={SplitModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <form className="modal-form">
                    <FormItem  labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="拆分结算单数量">
                        <InputNumber min={0} max={10} step={1} placeholder="请输入拆分结算单数量" onChange={onChange} style={{ width:"280px" }} className="distance"/>
                    </FormItem>
                    <div id="split_table" style={{marginBottom:"12px"}}>
                        <Table locale={{emptyText:"暂无数据"}} columns={SplitColumns} dataSource={this.state.data} size="middle" pagination={pagination}  title={() => '拆分后生产数量（生产数量set：0     生产数量pcs：10）'}/>
                    </div>
                    <Table locale={{emptyText:"暂无数据"}} columns={SplitColumns1} dataSource={data1} size="middle" pagination={pagination} title={() => '收费项计算规则'}/>
                </form>
            </Modal>
        );
    }
};
const SplitForm = Form.create()(Split_Form);
//收费信息添加form
class MoneyForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render(){
        const { FormModalVisible, form, AddHandle, AddHandleModalVisible} = this.props;
        const { getFieldDecorator } = this.props.form;
        const okHandle = (e) => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                e.preventDefault();
                console.log('data of form:',this.props.form.getFieldsValue());//获取表单数据
                let json=this.props.form.getFieldsValue()
                form.resetFields();
                AddHandle(json);
            });
        };
        const onCancel = () => {
            form.resetFields();
            this.setState({
                data:[],
            })
            AddHandleModalVisible();
        };
        return (
            <Modal
                title="添加收费项"
                visible={FormModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <Form className="modal-form" hideRequiredMark >
                    <FormItem  labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="收费项名称">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入收费项名称',
                                },
                            ],
                        })(<Input placeholder="请输入"  style={{ width:"280px" }}/>)}
                    </FormItem>
                    <FormItem  labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="人工计算过程">
                        {getFieldDecorator('process', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入人工计算过程',
                                },
                            ],
                        })(<Input  placeholder="请输入"  style={{ width:"280px" }} />)}
                    </FormItem>
                    <FormItem  labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="人工收费项金额">
                        {getFieldDecorator('money', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入人工收费项金额',
                                },
                            ],
                        })(<InputNumber min={0} placeholder="请输入"  style={{ width:"280px"}} />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const AddForm=Form.create()(MoneyForm);
//收费信息编辑form
class Edit_MoneyForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value:1,
        };
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render(){
        const { EditFormModalVisible, form, EditAddHandle, EditHandleModalVisible,EditFormValue} = this.props;
        const { getFieldDecorator } = this.props.form;
        const okHandle = (e) => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                e.preventDefault();
                console.log('data of form:',this.props.form.getFieldsValue());//获取表单数据
                let json=this.props.form.getFieldsValue()
                form.resetFields();
                EditAddHandle(json);
            });
        };
        const onCancel = () => {
            form.resetFields();
            EditHandleModalVisible();
        };
        return (
            <Modal
                title="编辑收费项"
                visible={EditFormModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <Form className="modal-form" hideRequiredMark >
                    <FormItem label="收费项名称" style={{display: "flex"}}>
                        {getFieldDecorator('title', {
                            initialValue:EditFormValue.id,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入收费项名称',
                                },
                            ],
                        })(<Input placeholder="请输入"  style={{ width:"280px" }} />)}
                    </FormItem>
                    <FormItem>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio style={{display: 'block'}} value={1}>
                                按系统计算
                                <FormItem>
                                    {
                                        this.state.value >1 &&
                                        <span>Max[&nbsp;&nbsp;(300*<Input  placeholder="请输入" disabled style={{ width:"80px" }} />),<Input  placeholder="请输入" disabled style={{ width:"80px" }} />&nbsp;&nbsp;]*5</span>
                                    }
                                    {
                                        this.state.value <2 &&
                                        getFieldDecorator('process', {
                                            initialValue:EditFormValue.original_title1,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入人工计算过程',
                                                },
                                            ],
                                        })(<span>Max[&nbsp;&nbsp;(300*<Input  placeholder="请输入"  style={{ width:"80px" }} />),<Input  placeholder="请输入"  style={{ width:"80px" }} />&nbsp;&nbsp;]*5</span>)}
                                    }
                                </FormItem>
                                <FormItem>
                                    <span>Max[&nbsp;&nbsp;(单板面积*  光绘费因子  ),   单张底片费起始值 &nbsp;&nbsp;]*替换底片张数)</span>
                                </FormItem>
                            </Radio>
                            <Radio style={{display: 'block'}} value={2}>
                                按人工计算
                                <FormItem  label="人工计算过程"  style={{display: "flex"}}>
                                    {
                                        this.state.value > 1 &&
                                        getFieldDecorator('process', {
                                            initialValue:EditFormValue.original_title1,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入人工计算过程',
                                                },
                                            ],
                                        })(<Input  placeholder="请输入"  style={{ width:"280px" }} />)
                                    }
                                    {
                                        this.state.value < 2 &&
                                        <Input  placeholder="请输入"  style={{ width:"280px" }} disabled/>
                                    }
                                </FormItem>
                                <FormItem  label="人工收费金额"  style={{display: "flex"}}>
                                    {
                                        this.state.value>1 &&
                                        getFieldDecorator('money', {
                                            initialValue:EditFormValue.text,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入人工收费金额',
                                                },
                                            ],
                                        })(<InputNumber min={0} placeholder="请输入"  style={{ width:"280px" }}/>)
                                    }
                                    {
                                        this.state.value <2 &&
                                        <InputNumber min={0} placeholder="请输入"  disabled style={{ width:"280px" }}/>

                                    }
                                </FormItem>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const EditMoneyForm=Form.create()(Edit_MoneyForm);
//精度设置form
class Accuracy_Form  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                "key":0,
                "id":"收费项精度",
                },{
                    "key":1,
                    "id":"协议金额精度",
                },{
                    "key":2,
                    "id":"折后金额精度",
                },{
                    "key":3,
                    "id":"结算单价精度",
                }
            ],
        };
    }
    onDelete = (key) => {
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    addTable = () => {
        var data_list=this.state.data;
        data_list.push({
            key: data_list.length+1,
        });
        this.setState({
            data:data_list,
        })
    };
    render(){
        const { AccuracyModalVisible, form, AccuracyHandleAdd, AccuracyHandleModalVisible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const Columns = [
            {
                title: '名称',
                width: '35%',
                dataIndex: 'id',
                key:"id",
            }, {
                title: '小数位数',
                width: '30%',
                dataIndex: 'original_title',
                key:"original_title",
                render: (text, record,index) => {
                    return(
                        <FormItem style={{marginBottom:"0px"}}>
                            {getFieldDecorator('process'+index+'', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入',
                                        },
                                    ],
                                })( <InputNumber min={0}  placeholder="请输入" style={{width:"200px"}} />)
                            }
                        </FormItem>
                    )
                }
            }, {
                title: '精度方式',
                width: '35%',
                dataIndex: 'collect_count',
                key:"collect_count",
                render: (text, record) => {
                    return(
                        <Select  style={{ width: '100%' }} getPopupContainer={() => document.getElementById('area')}>
                            <Option value="0">去掉尾数</Option>
                            <Option value="1">四舍五入</Option>
                            <Option value="2">向上取整</Option>
                            <Option value="3">向下取整</Option>
                        </Select>
                    )
                },
            }
        ]
        const SecondColumns = [
            {
                title: '收费项',
                width: '25%',
                dataIndex: 'id',
                key:"id",
                render: (text, record,index) => {
                    return(
                        <FormItem style={{marginBottom:"0px"}}>
                            {getFieldDecorator('pay'+index+'', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择',
                                    },
                                ],
                            })( <Select  placeholder="请选择" style={{ width: '100%' }}  getPopupContainer={() => document.getElementById('area')}>{children}</Select>)
                            }
                        </FormItem>
                    )
                }
            }, {
                title: '小数位数',
                width: '20%',
                dataIndex: 'original_title',
                key:"original_title",
                render: (text,record,index) => {
                    return(
                        <FormItem style={{marginBottom:"0px"}}>
                            {getFieldDecorator('dot'+index+'', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择',
                                    },
                                ],
                            })( <InputNumber min={0}    placeholder="请输入"  />)
                            }
                         </FormItem>
                    )
                }
            }, {
                title: '精度方式',
                width: '35%',
                dataIndex: 'collect_count',
                key:"collect_count",
                render: (text, record,index) => {
                    return (
                        <FormItem style={{marginBottom:"0px"}}>
                            {getFieldDecorator('way'+index+'', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择',
                                    },
                                ],
                            })( <Select  style={{ width: '100%' }}  getPopupContainer={() => document.getElementById('area')}>
                                <Option value="0">去掉尾数</Option>
                                <Option value="1">四舍五入</Option>
                                <Option value="2">向上取整</Option>
                                <Option value="3">向下取整</Option>
                            </Select>)
                            }
                         </FormItem>

                    );
                },
            }, {
                title: '操作',
                width: '20%',
                dataIndex: 'collect_count2',
                key: "collect_count2",
                render: (text, record) => {
                    return (
                        this.state.data.length > 1 ?
                            (
                                <Popconfirm title="确认删除?" okText="是" cancelText="否"
                                            onConfirm={() => this.onDelete(record.key)}>
                                    <a href="javascript:;" style={{color: "red"}}>删除</a>
                                </Popconfirm>
                            ) : null
                    );
                },
            }
        ]
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                console.log('data of form:',this.props.form.getFieldsValue());//获取表单数据
                form.resetFields();
                this.setState({
                    data:[
                        {
                            "key":0,
                            "id":"收费项精度",
                        },{
                            "key":1,
                            "id":"协议金额精度",
                        },{
                            "key":2,
                            "id":"折后金额精度",
                        },{
                            "key":3,
                            "id":"结算单价精度",
                        }
                    ],
                });
                AccuracyHandleAdd(fieldsValue);
            });
        };
        const onCancel = () => {
            form.resetFields();
            this.setState({
                data:[
                    {
                        "key":0,
                        "id":"收费项精度",
                    },{
                        "key":1,
                        "id":"协议金额精度",
                    },{
                        "key":2,
                        "id":"折后金额精度",
                    },{
                        "key":3,
                        "id":"结算单价精度",
                    }
                ],
            });
            AccuracyHandleModalVisible();
        };
        const pagination=false;
        const text = <span style={{fontSize:"12px"}}>小数位=0，精度方式只能选择向上取整或向下取整或四舍五入<br></br>小数位≠0，精度方式只能选择尾数或四舍五入</span>;
        return (
            <Modal
                title="精度设置"
                visible={AccuracyModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
                width="650px"
            >
                <Form className="modal-form" id="area" style={{position: 'relative'}}>
                    <div style={{marginBottom:"12px"}}>
                        <p style={{marginBottom:"12px"}}>
                            <span style={{marginRight:"8px"}}>结算单精度设置</span>
                            <Tooltip placement="right" title={text}>
                                <Icon type="exclamation-circle-o" />
                            </Tooltip>
                        </p>
                        <Table columns={Columns} dataSource={this.state.data} size="middle" pagination={pagination}/>
                    </div>
                    <div style={{marginBottom:"12px"}}>
                        <Table columns={SecondColumns} dataSource={this.state.data} size="middle" pagination={pagination}  title={() => '单独收费项精度'}/>
                        <Button type="dashed" onClick={this.addTable} style={{ width:"100%",marginTop:"8px",marginBottom:"8px"}}><Icon type="plus" /></Button>
                    </div>
                    <div style={{marginBottom:"12px"}}>
                        <Table columns={Columns} dataSource={this.state.data} size="middle" pagination={pagination}  title={() => '订单字段精度'}/>
                    </div>
                </Form>
            </Modal>
        );
    }
}
const AccuracyForm = Form.create()(Accuracy_Form);
//创建合同form
const ContractColumns = [
    {
        title: '子订单号',
        width: '20%',
        dataIndex: 'id',
        key:"id"
    }, {
        title: '产品类型',
        width: '15%',
        dataIndex: 'original_title',
        key:"original_title"
    }, {
        title: '下单日期',
        width: '15%',
        dataIndex: 'collect_count4',
        key:"collect_count4"
    }, {
        title: '客户',
        width: '10%',
        dataIndex: 'collect_count3',
        key:"collect_count3"
    }, {
        title: '板名',
        width: '20%',
        dataIndex: 'collect_count2',
        key:"collect_count2"
    }, {
        title: '结算金额',
        width: '20%',
        dataIndex: 'collect_count1',
        key:"collect_count1"
    }
]
const ContractctForm = Form.create()(props => {
    const {  ContractModalVisible, form,  ContractHandleAdd,  ContractHandleModalVisible } = props;
    const data=[]
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            ContractHandleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
        ContractHandleModalVisible();
    };
    const pagination=false;
    return (
        <Modal
            title="创建合同"
            visible={ContractModalVisible}
            cancelText="取消"
            okText="确定"
            onOk={okHandle}
            onCancel={onCancel}
            className="modal"
            width="650px"
        >
            <Form className="modal-form" hideRequiredMark >
                <Table locale={{emptyText:"暂无数据"}} style={{marginBottom:"16px"}} columns={ContractColumns} dataSource={data} size="middle" pagination={pagination} />
                <FormItem   labelCol={{ span: 3 }} wrapperCol={{ span: 12 }} label="合同客户">
                    {form.getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请选择' }],
                    })( <Select
                        showSearch
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    >
                        {children}
                    </Select>)}
                </FormItem>
                <FormItem  labelCol={{ span: 3}} wrapperCol={{ span: 12 }}  label="合同编号">
                    {form.getFieldDecorator('input', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input placeholder="请输入" />
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});
//导出信息
class export_form extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        const { form,onSave,EditValue } = this.props;
        return(
            <span>
                <Button  size="small"  style={{marginLeft:"8px"}} onClick={onSave}>取消</Button >
                <Button  size="small" type="primary" style={{marginLeft:"8px"}} onClick={onSave}>保存</Button >
                <Form hideRequiredMark>
                    <FormItem style={{marginBottom:"0px"}}>
                         {form.getFieldDecorator('text', {
                             initialValue:EditValue,
                             rules: [{ required: true, message: '请输入' }],
                         })(<TextArea rows={4}/>)}
                    </FormItem>
                </Form>

            </span>
        )
    }
}
const ExportForm=Form.create()(export_form);
//结算金额
class settlement_form extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        const { form,EditMoneyEnable,valueText,onChange } = this.props;
        const onSave = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                EditMoneyEnable(fieldsValue);
            });
        };
        return(
            <span>
                <Button  size="small" style={{marginLeft:"8px"}} onClick={EditMoneyEnable}>取消</Button >
                <Button  size="small" type="primary" style={{marginLeft:"8px"}} onClick={onSave}>保存</Button >
                <Form hideRequiredMark>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="th">折扣</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('discount', {
                                             initialValue:valueText.count,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<InputNumber min={1} max={100}  step={1}/>)
                                         }
                                         %
                                    </FormItem>
                                </td>
                                <td className="th">减免金额</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('money', {
                                             initialValue:valueText.start,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<InputNumber min={1} max={100} />)}
                                    </FormItem>
                                </td>
                                <td className="th">税率</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('select', {
                                             initialValue:valueText.title,
                                             rules: [{ required: true, message: '请选择' }],
                                         })(<Select  style={{ width: "100%" }} >
                                             <Option value="jack">Jack</Option>
                                             <Option value="lucy">Lucy</Option>
                                             <Option value="disabled" disabled>Disabled</Option>
                                             <Option value="正在上映的电影-北京">正在上映的电影-北京</Option>
                                         </Select>)}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td className="th">赊账金额</td>
                                <td>
                                    <FormItem style={{marginBottom:"0px"}}>
                                         {form.getFieldDecorator('input', {
                                             initialValue:valueText.total,
                                             rules: [{ required: true, message: '请输入' }],
                                         })(<InputNumber min={0} onChange={onChange}/>)}
                                    </FormItem>
                                </td>
                                <td className="th">赊账原因</td>
                                <td colSpan="3">
                                    {
                                        valueText.total >0 &&
                                        <FormItem style={{marginBottom:"0px"}}>
                                            { form.getFieldDecorator('textArea', {
                                                initialValue:valueText.total,
                                                rules: [{ required: true, message: '请输入' }],
                                            })( <Input />)}
                                        </FormItem>
                                    }

                                    {
                                        valueText.total ==0 &&
                                        <span></span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="th">协议金额</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                     {form.getFieldDecorator('input0', {
                                         initialValue:valueText.total,
                                         rules: [{ required: true, message: '请输入' }],
                                     })( <InputNumber min={0}/>)}
                                     </FormItem>
                                </td>
                                <td className="th">折合金额</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                     {form.getFieldDecorator('input1', {
                                         initialValue:valueText.total,
                                         rules: [{ required: true, message: '请输入' }],
                                     })( <InputNumber min={0}/>)}
                                     </FormItem>
                                </td>
                                <td className="th">是否金额回调</td>
                                <td>是</td>
                            </tr>
                            <tr>
                                <td className="th">结算单价</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                     {form.getFieldDecorator('input2', {
                                         initialValue:valueText.total,
                                         rules: [{ required: true, message: '请输入' }],
                                     })( <InputNumber min={0}/>)}
                                     </FormItem>
                                </td>
                                <td className="th">回调减免</td>
                                <td>
                                     <FormItem style={{marginBottom:"0px"}}>
                                     {form.getFieldDecorator('input3', {
                                         initialValue:valueText.total,
                                         rules: [{ required: true, message: '请输入' }],
                                     })( <InputNumber min={0}/>)}
                                     </FormItem>
                                </td>
                                <td className="th">回调金额</td>
                                <td>55</td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </span>
        )
    }
}
const SettlementForm=Form.create()(settlement_form);

class PhotoForm extends React.Component{
    render(){
        const { PhotoVisible ,HandlePhotoVisible }=this.props;
        const handleCancel=()=>{
            HandlePhotoVisible();
        }
        return(
            <Modal
                title="公式结构图"
                visible={PhotoVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Tree
                    showLine
                    defaultExpandedKeys={['0-0-0']}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0">
                            <TreeNode title="leaf" key="0-0-0-0" />
                            <TreeNode title="leaf" key="0-0-0-1" />
                            <TreeNode title="leaf" key="0-0-0-2" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title="leaf" key="0-0-1-0" />
                        </TreeNode>
                        <TreeNode title="parent 1-2" key="0-0-2">
                            <TreeNode title="leaf" key="0-0-2-0" />
                            <TreeNode title="leaf" key="0-0-2-1" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </Modal>
        )
    }
}

class table_detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ContractModalVisible:false,//创建合同
            SplitModalVisible:false,//拆分结算单form
            SplitVisible: true,//是否显示重新拆分列表
            SplitData: [],//重新拆分列表数据
            SplitColumns: [ //重新拆分列表标题
                {
                    title: '客户结算单号',
                    width: '20%',
                    dataIndex: 'id',
                    key: "id",
                }, {
                    title: '板名',
                    width: '30%',
                    dataIndex: 'id2',
                    key: "id2",
                }, {
                    title: '生产数量set',
                    width: '20%',
                    dataIndex: 'original_title1',
                    key: "original_title1",
                }, {
                    title: '生产数量pcs',
                    width: '20%',
                    dataIndex: 'collect_count2',
                    key: "collect_count2",
                },{
                    title: '结算金额',
                    width: '20%',
                    dataIndex: 'collect_count',
                    key: "collect_count",
                }],
            EditEnable:true,//导出订单是否编辑
            EditValue:"QQ</br>是的发动机十分接近单反",//导出订单字段
            status:"3" ,//0--正常 1--未结算 2--拆分 3--合并
            info: [ //收费信息列表标题
                {
                    title: '收费项',
                    width: '10%',
                    dataIndex: 'id',
                    key: "id",
                }, {
                    title: '系统计算过程',
                    width: '10%',
                    dataIndex: 'text',
                    key: "text",
                    render: (text, record) => {
                        return (
                            record.text =="" ?
                            (
                                <Popconfirm title="确定该收费项无误?"  okText="是" cancelText="否"  onConfirm={() => this.onConfirm(record.id)}>
                                    <a href="javascript:;"><Badge status="error" text="异常" style={{color:"#faad14"}}/></a>
                                </Popconfirm>
                            ): (
                                   <span>{record.text}</span>
                                )
                        );
                    },
                }, {
                    title: '人工计算过程',
                    width: '20%',
                    dataIndex: 'original_title1',
                    key: "original_title1",
                }, {
                    title: '系统收费金额',
                    width: '20%',
                    dataIndex: 'collect_count2',
                    key: "collect_count2",
                },{
                    title: '人工收费金额',
                    width: '20%',
                    dataIndex: 'collect_count',
                    key: "collect_count",
                },{
                    title:'默认显示',
                    width: '10%',
                    align:"center",
                    render: (record) => {
                        return(
                            <Checkbox defaultChecked></Checkbox>
                        )
                    }
                },{
                    title:'操作',
                    width: '10%',
                    align:"center",
                    render: (record) => {
                        return(
                           <span>
                               <a href="javascript:;" onClick={() => this.EditHandleModalVisible(true,record)}>编辑</a>
                               <Divider type="vertical" />
                                <Popconfirm title="确定要删除该收费项?"  okText="是" cancelText="否"  onConfirm={() => this.onDelete(record.key)}>
                                    <a href="javascript:;" style={{color:"red"}}>删除</a>
                                </Popconfirm>
                           </span>
                        )
                    }
                }],
            InfoData:[
                {
                    "key":"1",
                    "id":"工程费",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"2",
                    "id":"工程费1",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"3",
                    "id":"工程费2",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"4",
                    "id":"工程费3",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"5",
                    "id":"工程费",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"6",
                    "id":"工程费1",
                    "text":"120",
                    "original_title1":"120"
                },{
                    "key":"7",
                    "id":"工程费2",
                    "text":"",
                    "original_title1":"120"
                },{
                    "key":"8",
                    "id":"工程费5",
                    "text":"120",
                    "original_title1":"120"
                }
            ],
            InfoLoading:false,
            value:{},//结算金额
            EditMoneyEnable:true,//结算金额是否编辑
            FormModalVisible:false,//收费信息添加form
            EditFormModalVisible:false,//收费信息编辑form
            AccuracyModalVisible:false,//精度form
            EditFormValue:{},//收费信息编辑数据
            ArtificialModalVisible:false,//人工结算
            PhotoVisible:false,
        }
    }
    componentDidMount() {
        var self = this;
        axios({
            method:"POST",
            url:"/v2/movie/in_theaters",
        }).then(function(response){
            var value_data=self.state.value;
            value_data['title']=   response.data.total;
            value_data['count']=response.data.count;
            value_data['title']=response.data.title;
            value_data['start']=response.data.start;
            value_data['total']=response.data.total;
            self.setState({
                value:value_data
            });
            console.log(self.state.value)
        }).catch(function(data){

        });
    }
    //---------------------------------导出信息是否编辑-----------------------------------------------------------------------------------------------------//
    EditForm(){
        return(<ExportForm EditValue={this.state.EditValue}  onSave={this.onSave}/>)
    }
    EditEnableForm(){
        return(
            <span>
                <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={this.onSave}>编辑</Button >
                <div className="read_TextArea">{this.state.EditValue}</div>
            </span>
        )
    }
    EditEnable() {
        return this.state.EditEnable ? this.EditEnableForm() : this.EditForm();
    }
    onSave = () => {
        this.setState({
            EditEnable: !this.state.EditEnable,
        });
    };
    //---------------------------------底部工具-----------------------------------------------------------------------------------------------------//
    onConfirm = () =>{
        message.success('This is a message of success');
        console.log(this.state.InfoData)
    }
    showConfirm =(text)=>{
        confirm({
            title: '确认',
            content:text,
            cancelText:"取消",
            okText:"确定",
            onOk() {
                message.info("成功")
            },
            onCancel() {

            },
        });
    }
    JudgeStatus =()=>{//根据状态判读底部工具
        if(this.state.status=="0"){
            return(
                <div className="foot" id="foot">
                    <div className="left">
                        <Button  style={{marginLeft:"32px"}}>编辑订单</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.SplitHandleModalVisible(true)} >拆分结算单</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.ContractHandleModalVisible(true)} >创建合同</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.showConfirm('更新结算后将覆盖当前结算结果，是否确认更新结算')}>更新结算</Button>
                    </div>
                    {this.toolbar()}
                </div>
            )
        }else if(this.state.status=="1"){
            return(
                <div className="foot"  id="foot">
                    <div className="left">
                        <Button style={{marginLeft:"32px"}} onClick={() => this.ArtificialHandleModalVisible(true)}>人工结算</Button>
                        <Button style={{marginLeft:"8px"}}>编辑订单</Button>
                    </div>
                    {this.toolbar()}
                </div>
            )
        }else if(this.state.status=="2"){
            return(
                <div className="foot"  id="foot">
                    <div className="left">
                        <Button  style={{marginLeft:"32px"}} onClick={() => this.showConfirm('您确定要撤销该拆分结算单吗?')}>撤销拆分</Button>
                        <Button  style={{marginLeft:"8px"}}>编辑订单</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.ContractHandleModalVisible(true)} >创建合同</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.showConfirm('更新结算后将覆盖当前结算结果，是否确认更新结算')}>更新结算</Button>
                    </div>
                    {this.toolbar()}
                </div>
            )

        }else if(this.state.status=="3"){
            return(
                <div className="foot"  id="foot">
                    <div className="left">
                        <Button  style={{marginLeft:"32px"}} onClick={() => this.showConfirm('您确定要撤销该合并结算单吗?')}>撤销合并</Button>
                        <Button  style={{marginLeft:"8px"}}>编辑订单</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.ContractHandleModalVisible(true)} >创建合同</Button>
                        <Button  style={{marginLeft:"8px"}} onClick={() => this.showConfirm('更新结算后将覆盖当前结算结果，是否确认更新结算')}>更新结算</Button>
                    </div>
                    {this.toolbar()}
                </div>
            )
        }else{}
    }
    toolbar =()=>{
        const data = [
            {
                title: 'Ant Design Title 1',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
                time:"2010-09-10 10:00:10"
            },
            {
                title: 'Ant Design Title 2',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
                time:"2010-09-10 10:00:10"
            },
            {
                title: 'Ant Design Title 3',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
                time:"2010-09-10 10:00:10"
            },
            {
                title: 'Ant Design Title 4',
                description:"Ant Design",
                time:"2010-09-10 10:00:10"
            },
            {
              title: 'Ant Design Title 4',
              description:"Ant Design",
              time:"2010-09-10 10:00:10"
            },
        ];
        const loadMore =  (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                加载更多...
            </div>
        )
        const content = (
            <Tabs defaultActiveKey="1" size="small" style={{width:"360px"}}  tabBarGutter="120">
                <TabPane tab="结算单日志" key="1">
                    <div style={{height:560,overflow:"auto"}}>
                      <List loadMore={loadMore}
                          itemLayout="horizontal"
                          dataSource={data}
                          renderItem={item => (
                              <List.Item>
                                  <List.Item.Meta
                                      title={<a href="https://ant.design">{item.title}</a>}
                                      description={<div><p>{item.description}</p><p>{item.time}</p></div>}
                                  />
                              </List.Item>
                          )}
                      />
                    </div>
                </TabPane>
                <TabPane tab="订单编辑日志" key="2">
                  <div style={{height:560,overflow:"auto"}}>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                  </div>
                </TabPane>
            </Tabs>
        )
      const photo=(
        <div style={{height:560,overflow:"auto",width:360,}}>
          <Tree
            showLine
            defaultExpandedKeys={['0-0-0']}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0" />
                <TreeNode title="leaf" key="0-0-0-1" />
                <TreeNode title="leaf" key="0-0-0-2" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0" />
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0" />
                <TreeNode title="leaf" key="0-0-2-1" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
      )
      const order=(
        <div style={{height:"700px",overflow:"auto",width:"700px",}}>
          <div className="">
            <div className="content_detail">
              <h className="title">设计基本信息</h>
              <Row>
                <Col span={24}  className="col">
                  <span className="span">子订单号：</span>00000000</Col>
                <Col span={12}  className="col">
                  <span className="span">设计号：</span>上海阿斯顿</Col>
                <Col span={12}  className="col">原始文件名：上海阿斯顿</Col>
                <Col span={12}  className="col">文件名：上海阿斯顿</Col>
                <Col span={12}  className="col">图号：上海阿斯顿</Col>
                <Col span={24}  className="col">单位：00000000</Col>
                <Col span={12}  className="col">客户联系人：上海阿斯顿</Col>
                <Col span={12}  className="col">部门科室：上海阿斯顿</Col>
              </Row>
              <Row>
                <Col span={24}  className="col">商务备注：</Col>
              </Row>
            </div>
          </div>
        </div>
      )

        return(
            <div className="right">
                <Tooltip placement="top" title="查看公式结构图" getPopupContainer={()=>document.getElementById('foot')}>
                  <Popover placement="topRight" content={photo} trigger="click" getPopupContainer={()=>document.getElementById('foot')}>
                    <Button shape="circle" icon="share-alt" />
                  </Popover>
                </Tooltip>
                <Tooltip placement="top" title="查看日志" getPopupContainer={()=>document.getElementById('foot')}>
                  <Popover placement="topRight" content={content} trigger="click" getPopupContainer={()=>document.getElementById('foot')}>
                      <Button shape="circle" icon="file-text"  style={{marginLeft:"8px"}} />
                  </Popover>
                 </Tooltip>
                <Tooltip placement="top" title="订单信息" getPopupContainer={()=>document.getElementById('foot')}>
                  <Popover placement="topLeft" content={order} trigger="click" getPopupContainer={()=>document.getElementById('foot')}>
                    <Button shape="circle" icon="search"  style={{marginLeft:"8px"}}/>
                  </Popover>
                </Tooltip>
            </div>
        )
    }
    HandlePhotoVisible = flag => {
        this.setState({
            PhotoVisible: !!flag,
        });
    };
    //---------------------------------结算金额-----------------------------------------------------------------------------------------------------//
    EditTable(){
        return(
            <span>
                <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={this.EditMoneyEnable}>编辑</Button >
                 <table className="table">
                     <tbody>
                          <tr>
                              <td className="th">折扣</td>
                              <td>{this.state.value.count}%</td>
                              <td className="th">减免金额</td>
                              <td>{this.state.value.start}</td>
                              <td className="th">税率</td>
                              <td>{this.state.value.title}</td>
                          </tr>
                          <tr>
                              <td className="th">赊账金额</td>
                              <td>{this.state.value.total}</td>
                              <td className="th">赊账原因</td>
                              <td colSpan="3">都落空发送是多少积分</td>
                          </tr>
                          <tr>
                              <td className="th">协议金额</td>
                              <td>111</td>
                              <td className="th">折合金额</td>
                              <td>100</td>
                              <td className="th">是否金额回调</td>
                              <td>是</td>
                          </tr>
                          <tr>
                              <td className="th">结算单价</td>
                              <td>11111</td>
                              <td className="th">回调减免</td>
                              <td>3333</td>
                              <td className="th">回调金额</td>
                              <td>55</td>
                          </tr>
                     </tbody>
                 </table>
            </span>

        )
    }
    EditMoneyTable(){
        return(
            <SettlementForm valueText={this.state.value} EditMoneyEnable={this.EditMoneyEnable} onChange={this.onChange}/>
        )

    }
    EditMoneyEnable =()=>{ //结算金额是否编辑
        this.setState({
            EditMoneyEnable: !this.state.EditMoneyEnable
        })

    }
    EditMoneyHandleEnable =()=>{
        return this.state.EditMoneyEnable ? this.EditTable() : this.EditMoneyTable();
    }
    onChange=(value)=>{
        var value_data=this.state.value;
        value_data['total']=value;
        this.setState({
            value:value_data,
        });
        console.log( this.state.value)
    }
    //------------------------------人工结算-----------------------------------------------------------------------------------------------------//
    ArtificialHandleModalVisible = flag => {
        this.setState({
            ArtificialModalVisible: !!flag,
            formValues: {},
        });
        console.log(this.state.ArtificialModalVisible)
    };
    ArtificialHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            ArtificialModalVisible: false,
        });
    };
    //------------------------------拆分结算单-----------------------------------------------------------------------------------------------------//
    SplitHandleModalVisible = flag => {
        this.setState({
            SplitModalVisible: !!flag,
            formValues: {},
        });
        console.log(this.state.SplitModalVisible)

    };
    SplitHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            SplitModalVisible: false,
        });
    };

    //------------------------------收费信息-----------------------------------------------------------------------------------------------------//
    // 添加
    AddHandleModalVisible = flag => {
        this.setState({
            FormModalVisible: !!flag,
        });
    };
    AddHandle = fields => {
        message.success('添加成功');
        this.setState({
            InfoLoading:true,
        })
        var data=this.state.InfoData;
        data.push({
            "key":data.length+1,
            "id":fields.title,
            "text":fields.process,
            "original_title1":fields.money,
        })
        this.setState({
            FormModalVisible: false,
            InfoData:data,
            InfoLoading:false,
        });
    };
    //编辑
    EditHandleModalVisible = (flag,record) => {
        this.setState({
            EditFormValue:{},
            EditFormModalVisible: !!flag,
        });
        if(flag){
            var value_data=this.state.EditFormValue
            value_data['id']= record.id;
            value_data['key']=record.key;
            value_data['original_title1']=record.original_title1;
            value_data['text']=record.text;
            this.setState({
                EditFormValue:value_data,
            });
            console.log(this.state.EditFormValue)
        }
    };
    EditAddHandle = fields => {
        message.success('编辑成功');
        this.setState({
            EditFormModalVisible: false,
        });
    };
    //删除
    onDelete = (key) =>{
        const data = [...this.state.InfoData];
        this.setState({ InfoData: data.filter(item => item.key !== key) });
        message.success('This is a message of success');
    }
    //-----------------------------精度设置-----------------------------------------------------------------------------------------------------//
    AccuracyHandleModalVisible = flag => {
        this.setState({
            AccuracyModalVisible: !!flag,
        });
    };
    AccuracyHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            AccuracyModalVisible: false,
        });
        // var data=this.state.InfoData;
        // data.push({
        //     "key":data.length+1,
        //     "id":fields.title,
        //     "text":fields.process,
        //     "original_title1":fields.money,
        // })
        // this.setState({
        //     FormModalVisible: false,
        //     InfoData:data,
        // });
    };
    //------------------------------创建合同-----------------------------------------------------------------------------------------------------//
    ContractHandleModalVisible = flag => {
        this.setState({
            ContractModalVisible: !!flag,
            formValues: {},
        });
    };
    ContractHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            ContractModalVisible: false,
        });
    };
    render() {
        //拆分结算单
        const { SplitModalVisible } = this.state;
        const SplitParentMethods = {
            SplitHandleAdd: this.SplitHandleAdd,
            SplitHandleModalVisible: this.SplitHandleModalVisible,
        };
        //+展示信息
        const expandedRowRender = (record) => {
            return(
                <section>
                    <p style={{margin:0}}>计算详情：{record.id}</p>
                    <p style={{margin:0}}>计算公式：Max[(单板面积*光绘费因子),单张底片费起始值]*替换底片张数)</p>
                </section>
            )
        }
        //收费信息添加
        const { FormModalVisible } = this.state;
        const FormParentMethods = {
            AddHandle: this.AddHandle,
            AddHandleModalVisible: this.AddHandleModalVisible,
        };
        //收费信息编辑
        const { EditFormModalVisible } = this.state;
        const EditFormParentMethods = {
            EditAddHandle: this.EditAddHandle,
            EditHandleModalVisible: this.EditHandleModalVisible,
        };
        //精度设置
        const { AccuracyModalVisible } = this.state;
        const AccuracyParentMethods = {
            AccuracyHandleAdd: this.AccuracyHandleAdd,
            AccuracyHandleModalVisible: this.AccuracyHandleModalVisible,
        };
        //创建合同
        const { ContractModalVisible } = this.state;
        const ContractParentMethods = {
            ContractHandleAdd: this.ContractHandleAdd,
            ContractHandleModalVisible: this.ContractHandleModalVisible,
        };
        //人工结算
        const { ArtificialModalVisible } = this.state;
        const ArtificialParentMethods = {
            ArtificialHandleAdd: this.ArtificialHandleAdd,
            ArtificialHandleModalVisible: this.ArtificialHandleModalVisible,
        };
        return (
            <section style={{marginTop:1}}>
                <div className="detail_title">结算单详情</div>
                <section className="content list">
                    <div className="content_detail">
                        <h className="title">订单信息</h>
                        <Row>
                            <Col span={8}  className="col">子订单号：00000000</Col>
                            <Col span={8}  className="col">客户：上海阿斯顿</Col>
                            <Col span={8}  className="col">板名：i赛事i阿斯斤斤计较斤斤计较的</Col>
                        </Row>
                        <Row>
                            <Col span={24}  className="col">商务备注：</Col>
                        </Row>
                    </div>
                    { this.state.status==2 &&
                        <div className="content_detail">
                            <h className="title">拆分信息<Button  size="small" type="dashed" onClick={() => this.SplitHandleModalVisible(true)}  style={{marginLeft:"8px"}}>重新拆分</Button ></h>
                            <Table size="middle" columns={this.state.SplitColumns} dataSource={this.state.SplitData} />
                        </div>
                    }
                    { this.state.status!=1 &&
                        <div className="content_detail" style={{marginTop:"16px"}}>
                            <h className="title">导出订单信息</h>
                            {this.EditEnable()}
                        </div>
                    }
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">收费项信息</h>
                        {
                            this.state.status!=1 &&
                            <span>
                                <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={() => this.AddHandleModalVisible(true)}>添加</Button >
                                <Button  size="small" type="dashed" style={{marginLeft:"8px"}} onClick={() => this.AccuracyHandleModalVisible(true)}>精度设置</Button >
                                <span style={{float:"right",marginTop:"10px"}}><Switch  size="small"  className="distance"  style={{marginTop:-3}}/>显示所有收费项</span>
                                <Table size="middle" columns={this.state.info} dataSource={this.state.InfoData}  expandedRowRender={expandedRowRender} pagination={false} loading={this.state.InfoLoading}/>
                            </span>
                        }
                        {
                            this.state.status ==1 &&
                            <div style={{textAlign:"center"}}>
                                <Icon type="file" style={{fontSize:"10rem"}}/>
                                <div style={{fontSize:"15px",marginTop:"20px",fontWeight:"bold"}}>订单未结算</div>
                            </div>
                        }
                    </div>
                    {
                        this.state.status!=1 &&
                        <div>
                            <div className="content_detail" style={{marginTop:"16px"}}>
                                <h className="title">结算金额</h>
                                {this.EditMoneyHandleEnable()}
                            </div>
                            <div className="content_detail" style={{marginTop:"16px"}}>
                                <h className="title">结算单信息</h>
                                <Row>
                                    <Col span={8}  className="col">客户结算单号：00000000</Col>
                                    <Col span={8}  className="col">商务标记：上海阿斯顿</Col>
                                    <Col span={8}  className="col">商务状态：i赛事i阿斯斤斤计较斤斤计较的</Col>
                                </Row>
                                <Row>
                                    <Col span={8}  className="col">结算时间：2018-02-10 10:00:00</Col>
                                    <Col span={8}  className="col">结算人员：上海阿斯顿</Col>
                                    <Col span={8}  className="col">报价协议编号：i赛事i阿斯斤斤计较斤斤计较的</Col>
                                </Row>
                                <Row>
                                    <Col span={8}  className="col">合同编号：2018-02-10 10:00:00</Col>
                                </Row>
                            </div>
                        </div>
                    }

                </section>
                {this.JudgeStatus()}
                <SplitForm {...SplitParentMethods} SplitModalVisible={SplitModalVisible} />
                <AddForm {...FormParentMethods} FormModalVisible={FormModalVisible} />
                <EditMoneyForm {...EditFormParentMethods} EditFormModalVisible={EditFormModalVisible}  EditFormValue={this.state.EditFormValue} />
                <ArtificialForm {...ArtificialParentMethods} ArtificialModalVisible={ArtificialModalVisible} />
                <AccuracyForm  {...AccuracyParentMethods} AccuracyModalVisible={AccuracyModalVisible} />
                <ContractctForm {...ContractParentMethods} ContractModalVisible={ContractModalVisible} />
                <PhotoForm HandlePhotoVisible={this.HandlePhotoVisible} PhotoVisible={this.state.PhotoVisible} />
            </section>
        )
    }
}



export default table_detail
