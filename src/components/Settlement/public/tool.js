import React from 'react';
import {Table, Icon ,Pagination,Progress, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip,Popover} from 'antd';
import axios from 'axios';
import $ from "jquery"
import { Link,} from 'react-router';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
//多选数据
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
//创建合同、添加合同form中所用表格的字段
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
//人工结算form
const ArtificialForm = Form.create()(props => {
    const { ArtificialModalVisible, form, ArtificialHandleAdd, ArtificialHandleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            ArtificialHandleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
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
//商务标记form
const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
        handleModalVisible();
    };
    return (
        <Modal
            title="商务标记"
            visible={modalVisible}
            cancelText="取消"
            okText="确定"
            onOk={okHandle}
            onCancel={onCancel}
            // onCancel={() => handleModalVisible()}
        >
            <Form hideRequiredMark>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商务标记">
                    {form.getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请选择' }],
                    })( <Select
                        mode="multiple"
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    >
                        {children}
                    </Select>)}
                </FormItem>
            </Form>
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
                    <Select defaultValue="lucy" style={{ width: "120px"}}  getPopupContainer={() => document.getElementById('area')}>
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
                    <Select defaultValue="lucy" style={{ width: "120px" }}  getPopupContainer={() => document.getElementById('area')}>
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
                <form className="modal-form" id="area" style={{position: 'relative'}}>
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
//创建合同form
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
            <Form hideRequiredMark className="modal-form">
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
//添加合同
const AddContractctForm = Form.create()(props => {
    const {  AddContractModalVisible, form,  AddContractHandleAdd,  AddContractHandleModalVisible } = props;
    const data=[]
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            AddContractHandleAdd(fieldsValue);
        });
    };
    const onCancel = () => {
        form.resetFields();
        AddContractHandleModalVisible();
    };
    const pagination=false;
    return (
        <Modal
            title="添加到已有合同"
            visible={AddContractModalVisible}
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
                <Table style={{marginBottom:"16px"}} locale={{emptyText:"暂无数据"}} columns={ContractColumns} dataSource={data} size="middle" pagination={pagination} />
            </Form>
        </Modal>
    );
});
//合并结算单form
class Merge_Form  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[{
                key:"0"
            }]
        };
    }
    onDelete = (key) => {
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    render(){
        const { MergeModalVisible, form, MergeHandleAdd, MergeHandleModalVisible } = this.props
        const MergeColumns = [
            {
                title: '需要合并的收费项',
                width: '40%',
                dataIndex: 'id',
                key:"id",
                render: () =>
                    <Select
                        mode="multiple"
                        placeholder="请选择"
                        style={{ width: '100%' }}
                        getPopupContainer={() => document.getElementById('area')}
                    >
                    {children}
                </Select>
            }, {
                title: '合并后收费项名称',
                width: '40%',
                dataIndex: 'original_title',
                key:"original_title",
                render: () => <Input placeholder="请输入" style={{width:"200px"}}/>
            }, {
                title: '操作',
                width: '20%',
                dataIndex: 'collect_count',
                key:"collect_count",
                render: (text, record) => {
                    return (
                        this.state.data.length > 1 ?
                            (
                              <a href="javascript:;" style={{color:"red"}} onClick={() => this.onDelete(record.key)}>删除</a>
                            ) : null
                    );
                },
            }
        ]
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                MergeHandleAdd(fieldsValue);
                this.setState({
                    data:[{
                        key:"0"
                    }]
                });
            });
        };
        const onCancel = () => {
            form.resetFields();
            this.setState({
                data:[{
                    key:"0"
                }]
            })
          MergeHandleModalVisible();
        };
        const pagination=false;
        const addTable = () => {
            var data_list=this.state.data;
            data_list.push({
                key: data_list.length,
            });
            this.setState({
                data:data_list,
            })
        };
        const title=()=>{
            return(
                <div>
                    <span style={{marginRight:"8px"}}>合并收费项</span>
                    <Tooltip placement="right" title="不设置的收费项默认逐条显示">
                        <Icon type="exclamation-circle-o" />
                    </Tooltip>
                </div>

            )
        }
        return (
            <Modal
                title="合并结算单"
                visible={MergeModalVisible}
                cancelText="取消"
                okText="确定"
                onOk={okHandle}
                onCancel={onCancel}
                className="modal"
            >
                <form className="modal-form"  id="area" style={{position: 'relative'}}>
                    <FormItem  labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="合并后生产数量">
                        <InputNumber min={0} max={10} step={1} placeholder="请输入合并后生产数量" style={{ width:"280px" }} className="distance"/>
                    </FormItem>
                    <div id="split_table" style={{marginBottom:"12px"}}>
                        <Table columns={MergeColumns} dataSource={this.state.data} size="middle" pagination={pagination}  title={title}/>
                        <Button type="dashed" onClick={addTable} style={{ width:"100%",marginTop:"8px",marginBottom:"8px"}}><Icon type="plus" /></Button>
                    </div>
                    <div style={{marginBottom:"12px"}}>
                      <span>导出订单信息显示方式</span>
                    </div>
                    <FormItem  labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="需显示的订单">
                      <Select
                        mode="multiple"
                        placeholder="请选择"
                        style={{ width: '100%' }}
                        getPopupContainer={() => document.getElementById('area')}
                      >
                        {children}
                      </Select>
                    </FormItem>
                </form>
            </Modal>
        );

    }
}
const MergeForm = Form.create()(Merge_Form);
//已选列表form
class ViewTable extends React.Component {
    render(){
        const { ViewModalVisible ,ViewHandleModalVisible,selectData,onHandleDelete} = this.props
        const pagination=false;
        const onCancel = () => {
            ViewHandleModalVisible();
        };
        const onDelete = (key,value) => {
            onHandleDelete(key,value)
        }
        const Columns = [
            {
                title: '子订单号',
                width: '20%',
                dataIndex: 'index',
                key:"index"
            }, {
                title: '产品类型',
                width: '15%',
                dataIndex: 'name',
                key:"name"
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
                width: '10%',
                dataIndex: 'collect_count2',
                key:"collect_count2"
            }, {
                title: '结算金额',
                width: '20%',
                dataIndex: 'collect_count1',
                key:"collect_count1"
            },{
                title: '操作',
                width: '10%',
                dataIndex: 'collect_count11',
                key:"collect_count11",
                render: (text, record) => {
                    return (
                      <a href="javascript:;" style={{color:"red"}} onClick={() => onDelete(record.key,record.id)}>删除</a>
                    );
                },
            }
        ]
        return(
          <div style={{maxHeight:350,overflow:"auto"}}>
            <Table columns={Columns} dataSource={selectData} size="middle" pagination={pagination} locale={{emptyText:"暂无数据"}}/>
          </div>
        )
    }
}

//进度条
class ProgressForm extends React.Component{
    render(){
        const { ProgressVisible ,percent ,HandleProgressVisible}=this.props;
        const handleCancel =()=>{
            HandleProgressVisible();
        }
        return(
            <Modal
                title="结算进度"
                visible={ProgressVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Progress percent={percent} />
            </Modal>
        )
    }
}
//拆分结算单
class SplitSheet extends React.Component {
    render(){
        const { SplitSheetModalVisible ,SplitSheetHandleModalVisible,selectData,text} = this.props
        const pagination=false;
        const onCancel = () => {
            SplitSheetHandleModalVisible();
        };
        const Columns = [
            {
                title: '子订单号',
                width: '20%',
                dataIndex: 'key',
                key:"key"
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
                width: '10%',
                dataIndex: 'collect_count2',
                key:"collect_count2"
            }, {
                title: '结算金额',
                width: '20%',
                dataIndex: 'collect_count1',
                key:"collect_count1"
            }
        ]
        return(
            <Modal
                title="结算提示"
                visible={SplitSheetModalVisible}
                className="modal"
                width="650px"
                onCancel={onCancel}
                onOk={onCancel}
            >
                <form className="modal-form">
                    <div style={{marginBottom:"24px"}}>{text}</div>
                    <Table columns={Columns} dataSource={selectData} size="middle" pagination={pagination} locale={{emptyText:"暂无数据"}}/>
                </form>
            </Modal>
        )
    }
}



class ToolBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.lock = false;
  }
  componentDidMount() {
    var self=this
    document.getElementById('mainContainer').onscroll = function (e) {
      var e = e || document.getElementById('mainContainer').event;
      var scrolltop = document.getElementById('mainContainer').scrollTop ;
      console.log(scrolltop);
      if (scrolltop < 370) {//relative
        if(!self.lock){
          self.setState({
            name: '',
          })
        }
      }else {//fixed
        if(!self.lock) {
          self.setState({
            name: 'BadgeFixed',
          })
        }
      }
    }
  }
  //组件将被卸载
  componentWillUnmount(){
    this.lock = true;
  }
    render(){
        const Settlement = (
            <Menu>
                <Menu.Item key="1" onClick={() => this.props.ArtificialHandleModalVisible(true)}>人工结算</Menu.Item>
                <Menu.Item key="2" onClick={() => this.props.SplitSheetHandleModalVisible(true,2)}>撤销结算</Menu.Item>
            </Menu>
        );
        const sign = (
            <Menu>
              {
                this.props.tool_Split==undefined ?
                <Menu.Item key="1" disabled={this.props.Merge_disabled} onClick={() => this.props.SplitHandleModalVisible(true)}>拆分结算单</Menu.Item>:null
              }
                <Menu.Item key="2" disabled={this.props.Split_disabled} onClick={() => this.props.MergeHandleModalVisible(true)}>合并结算单</Menu.Item>
            </Menu>
        );
        const contract=(
            <Menu>
                <Menu.Item key="1" onClick={() => this.props.AddContractHandleModalVisible(true)}>添加到已有合同</Menu.Item>
            </Menu>
        );

        const educe=(
            <Menu>
                <Menu.Item key="1">结算单列表</Menu.Item>
                <Menu.Item key="2">结算单详情</Menu.Item>
            </Menu>
        );
        const parentMethods = {
            handleAdd: this.props.handleAdd,
            handleModalVisible: this.props.handleModalVisible,
        };
        const ArtificialParentMethods = {
            ArtificialHandleAdd: this.props.ArtificialHandleAdd,
            ArtificialHandleModalVisible: this.props.ArtificialHandleModalVisible,
        };
        const SplitParentMethods = {
            SplitHandleAdd: this.props.SplitHandleAdd,
            SplitHandleModalVisible: this.props.SplitHandleModalVisible,
        };
        const ContractParentMethods = {
            ContractHandleAdd: this.props.ContractHandleAdd,
            ContractHandleModalVisible: this.props.ContractHandleModalVisible,
        };
        const AddContractParentMethods = {
            AddContractHandleAdd: this.props.AddContractHandleAdd,
            AddContractHandleModalVisible: this.props.AddContractHandleModalVisible,
        };
        const ViewContractParentMethods = {
            ViewHandleModalVisible: this.props.ViewHandleModalVisible,
            onHandleDelete:this.props.onHandleDelete,
        };
        const MergeParentMethods = {
            MergeHandleAdd: this.props.MergeHandleAdd,
            MergeHandleModalVisible: this.props.MergeHandleModalVisible,
        };
        const content = (
          <ViewTable {...ViewContractParentMethods}  ViewModalVisible={this.props.ViewModalVisible} selectData={this.props.selectData}/>
        );
        return(
          <div className={this.state.name}>
            <div className="Badge" id="Badge">
              <Popover placement="bottomLeft" title="已选列表" content={content} trigger="click" getPopupContainer={() => document.getElementById('Badge')} >
                <Badge count={this.props.count} showZero >
                  <Icon type="bars" className="Badge_sign" />
                </Badge>
              </Popover>
              { this.props.url!="offer" ?
                <span>
                   <Dropdown.Button disabled={this.props.disabled}   onClick={this.props.handleButtonClick} overlay={Settlement} className="distance" >
                      自动结算
                    </Dropdown.Button>
                    <Dropdown.Button  disabled={this.props.disabled}  onClick={() => this.props.handleModalVisible(true)} overlay={sign}  className="distance">
                      商务标记
                    </Dropdown.Button>
                   <Dropdown.Button  disabled={this.props.disabled}  onClick={() => this.props.ContractHandleModalVisible(true)}  overlay={contract}  className="distance">
                    创建合同
                   </Dropdown.Button>
                   <Dropdown overlay={educe}>
                    <Button  type="primary">
                      导出 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>:
                <Dropdown.Button  disabled={this.props.disabled}  onClick={() => this.props.ContractHandleModalVisible(true)}  overlay={contract}  className="distance">
                  创建合同
                </Dropdown.Button>
              }
              <div className="right">
                <Switch defaultChecked  size="small" onChange={onChange} className="distance"  style={{marginTop:-3}}/>查看权限内所有
              </div>
              <CreateForm {...parentMethods} modalVisible={this.props.modalVisible} />
              <SplitForm {...SplitParentMethods} SplitModalVisible={this.props.SplitModalVisible} />
              <ArtificialForm {...ArtificialParentMethods} ArtificialModalVisible={this.props.ArtificialModalVisible} />
              <ContractctForm {...ContractParentMethods} ContractModalVisible={this.props.ContractModalVisible} />
              <AddContractctForm {...AddContractParentMethods} AddContractModalVisible={this.props.AddContractModalVisible} />
              <MergeForm {...MergeParentMethods} MergeModalVisible={this.props.MergeModalVisible} />
              <ProgressForm HandleProgressVisible={this.props.HandleProgressVisible} ProgressVisible={this.props.ProgressVisible} percent={this.props.percent}/>
              <SplitSheet SplitSheetModalVisible={this.props.SplitSheetModalVisible} SplitSheetHandleModalVisible={this.props.SplitSheetHandleModalVisible} selectData={this.props.selectData} text={this.props.text}/>
            </div>
          </div>

        )
    }
}

export { ToolBar }


//查看权限内所有
function onChange(checked) {
    console.log(`switch to ${checked}`);
    if(checked==false){
        message.info('已关闭查看权限内所有');
    }

}
