import React from 'react';
import {Table, Icon ,Pagination,Progress, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import { Link,} from 'react-router';
import {ToolBar} from '../Settlement/public/tool';
import axios from 'axios';
import $ from "jquery";
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
                        <FormItem label='子订单号' >
                            {getFieldDecorator('no0')(<Input placeholder="请输入"/>)}
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
                <Row gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='商务标记' >
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
                            {getFieldDecorator('no5')( <DatePicker placeholder="请选择开始日期" style={{ width: '100%' }} getCalendarContainer={() => document.getElementById('area')}/>)}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem label='下单日期'>
                            {getFieldDecorator('no6')( <DatePicker placeholder="请选择结束日期" style={{ width: '100%' }} getCalendarContainer={() => document.getElementById('area')}/>)}
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
                        <FormItem label='产品类型' >
                            {getFieldDecorator('no8')( <Select
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
                        <FormItem label='订单状态'>
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
                        <Button type="primary" htmlType="submit" icon="search" >查询</Button>
                        <Button style={{ marginLeft: 8 }}   onClick={handleReset} icon="reload /" >
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const TableForm = Form.create()(Table_Form);


export default class myTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,//商务标记
            SplitModalVisible:false,//拆分结算单
            ArtificialModalVisible:false,//人工结算
            ContractModalVisible:false,//创建合同
            AddContractModalVisible:false,//添加到已有合同
            MergeModalVisible:false,//合并结算单
            ViewModalVisible:false,//查看已选
            tDate: [],
            expandForm: false,
            loading: false,
            count:0,
            formValues: {},
            disabled:true,//是否置灰
            Merge_disabled:true,//合并按钮是否置灰
            Split_disabled:true,//拆分按钮是否置灰
            selectData:[],//选中数组
            selectedRowKeysIndex:[],//选中index
            ProgressVisible:false,//进度条
            percent:50,//进度
            SplitSheetModalVisible:false,//拆分
            text:"注意：下列结算单是拆分结算单，重新结算将取消拆分结果，请确认是否重新结算！",
            before:-1,
            last:-1,
            total:0,
            url:"table",
        };
    }
    componentDidMount() {

      var self = this;
        this.setState({ loading: true });
        var data=[];
        for(var i=0;i<30;i++){
            data.push({
                "key":"key"+i,
                "id":"子订单号"+i,
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
        //     method:"get",
        //     // url:"/v2/movie/in_theaters",
        //     url:"/v2/test/pdu?page=1&pageSize=20"
        // }).then(function(response){
        //     self.setState({
        //         tDate:response.data.result,
        //         loading: false,
        //         total:response.data.total,
        //     });
        //     var tDate=self.state.tDate;
        //     for(var i=1;i<=tDate.length;i++){
        //         tDate[i-1].index=i;
        //     }
        //     console.log(tDate);
        //     // for(var obj in tDate[0]){
        //     //     console.log(obj);
        //     // }
        //
        // }).catch(function(data){
        //     console.log(data);
        // });
    }

    TableRefresh=()=>{
      this.componentDidMount();
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
    //------------------------------商务标记-----------------------------------------------------------------------------------------------------//
    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
            formValues: {},
        });
        console.log(this.state.modalVisible)
    };
    handleAdd = fields => {
        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    };
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
        //判断是否有已修订的单子
        this.HandleRevise();
    };
    //------------------------------拆分结算单-----------------------------------------------------------------------------------------------------//
    SplitHandleModalVisible = SplitFlag => {
        this.setState({
            SplitModalVisible: !!SplitFlag,
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
    //-----------------------------合并结算单-----------------------------------------------------------------------------------------------------//
    MergeHandleModalVisible = flag => {
        this.setState({
            MergeModalVisible: !!flag,
            formValues: {},
        });
    };
    MergeHandleAdd = fields => {
        message.success('添加成功');
        this.setState({
            MergeModalVisible: false,
        });
    };
    //添加已选
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
            selectedRowKeysIndex:rows.filter(item => item!== key),
        });
        this.setState({
            count:this.state.selectData.length-1,
        })
    }
    //-----------------------------自动结算-----------------------------------------------------------------------------------------------------//
    handleButtonClick=(e)=> {
        //判断是否有修订的单子
        this.HandleRevise();
    }
    HandleProgressVisible = flag => {
        this.setState({
            ProgressVisible: !!flag,
        });
    };
    //---------------------------是否有修订单子-----------------------------------------------------------------------------------------------------//
    HandleRevise = () => {
        Modal.confirm({
            content: '已修订的结算单是否需要重新结算?',
            title:'警告',
            okText: '是',
            cancelText: '否',
            onOk:()=> {
                this.HandleProgressVisible(true)
            },
            onCancel:()=>  {
                alert('是');
                //判断是否有拆分结算单
                this.SplitSheetHandleModalVisible(true,1)
            },
        });
    }
    //是否有拆分结算单的单子
    SplitSheetHandleModalVisible = (flag,key) => {
        if(key==2){
            this.setState({
                text:"注意：下列结算单是拆分结算单，撤销结算后将取消拆分结果，请确认是否撤销结算！",
                SplitSheetModalVisible: !!flag,
            });
        }else if(key==1){
            this.setState({
                text:"注意：下列结算单是拆分结算单，重新结算将取消拆分结果，请确认是否重新结算！",
                SplitSheetModalVisible: !!flag,
            });
        }else{
            this.setState({
                // text:"注意：下列结算单是拆分结算单，重新结算将取消拆分结果，请确认是否重新结算！",
                SplitSheetModalVisible: !!flag,
            });
        }

    };
    render() {
        const columns = [
            {
                title: '子订单号',
                dataIndex: 'key',
                key:"key",
                // dataIndex: 'id',
                // key:"id",
                render: (text, record) =>{
                    return (
                        <Link to={'/myTable/'+record.key} target="_blank">
                            <span className="distance">{text}</span>
                            <Tooltip placement="top" title="订单变更，协议金额有变化" >
                                <Icon type="exclamation-circle-o" style={{color:"#faad14"}}/>
                            </Tooltip>
                        </Link>
                    )
                }
            }, {
                title: '合同编号',
                // dataIndex: 'original_title',
                // key:"original_title"
                dataIndex: 'name',
                key:"name"
            }, {
                title: '产品类型',
                dataIndex: 'collect_count',
                key:"collect_count"
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
                title: '商务状态',
                dataIndex: 'collect_count126',
                key:"collect_count126"
            },{
                title: '商务标记',
                dataIndex: 'collect_count127',
                key:"collect_count127"
            },{
                title: '生产数量',
                dataIndex: 'collect_count128',
                key:"collect_count128",
            },{
                title: '协议金额',
                dataIndex: 'collect_count129',
                key:"collect_count129",
            },{
                title: '结算金额',
                dataIndex: 'collect_count120',
                key:"collect_count120",
            },{
                title: '订单状态',
                dataIndex: 'operate',
                key:"operate",
                render: (text, record,index) =>{
                    return (
                        <div>{record.index}</div>
                    )
                }
            }
        ]
        //计数
        const rowSelection = {
            fixed:true,
            selectedRowKeys:this.state.selectedRowKeysIndex,
            onChange: (selectedRowKeys, selectedRows) => {
                var data_list=this.state.selectData;
                data_list.splice(0,data_list.length);//清空数组
                for(var i=0;i<selectedRows.length;i++){
                  data_list.push({
                      "key":selectedRows[i].key,
                      "id":selectedRows[i].id,
                      "name":selectedRows[i].name,
                      "collect_count":selectedRows[i].collect_count,
                  })
                }
                this.setState({
                    count:selectedRowKeys.length,
                    selectedRowKeysIndex:selectedRowKeys,
                    selectData:data_list,
                })
                if(selectedRowKeys.length==1){
                    this.setState({
                        disabled:false,
                        Merge_disabled:false,
                        Split_disabled:true,
                    })
                }else if(selectedRowKeys.length>1){
                    this.setState({
                        disabled:false,
                        Merge_disabled:true,
                        Split_disabled:false,
                    })
                }else{
                  this.setState({
                    disabled:true,
                    Merge_disabled:true,
                    Split_disabled:true,
                  })
                }
            },
            onSelect:(record, selected, selectedRows, nativeEvent)=>{
                console.log(record)
                console.log(selectedRows)
                var that=this;
                var newbefore=that.state.before;
                var newlast=that.state.last;
                var data_list=this.state.selectData;
                if(selected){//true
                    // data_list.push({
                    //     "key":record.key,
                    //     "id":record.id,
                    //     "name":record.name,
                    //     "collect_count":record.collect_count,
                    // })
                    that.setState({
                        before:newlast,
                        last:record.index,
                        // selectData:data_list,
                    },()=>{
                        //alert(that.state.before + "," + that.state.last)
                        document.addEventListener('keyup',function(e){
                            if(e.keyCode==16){
                                if(that.state.before<that.state.last && that.state.before!=-1){
                                    var data=that.state.selectedRowKeysIndex;
                                    var dataList =that.state.selectData;
                                    for(var i=that.state.before;i<=that.state.last;i++){
                                        data.push("key"+i);
                                    }
                                    let Arr = [...new Set(data)];
                                    that.setState({
                                        selectedRowKeysIndex:Arr,
                                    },()=>{
                                        for(var i=0;i<that.state.selectedRowKeysIndex.length;i++){
                                            var flag=true;
                                            for(var j=0;j<dataList.length;j++){
                                                if(that.state.selectedRowKeysIndex[i]==dataList[j].key){
                                                    flag=false;
                                                }
                                            }
                                            if(flag){
                                                dataList.push({
                                                    "key":that.state.selectedRowKeysIndex[i],
                                                    "id":"子订单号"+that.state.selectedRowKeysIndex[i],
                                                    "name":"合同编号"+that.state.selectedRowKeysIndex[i],
                                                })
                                            }
                                        }
                                    });
                                    that.setState({
                                        count:that.state.selectData.length,
                                    });
                                }else if(that.state.last<that.state.before && that.state.last!=-1){
                                    var data=that.state.selectedRowKeysIndex;
                                    var dataList =that.state.selectData;
                                    for(var i=that.state.last;i<=that.state.before;i++){
                                        data.push("key"+i);
                                    }
                                    let Arr = [...new Set(data)];
                                    for(var i=0;i<Arr.length;i++){
                                        var flag=true;
                                        for(var j=0;j<dataList.length;j++){
                                            if(Arr[i]==dataList[j].key){
                                                flag=false;
                                            }
                                        }
                                        if(flag){
                                            dataList.push({
                                                "key":Arr[i],
                                                "id":"子订单号"+Arr[i],
                                                "name":"合同编号"+Arr[i],
                                            })
                                        }
                                    }
                                    that.setState({
                                        selectedRowKeysIndex:Arr,
                                        selectData:dataList,
                                    });
                                    that.setState({
                                        count:that.state.selectData.length,
                                    });
                                }else{
                                    // alert(that.state.before)
                                    // alert(that.state.last)
                                }
                            }
                        })
                    });
                }else{//false
                    // that.setState({
                    //     selectData: data_list.filter(item => item.key !== record.key),
                    // });
                    if(record.key==newbefore){
                        that.setState({
                            before:-1,
                            last:newlast,
                        },()=>{
                            // alert("删掉before")
                        });
                    }else if(record.key==newlast){
                        that.setState({
                            before:-1,
                            last:newbefore,
                        },()=>{
                            // alert("删掉last")
                        });
                    }else{
                        //alert("报错啦")
                    }

                }
            },
            onSelectAll:(selected, selectedRows, changeRows)=>{
                this.setState({
                    before: -1,
                    last: -1,
                })
            }
        };
        //分页
        const NormalPagination = {
            defaultPageSize:20,
            pageSizeOptions:['20', '30', '50', '100', '200'],
            showQuickJumper:true,
            // total: this.state.tDate.length,
            total:this.state.total,
            showSizeChanger: true,
            onShowSizeChange:(current, pageSize)=> {
                console.log('Current: ', current, '; PageSize: ', pageSize)
                //  var self = this;
                //  self.setState({
                //    loading: true ,
                //    count:0,
                //    selectedRowKeysIndex:[],
                //    selectData:[],
                //    disabled:true,
                //    Split_disabled:true,
                //    Merge_disabled:true,
                //    before: -1,
                //    last: -1,
                //   });
                // axios({
                //     method:"get",
                //     // url:"/v2/movie/in_theaters",
                //     url:"/v2/test/pdu?page="+current+"&pageSize="+pageSize+"",
                // }).then(function(response){
                //     self.setState({
                //         tDate:response.data.result,
                //         loading: false,
                //         total:response.data.total,
                //     });
                //     console.log(self.tDate)
                // }).catch(function(data){
                //     console.log(data);
                // });
            },
            onChange:(current,pageSize)=> {
                console.log('Current: ', current)
                var self = this;
                // self.setState({
                //   loading: true ,
                //   count:0,
                //   selectedRowKeysIndex:[],
                //   selectData:[],
                //   disabled:true,
                //   Split_disabled:true,
                //   Merge_disabled:true,
                //   before: -1,
                //   last: -1,
                // });
                // axios({
                //     method:"get",
                //     // url:"/v2/movie/in_theaters",
                //     url:"/v2/test/pdu?page="+current+"&pageSize="+pageSize+"",
                // }).then(function(response){
                //     self.setState({
                //         tDate:response.data.result,
                //         loading: false,
                //         total:response.data.total,
                //     });
                // }).catch(function(data){
                //     console.log(data);
                // });
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

      // const oday="2018-10-20";
      // const day="2018-10-25";
        return (
            <section  className="content">
                <TableForm TableRefresh={this.TableRefresh}/>
                <ToolBar {...Methods}/>
                {/*<RangePicker*/}
                  {/*ranges={{ Today: [moment(), moment()], '近五天': [moment(oday), moment(day)] }}*/}
                {/*/>*/}
                <Table size="middle"   locale={{emptyText:"暂无数据"}}  rowSelection={rowSelection}  columns={columns} dataSource={this.state.tDate}   pagination={NormalPagination} loading={this.state.loading}/>
            </section>
        )
    }
}





