import React from 'react';
import {Table, Icon ,Popover, Popconfirm, Button , Row, Col, Form, Input, Select, Radio, DatePicker, message,Dropdown,Menu,Modal,Switch,Badge ,InputNumber,Tooltip} from 'antd';
import axios from 'axios';
import $ from "jquery"
import { Link,} from 'react-router';
const FormItem = Form.Item;
const Option = Select.Option;
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
      <Form className="search-form"  onSubmit={handleSearch}>
        <Row gutter={32}>
          <Col className="gutter-row" span={6}>
            <FormItem label='合同编号' >
              {getFieldDecorator('no0')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem label='产品类型'>
              {getFieldDecorator('no3')( <Select
                mode="multiple"
                placeholder="请选择"
                style={{ width: '100%' }}
              >
                {children}
              </Select>)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem label='下单客户' >
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
            <FormItem label='合同客户' >
              {getFieldDecorator('no4')( <Select
                mode="multiple"
                placeholder="请选择"
                style={{ width: '100%' }}
              >
                {children}
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col className="gutter-row" span={6}>
            <FormItem label='合同状态' >
              {getFieldDecorator('no2')( <Select
                mode="multiple"
                placeholder="请选择"
                style={{ width: '100%' }}
              >
                {children}
              </Select>)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem label='创建日期'>
              {getFieldDecorator('no5')( <DatePicker placeholder="请选择开始" style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem label='创建日期'>
              {getFieldDecorator('no6')( <DatePicker placeholder="请选择结束" style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem label='创建人员'>
              {getFieldDecorator('no7')(<Input placeholder="请输入" />)}
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

//创建form
const CreateForm = Form.create()(props => {
  const {  ModalVisible, form, HandleAdd,HandleCancel} = props;
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
      title="选择合同模板"
      visible={ModalVisible}
      cancelText="取消"
      okText="确定"
      onOk={okHandle}
      onCancel={onCancel}
      className="modal"
    >
      <Form hideRequiredMark className="modal-form">
        <FormItem   labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择合同模板">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入' }],
          })( <Select
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

//查看结算单
class ViewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectData:[]
    };
  }
  render(){
    const { ViewModalVisible ,ViewHandleModalVisible} = this.props
    const pagination=false;
    const onCancel = () => {
      ViewHandleModalVisible();
    };
    const Columns = [
      {
        title: '报价工单号',
        dataIndex: 'index',
        key:"index"
      },  {
        title: '下单日期',
        dataIndex: 'collect_count4',
        key:"collect_count4"
      }, {
        title: '下单客户',
        dataIndex: 'collect_count3',
        key:"collect_count3"
      },{
        title: '经手人',
        dataIndex: 'collect_count11',
        key:"collect_count11",
      },{
        title: '板名',
        dataIndex: 'collect_count2',
        key:"collect_count2"
      }, {
        title: '结算金额',
        dataIndex: 'collect_count1',
        key:"collect_count1",
        align:"right",
      }
    ]
    return(
      <Table  columns={Columns} dataSource={this.state.selectData} size="middle" pagination={pagination} locale={{emptyText:"暂无数据"}}/>
    )
  }
}

const content=(
  <ViewTable/>
)

class quotation_contract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      ModalVisible:false,
      columns:[
        {
          title: '合同编号',
          width: '10%',
          dataIndex: 'id',
          key:"id",
          render: (text, record) =>{
            return (
              <Link to={'/salesContract/'+record.id} target="_blank">
                <span className="distance">{text}</span>
                <Tooltip placement="top" title="合同欠款YY元，赊账原因：xxxx">
                  <Icon type="exclamation-circle-o" style={{color:"#faad14"}}/>
                </Tooltip>
              </Link>
            )
          }
        }, {
          title: '产品类型',
          width: '10%',
          dataIndex: 'id0',
          key:"id0"
        },   {
          title: '下单客户',
          width: '10%',
          dataIndex: 'id1',
          key:"id1"
        }, {
          title: '合同客户',
          width: '10%',
          dataIndex: 'id2',
          key:"id2"
        }, {
          title: '合同金额',
          width: '10%',
          dataIndex: 'collect_count13',
          key:"collect_count13"
        }, {
          title: '合同状态',
          width: '10%',
          dataIndex: 'collect_count124',
          key:"collect_count124"
        },{
          title: '销售',
          width: '10%',
          dataIndex: 'collect_count125',
          key:"collect_count125"
        },{
          title: '创建人员',
          width: '10%',
          dataIndex: 'collect_count126',
          key:"collect_count126"
        },{
          title: '创建日期',
          width: '10%',
          dataIndex: 'collect_count127',
          key:"collect_count127"
        },{
          title: '操作',
          width: '10%',
          dataIndex: 'key',
          key:"key",
          render: (text, record) =>{
            return(
              <Popover placement="bottomLeft" title="查看结算单" content={content} trigger="click"   getPopupContainer={() => document.getElementById('table')}>
                <a href="javascript:;" >查看结算单</a>
              </Popover>
            )
          }
        }
      ],
      selectData:[],
      disabled:true,
      ViewModalVisible:false,
    };
  }

  componentDidMount() {
    var self = this;
    this.setState({ loading: true });
    var data=self.state.list
    for(var i=0;i<36;i++){
      if(i%2==0){
        data.push({
          "key":i,
          "id":"key"+i,
          "id0":"产品类型"+i,
          "id1":"下单客户"+i,
          "id2":"合同客户",
        })
      }else{
        data.push({
          "key":i,
          "id":"key"+i,
          "id0":"产品类型"+i,
          "id1":"下单客户"+i,
          "id2":"客户",
        })
      }

    }
    self.setState({
      list: data,
      loading: false
    });
    // axios({
    //     method:"POST",
    //     url:"/v2/movie/in_theaters",
    // }).then(function(response){
    //     var data=self.state.list
    //     for(var i=0;i<36;i++){
    //         if(i%2==0){
    //             data.push({
    //                 "key":i,
    //                 "id":"合同编号"+i,
    //                 "id0":"产品类型"+i,
    //                 "id1":"下单客户"+i,
    //                 "id2":"合同客户",
    //             })
    //         }else{
    //             data.push({
    //                 "key":i,
    //                 "id":"合同编号"+i,
    //                 "id0":"产品类型"+i,
    //                 "id1":"下单客户"+i,
    //                 "id2":"客户",
    //             })
    //         }
    //
    //     }
    //     self.setState({
    //         list: data,
    //         loading: false
    //     });
    // }).catch(function(response){
    //     console.log(response);
    // });
  }
  TableRefresh=()=>{
    this.componentDidMount()
  }
  //添加form
  HandleModalVisible = (flag,record) => {
    var sign=true
    var data_list=this.state.selectData;
    console.log(data_list);
    for(var i=0;i<data_list.length;i++){
      if(i+1<data_list.length){
        for(var j=(i+1);j<data_list.length;j++){
          console.log(data_list[i].id2)
          console.log(data_list[j].id2)
          if(data_list[i].id2!=data_list[j].id2){
            sign=false
          }
        }
      }
    }
    if(sign){
      this.setState({
        ModalVisible: !!flag,
      });
    }else{
      console.log(2)
      Modal.warning({
        title: '警告',
        content: '批量导出合同详情只能选择同一合同客户',
      });
    }

  };
  HandleAdd = fields => {
    message.success('导出成功');
    this.setState({
      ModalVisible: false,
    });
  };
  HandleCancel =(flag)=>{
    this.setState({
      ModalVisible: !!flag,
    });
  }
  //查看
  ViewHandleModalVisible=(flag)=>{
    this.setState({
      ViewModalVisible: !!flag,
    });
  }
  render() {
    //分页
    const NormalPagination = {
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
    //勾选
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        var data_list=this.state.selectData;
        data_list.splice(0,data_list.length);//清空数组
        for(var i=0;i<selectedRows.length;i++){
          data_list.push({
            "index":selectedRowKeys[i],
            "key":selectedRows[i].key,
            "id":selectedRows[i].id,
            "id0":selectedRows[i].id0,
            "id1":selectedRows[i].id1,
            "id2":selectedRows[i].id2,
          })
        }
        this.setState({
          selectData:data_list,
        })
        if(selectedRows.length!=0){
          this.setState({
            disabled:false,
          })
        }else{
          this.setState({
            disabled:true,
          })
        }
      }
    };
    const educe=(
      <Menu>
        <Menu.Item key="1" >合同列表</Menu.Item>
        <Menu.Item key="2" disabled={this.state.disabled} onClick={() => this.HandleModalVisible(true)}>合同详情</Menu.Item>
      </Menu>
    );

    return (
      <section className="content" >
        <div>
          <TableForm TableRefresh={this.TableRefresh}/>
        </div>
        <div className="Badge">
          <Dropdown overlay={educe}>
            <Button  type="primary">
              导出 <Icon type="down" />
            </Button>
          </Dropdown>
          <div className="right">
            <Switch defaultChecked size="small"  onChange={onChange} className="distance"  style={{marginTop:-3}}/>查看权限内所有
          </div>
        </div>
        <Table size="middle"id="table"  locale={{emptyText:"暂无数据"}}  rowSelection={rowSelection} fixed  columns={this.state.columns} dataSource={this.state.list}   pagination={NormalPagination} loading={this.state.loading}/>
        <CreateForm ModalVisible={this.state.ModalVisible}  HandleCancel={this.HandleCancel} HandleModalVisible={this.HandleModalVisible} HandleAdd={this.HandleAdd}/>
        {/*<ViewTable ViewModalVisible={this.state.ViewModalVisible}  ViewHandleModalVisible={this.ViewHandleModalVisible} />*/}
      </section>
    )
  }
}


export default quotation_contract


//查看权限内所有
function onChange(checked) {
  console.log(`switch to ${checked}`);
  if(checked==false){
    message.info('已关闭查看权限内所有');
  }

}

