import React from 'react';
import { Row,Col,Table,Button ,Input,message,Modal,Form,Select,Checkbox,} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


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
            width="650"
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



class offer_detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ContractModalVisible:false,//创建合同
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
            EditValue:"11wdads",
            value:{},//结算金额
        }
    }

    componentDidMount() {
        var self = this;
        axios({
            method:"POST",
            url:"/v2/movie/in_theaters",
        }).then(function(response){
            console.log(response)
            var value_data=self.state.value;
            value_data['title']= response.data.total;
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

    JudgeStatus =()=>{
        return(
            <div className="foot">
                <div className="left">
                    <Button type="primary" style={{marginLeft:"8px"}} onClick={() => this.ContractHandleModalVisible(true)} >创建合同</Button>
                </div>
                <div className="right">
                    <Button shape="circle" icon="file-text"  style={{marginLeft:"8px"}}/>
                </div>
            </div>
        )
    }


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

        //+展示信息
        const expandedRowRender = (record) => {
            return(
                <section>
                    <p style={{margin:0}}>计算详情：{record.id}</p>
                    <p style={{margin:0}}>计算公式：Max[(单板面积*光绘费因子),单张底片费起始值]*替换底片张数)</p>
                </section>
            )
        }
        //创建合同
        const { ContractModalVisible } = this.state;
        const ContractParentMethods = {
            ContractHandleAdd: this.ContractHandleAdd,
            ContractHandleModalVisible: this.ContractHandleModalVisible,
        };

        return (
            <section style={{marginTop:1}}>
                <div className="detail_title">报价结算单详情</div>
                <section className="content list">
                    <div className="content_detail">
                        <h className="title">订单信息</h>
                        <Row>
                            <Col span={8}  className="col">子订单号：00000000</Col>
                            <Col span={8}  className="col">客户：上海阿斯顿</Col>
                            <Col span={8}  className="col">班名：i赛事i阿斯斤斤计较斤斤计较的</Col>
                        </Row>
                        <Row>
                            <Col span={24}  className="col">备注</Col>
                        </Row>
                    </div>

                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">导出订单信息</h>
                        <div className="read_TextArea">{this.state.EditValue}</div>
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">收费项信息</h>
                        <Table size="middle" columns={this.state.info} dataSource={this.state.InfoData}  expandedRowRender={expandedRowRender} pagination={false}/>
                    </div>
                    <div className="content_detail" style={{marginTop:"16px"}}>
                        <h className="title">结算金额</h>
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
                </section>
                {this.JudgeStatus()}
                <ContractctForm {...ContractParentMethods} ContractModalVisible={ContractModalVisible} />
            </section>
        )
    }
}



export default offer_detail
