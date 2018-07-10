import React from 'react';
import {Table, Icon ,Pagination, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
import {ToolBar} from '../Settlement/public/tool';
import { Link,} from 'react-router';
const FormItem = Form.Item;
const Option = Select.Option;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
// //创建合同、添加合同form中所用表格的字段
// const ContractColumns = [
//     {
//         title: '子订单号',
//         width: '20%',
//         dataIndex: 'id',
//         key:"id"
//     }, {
//         title: '产品类型',
//         width: '15%',
//         dataIndex: 'original_title',
//         key:"original_title"
//     }, {
//         title: '下单日期',
//         width: '15%',
//         dataIndex: 'collect_count4',
//         key:"collect_count4"
//     }, {
//         title: '客户',
//         width: '10%',
//         dataIndex: 'collect_count3',
//         key:"collect_count3"
//     }, {
//         title: '板名',
//         width: '20%',
//         dataIndex: 'collect_count2',
//         key:"collect_count2"
//     }, {
//         title: '结算金额',
//         width: '20%',
//         dataIndex: 'collect_count1',
//         key:"collect_count1"
//     }
// ]
//
// //创建合同form
// const ContractctForm = Form.create()(props => {
//     const {  ContractModalVisible, form,  ContractHandleAdd,  ContractHandleModalVisible } = props;
//     const data=[]
//     const okHandle = () => {
//         form.validateFields((err, fieldsValue) => {
//             if (err) return;
//             form.resetFields();
//             ContractHandleAdd(fieldsValue);
//         });
//     };
//     const onCancel = () => {
//         form.resetFields();
//         ContractHandleModalVisible();
//     };
//     const pagination=false;
//     return (
//         <Modal
//             title="创建合同"
//             visible={ContractModalVisible}
//             cancelText="取消"
//             okText="确定"
//             onOk={okHandle}
//             onCancel={onCancel}
//             className="modal"
//             width="650px"
//         >
//             <Form hideRequiredMark className="modal-form">
//                 <Table locale={{emptyText:"暂无数据"}} style={{marginBottom:"16px"}} columns={ContractColumns} dataSource={data} size="middle" pagination={pagination} />
//                 <FormItem   labelCol={{ span: 3 }} wrapperCol={{ span: 12 }} label="合同客户">
//                     {form.getFieldDecorator('desc', {
//                         rules: [{ required: true, message: '请选择' }],
//                     })( <Select
//                         showSearch
//                         placeholder="请选择"
//                         style={{ width: '100%' }}
//                     >
//                         {children}
//                     </Select>)}
//                 </FormItem>
//                 <FormItem  labelCol={{ span: 3}} wrapperCol={{ span: 12 }}  label="合同编号">
//                     {form.getFieldDecorator('input', {
//                         rules: [{ required: true, message: '请输入' }],
//                     })(
//                         <Input placeholder="请输入" />
//                     )}
//                 </FormItem>
//             </Form>
//         </Modal>
//     );
// });
// //添加合同
// const AddContractctForm = Form.create()(props => {
//     const {  AddContractModalVisible, form,  AddContractHandleAdd,  AddContractHandleModalVisible } = props;
//     const data=[]
//     const okHandle = () => {
//         form.validateFields((err, fieldsValue) => {
//             if (err) return;
//             form.resetFields();
//             AddContractHandleAdd(fieldsValue);
//         });
//     };
//     const onCancel = () => {
//         form.resetFields();
//         AddContractHandleModalVisible();
//     };
//     const pagination=false;
//     return (
//         <Modal
//             title="添加到已有合同"
//             visible={AddContractModalVisible}
//             cancelText="取消"
//             okText="确定"
//             onOk={okHandle}
//             onCancel={onCancel}
//             className="modal"
//             width="650px"
//         >
//             <Form hideRequiredMark className="modal-form">
//                 <FormItem  labelCol={{ span: 3}} wrapperCol={{ span: 12 }}  label="合同编号">
//                     {form.getFieldDecorator('input', {
//                         rules: [{ required: true, message: '请输入' }],
//                     })(
//                         <Input placeholder="请输入" style={{width:"200px"}}/>
//                     )}
//                     <Tooltip placement="right" title="查看合同内结算单">
//                         <Button type="primary" icon="search" className="distance">查询</Button>
//                     </Tooltip>
//
//                 </FormItem>
//                 <Table style={{marginBottom:"16px"}} locale={{emptyText:"暂无数据"}} columns={ContractColumns} dataSource={data} size="middle" pagination={pagination} />
//             </Form>
//         </Modal>
//     );
// });
// //已选列表form
// class ViewTable extends React.Component {
//     render(){
//         const { ViewModalVisible ,ViewHandleModalVisible,selectData,onHandleDelete} = this.props
//         const pagination=false;
//         const onCancel = () => {
//             ViewHandleModalVisible();
//         };
//         const onDelete = (key,value) => {
//             onHandleDelete(key,value)
//         }
//         const Columns = [
//             {
//                 title: '子订单号',
//                 width: '20%',
//                 dataIndex: 'key',
//                 key:"key"
//             }, {
//                 title: '产品类型',
//                 width: '15%',
//                 dataIndex: 'original_title',
//                 key:"original_title"
//             }, {
//                 title: '下单日期',
//                 width: '15%',
//                 dataIndex: 'collect_count4',
//                 key:"collect_count4"
//             }, {
//                 title: '客户',
//                 width: '10%',
//                 dataIndex: 'collect_count3',
//                 key:"collect_count3"
//             }, {
//                 title: '板名',
//                 width: '10%',
//                 dataIndex: 'collect_count2',
//                 key:"collect_count2"
//             }, {
//                 title: '结算金额',
//                 width: '20%',
//                 dataIndex: 'collect_count1',
//                 key:"collect_count1"
//             },{
//                 title: '操作',
//                 width: '10%',
//                 dataIndex: 'collect_count11',
//                 key:"collect_count11",
//                 render: (text, record) => {
//                     return (
//                         <Popconfirm title="确认删除?"  okText="是" cancelText="否"  onConfirm={() => onDelete(record.key,record.index)}>
//                             <a href="javascript:;" style={{color:"red"}}>删除</a>
//                         </Popconfirm>
//                     );
//                 },
//             }
//         ]
//         return(
//             <Modal
//                 title="已选结算单列表"
//                 visible={ViewModalVisible}
//                 className="modal"
//                 footer={null}
//                 width="650px"
//                 onCancel={onCancel}
//             >
//                 <form className="modal-form">
//                     <Table columns={Columns} dataSource={selectData} size="middle" pagination={pagination} locale={{emptyText:"暂无数据"}}/>
//                 </form>
//             </Modal>
//         )
//     }
// }

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
            <Form className="search-form"  onSubmit={handleSearch} id="area">
                <Row gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='报价工单号' >
                            {getFieldDecorator('no0')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='下单客户' >
                            {getFieldDecorator('no1')(<Select
                                mode="multiple"
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                getPopupContainer={() => document.getElementById('area')}
                            >
                                {children}
                            </Select>)}

                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='板名' >
                            {getFieldDecorator('no2')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='商务状态'>
                            {getFieldDecorator('no3')( <Select
                                mode="multiple"
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                getPopupContainer={() => document.getElementById('area')}
                            >
                                {children}
                            </Select>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='产品类型' >
                            {getFieldDecorator('no4')( <Select
                                mode="multiple"
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                getPopupContainer={() => document.getElementById('area')}
                            >
                                {children}
                            </Select>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='下单日期'>
                            {getFieldDecorator('no5')( <DatePicker placeholder="请选择开始日期" style={{ width: '100%' }}  getCalendarContainer={() => document.getElementById('area')}/>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='下单日期'>
                            {getFieldDecorator('no6')( <DatePicker placeholder="请选择结束日期" style={{ width: '100%' }}  getCalendarContainer={() => document.getElementById('area')}/>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='合同编号'>
                            {getFieldDecorator('no7')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='工单状态'>
                            {getFieldDecorator('no9')( <Select
                                mode="multiple"
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                getPopupContainer={() => document.getElementById('area')}
                            >
                                {children}
                            </Select>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={24} style={{ textAlign: 'right' }}>
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

export default class offerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ContractModalVisible:false,//创建合同
            AddContractModalVisible:false,//添加到已有合同
            ViewModalVisible:false,//查看已选
            tDate: [],
            expandForm: false,
            loading: false,
            count:0,
            formValues: {},
            disabled:true,//是否置灰
            selectData:[],//选中数组
            selectedRowKeysIndex:[],//选中index
            url:"offer",
        };
    }
    componentDidMount() {
        var self = this;
        this.setState({ loading: true });
        var data=[];
        for(var i=0;i<30;i++){
            data.push({
                "key":i,
                "id":"报价单号"+i,
                "index":i,
                "name":"合同编号"+i,
                "collect_count":"产品类型"+i,
                "collect_count1":"产品类型"+i,
            })
        }
        self.setState({
          tDate:data,
          loading: false,
          total:30,
        });
        // axios({
        //     method:"POST",
        //     url:"/v2/movie/in_theaters",
        // }).then(function(data){
        //     let json = data.data.subjects;
        //     self.setState({
        //         tDate: json,
        //         loading: false
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
    }
    TableRefresh=()=>{
        this.componentDidMount()
        // var self = this;
        // this.setState({ loading: true });
        // axios({
        //     method:"POST",
        //     url:"/v2/movie/in_theaters",
        // }).then(function(data){
        //     let json = data.data.subjects;
        //     self.setState({
        //         tDate: json,
        //         loading: false
        //     });
        // }).catch(function(data){
        //     console.log(data);
        // });
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

    //------------------------------添加到已有合同-----------------------------------------------------------------------------------------------------//
    AddContractHandleModalVisible = flag => {
        this.setState({
            AddContractModalVisible: !!flag,
            formValues: {},
        });
    };
    AddContractHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            AddContractModalVisible: false,
        });
    };
    //------------------------------添加已选-----------------------------------------------------------------------------------------------------//
    handleOnclick= () => {
        this.setState({
            ViewModalVisible:true,
        })
        console.log(this.state.selectData)
    }
    ViewHandleModalVisible = flag => {
        this.setState({
            ViewModalVisible: !!flag,
        });
    };
    onHandleDelete =(key,value)=>{
        const data =[...this.state.selectData];
        const rows =[...this.state.selectedRowKeysIndex];
        this.setState({
            selectData: data.filter(item => item.key !== key),
            selectedRowKeysIndex:rows.filter(item => item!== value),
        });
        this.setState({
            count:this.state.selectData.length-1,
        })
    }
    render() {
        const columns = [
            {
                title: '报价工单号',
                dataIndex: 'id',
                key:"id",
                render: (text, record) =>{
                    return (
                        <Link to={'/offerTable/'+record.id}>
                          <span className="distance">{text}</span>
                          <Tooltip placement="top" title="订单变更，协议金额有变化">
                            <Icon type="exclamation-circle-o" style={{color:"#faad14"}}/>
                          </Tooltip>
                        </Link>
                    )
                }
            }, {
                title: '合同编号',
                dataIndex: 'name',
                key:"name"
            },  {
                title: '产品类型',
                dataIndex: 'original_title09',
                key:"original_title09"
            },  {
                title: '下单日期',
                dataIndex: 'collect_count1',
                key:"collect_count1"
            }, {
                title: '投产日期',
                dataIndex: 'collect_count12',
                key:"collect_count12"
            }, {
                title: '下单客户',
                dataIndex: 'collect_count13',
                key:"collect_count13"
            }, {
                title: '经手人',
                dataIndex: 'collect_count124',
                key:"collect_count124"
            },{
                title: '板名',
                dataIndex: 'collect_count125',
                key:"collect_count125"
            },{
                title: '生产数量',
                dataIndex: 'collect_count126',
                key:"collect_count126"
            },{
                title: '商务状态',
                dataIndex: 'collect_count127',
                key:"collect_count127"
            },{
                title: '协议金额',
                dataIndex: 'collect_count1291',
                key:"collect_count1291",
            },{
                title: '结算金额',
                dataIndex: 'collect_count120',
                key:"collect_count120",
            },{
                title: '工单状态',
                dataIndex: 'operate',
                key:"operate",
            }
        ]
        //计数
        const rowSelection = {
            // fixed:true,
            selectedRowKeys:this.state.selectedRowKeysIndex,
            onChange: (selectedRowKeys, selectedRows) => {
                var data_list=this.state.selectData;
                data_list.splice(0,data_list.length);//清空数组
                for(var i=0;i<selectedRows.length;i++){
                    data_list.push({
                        "index":selectedRowKeys[i],
                        "key":selectedRows[i].id,
                        "original_title":selectedRows[i].original_title,
                        "collect_count":selectedRows[i].collect_count,
                    })
                }
                this.setState({
                    count:selectedRows.length,
                    selectData:data_list,
                    selectedRowKeysIndex:selectedRowKeys,
                })
                if(selectedRows.length==1){
                    this.setState({
                        disabled:false,
                        Merge_disabled:false,
                        Split_disabled:true,
                    })
                }else if(selectedRows.length>1){
                    this.setState({
                        disabled:false,
                        Merge_disabled:true,
                        Split_disabled:false,
                    })
                }else{
                    this.setState({
                        disabled:true,
                        Split_disabled:true,
                        Merge_disabled:true,
                    })
                }
            }
        };
        const NormalPagination = {
            defaultPageSize:20,
            pageSizeOptions:['20', '30', '50', '100', '200'],
            showQuickJumper:true,
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        };
        const Methods = {
          handleAdd: this.handleAdd,
          handleModalVisible: this.handleModalVisible,
          ArtificialHandleAdd: this.ArtificialHandleAdd,
          ArtificialHandleModalVisible: this.ArtificialHandleModalVisible,
          SplitHandleAdd: this.SplitHandleAdd,
          SplitHandleModalVisible: this.SplitHandleModalVisible,
          ContractHandleAdd: this.ContractHandleAdd,
          ContractHandleModalVisible: this.ContractHandleModalVisible,
          AddContractHandleAdd: this.AddContractHandleAdd,
          AddContractHandleModalVisible: this.AddContractHandleModalVisible,
          ViewHandleModalVisible: this.ViewHandleModalVisible,
          SplitSheetHandleModalVisible:this.SplitSheetHandleModalVisible,
          onHandleDelete:this.onHandleDelete,
          MergeHandleAdd: this.MergeHandleAdd,
          MergeHandleModalVisible: this.MergeHandleModalVisible,
          handleOnclick:this.handleOnclick,
          handleButtonClick:this.handleButtonClick,
          HandleProgressVisible:this.HandleProgressVisible,
          count:this.state.count,
          disabled:this.state.disabled,
          Merge_disabled:this.state.Merge_disabled,
          Split_disabled:this.state.Split_disabled,
          modalVisible:this.state.modalVisible,
          SplitModalVisible:this.state.SplitModalVisible,
          ArtificialModalVisible:this.state.ArtificialModalVisible,
          ContractModalVisible:this.state.ContractModalVisible,
          AddContractModalVisible:this.state.AddContractModalVisible,
          MergeModalVisible:this.state.MergeModalVisible,
          ViewModalVisible:this.state.ViewModalVisible,
          selectData:this.state.selectData,
          ProgressVisible:this.state.ProgressVisible,
          percent:this.state.percent,
          SplitSheetModalVisible:this.state.SplitSheetModalVisible,
          text:this.state.text,
          tool_Split:this.state.tool_Split,
          url:this.state.url,
        };
        // //创建合同
        // const { ContractModalVisible } = this.state;
        // const ContractParentMethods = {
        //     ContractHandleAdd: this.ContractHandleAdd,
        //     ContractHandleModalVisible: this.ContractHandleModalVisible,
        // };
        //
        // //添加到已有合同
        // const { AddContractModalVisible } = this.state;
        // const AddContractParentMethods = {
        //     AddContractHandleAdd: this.AddContractHandleAdd,
        //     AddContractHandleModalVisible: this.AddContractHandleModalVisible,
        // };
        // const contract=(
        //     <Menu>
        //         <Menu.Item key="1" onClick={() => this.AddContractHandleModalVisible(true)}>添加到已有合同</Menu.Item>
        //     </Menu>
        // );
        // //已选列表
        // const {ViewModalVisible}=this.state;
        // const ViewContractParentMethods = {
        //     ViewHandleModalVisible: this.ViewHandleModalVisible,
        //     onHandleDelete:this.onHandleDelete,
        // };
        return (
            <section  className="content">
                <div><TableForm TableRefresh={this.TableRefresh}/></div>
                <ToolBar {...Methods}/>
                {/*<div className="Badge">*/}
                    {/*<a onClick={this.handleOnclick}>*/}
                        {/*<Badge count={this.state.count} showZero >*/}
                            {/*<Icon type="bars" className="Badge_sign" />*/}
                        {/*</Badge>*/}
                    {/*</a>*/}
                    {/*<Dropdown.Button  disabled={this.state.disabled}  onClick={() => this.ContractHandleModalVisible(true)}  overlay={contract} type="primary" className="distance">*/}
                        {/*创建合同*/}
                    {/*</Dropdown.Button>*/}
                    {/*<div className="right">*/}
                        {/*<Switch defaultChecked  onChange={onChange} className="distance"  style={{marginTop:-3}}/>查看权限内所有*/}
                    {/*</div>*/}
                {/*</div>*/}
                <Table size="middle" locale={{emptyText:"暂无数据"}}  rowSelection={rowSelection} fixed  columns={columns} dataSource={this.state.tDate}   pagination={NormalPagination} loading={this.state.loading}/>
                {/*<ContractctForm {...ContractParentMethods} ContractModalVisible={ContractModalVisible} />*/}
                {/*<AddContractctForm {...AddContractParentMethods} AddContractModalVisible={AddContractModalVisible} />*/}
                {/*<ViewTable {...ViewContractParentMethods}  ViewModalVisible={ViewModalVisible} selectData={this.state.selectData}/>*/}
            </section>
        )
    }
}

//
// //自动结算
// function handleButtonClick(e) {
//     message.info('Click on left button.');
//     console.log('click left button', e);
// }
// //撤销结算
// function handleMenuClick(e) {
//     Modal.confirm({
//         content: '已修订"的结算单是否需要重新结算?',
//         title:'"警告',
//         okText: '否',
//         cancelText: '是',
//     });
//     console.log('click', e);
// }


//查看权限内所有
function onChange(checked) {
    console.log(`switch to ${checked}`);
    if(checked==false){
        message.info('已关闭查看权限内所有');
    }

}

