
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,} from  'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './main.less';

// 引入Antd的导航组件
import { Menu, Icon, Layout, Avatar,Dropdown,LocaleProvider,BackTop} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;

let routeMap = {
  '/myTable': {"key":'1-1',"sub":"sub1"},
  '/myTable/:id': {"key":'1-1',"sub":"sub1"},
  '/cadTable': {"key":'1-2',"sub":"sub1"},
  '/pcbTable': {"key":'1-3',"sub":"sub1"},
  '/smtTable':{"key":'1-4',"sub":"sub1"},
  '/colTable':{"key":'1-5',"sub":"sub1"},
  '/offerTable':{"key":'1-6',"sub":"sub1"},
  '/offerTable/:id':{"key":'1-6',"sub":"sub1"},
  '/taxRate': {"key":'2-1',"sub":"sub2"},
  '/preferentialType':{"key":'2-2',"sub":"sub2"},
  '/businessMark':{"key":'2-3',"sub":"sub2"},
  '/contractSupplier':{"key":'2-4',"sub":"sub2"},
  '/contractTemplate':{"key":'2-5',"sub":"sub2"},
  '/salesContract':{"key":'3-1',"sub":"sub3"},
  '/salesContract/:id':{"key":'3-1',"sub":"sub3"},
  '/quotationContract':{"key":'3-2',"sub":"sub3"},
  '/user':{"key":'4-1',"sub":"sub4"},
  '/role':{"key":'4-2',"sub":"sub4"},
  '/salesDepartment':{"key":'4-3',"sub":"sub4"},
};
const menu = (
  <Menu>
    <Menu.Item key="1">退出</Menu.Item>
  </Menu>
);
class Siderdemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      username: '',
      collapsed: false,
      openKeys: ['sub1'],
    };
  }
  toggle = () => {
    if(this.state.collapsed){
      this.componentWillMount();
    }else {
      this.setState({
        openKeys:[],
      })
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick=(item)=> {
    this.setState({
      current:item.key,
      openKeys: [item.keyPath[1]],
    });
  }

  componentWillMount() {
    var route = this.props.location.pathname;
    if( route.indexOf("myTable")!=-1 || route=="/"){
      this.setState({
        current: routeMap["/myTable"].key,
        openKeys:[routeMap["/myTable"].sub],
      });
    }else if(route.indexOf("salesContract")!=-1){
      this.setState({
        current: routeMap["/salesContract"].key,
        openKeys:[routeMap["/salesContract"].sub],
      });
    }else{
      this.setState({
        current: routeMap[route].key,
        openKeys:[routeMap[route].sub],
      });
    }

  }

  onOpenChange = (openKeys) => {
    const rootSubmenuKeys=['sub1', 'sub2', 'sub3', 'sub4'];
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    // this.setState({
    //     openKeys: latestOpenKey ? latestOpenKey : "",
    // });
    // console.log(this.state.openKeys)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] :[],
      });
    }
  }

  componentDidMount() {
    this.setState({
      username: 'luckykun',
    })
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ overflow: 'auto'}}
          >
            <p style={{ color: "white",lineHeight:'64px',textAlign:'center',fontSize:'16px'}}>合同管理</p>
            <Menu theme="dark"
                  onClick={this.handleClick}
                  openKeys={this.state.openKeys}
                  defaultSelectedKeys={[this.state.current]}
                  inlineCollapsed={this.state.collapsed}
                  onOpenChange={this.onOpenChange}
                  mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="bars" /><span>结算单管理</span></span>}>
                <Menu.Item key="1-1"><Link to="/myTable">客户结算单总表</Link></Menu.Item>
                <Menu.Item key="1-2"><Link to="/cadTable">CAD结算单</Link></Menu.Item>
                <Menu.Item key="1-3"><Link to="/pcbTable">PCB结算单</Link></Menu.Item>
                <Menu.Item key="1-4"><Link to="/smtTable">SMT结算单</Link></Menu.Item>
                <Menu.Item key="1-5"><Link to="/colTable">COL结算单</Link></Menu.Item>
                <Menu.Item key="1-6"><Link to="/offerTable">报价结算单列表</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="bars" /><span>合同管理</span></span>}>
                <Menu.Item key="3-1"><Link to="/salesContract">销售合同</Link></Menu.Item>
                <Menu.Item key="3-2"><Link to="/quotationContract">报价合同</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="bars" /><span>参数管理</span></span>}>
                <Menu.Item key="2-1"><Link to="/taxRate">税率管理</Link></Menu.Item>
                <Menu.Item key="2-2"><Link to="/preferentialType">优惠类型</Link></Menu.Item>
                <Menu.Item key="2-3"><Link to="/businessMark">商务标记</Link></Menu.Item>
                <Menu.Item key="2-4"><Link to="/contractSupplier">合同供方</Link></Menu.Item>
                <Menu.Item key="2-5"><Link to="/contractTemplate">合同模板</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="bars" /><span>系统管理</span></span>}>
                <Menu.Item key="4-1"><Link to="/user">用户管理</Link></Menu.Item>
                <Menu.Item key="4-2"><Link to="/role">角色权限</Link></Menu.Item>
                <Menu.Item key="4-3"><Link to="/salesDepartment">配置销售部门</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout  id="mainContainer" style={{ Height: '100vh'}}>
            <Header className="head" >
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style={{float: 'right',marginRight:"24px"}} >
                <Dropdown overlay={menu}>
                                <span className="exit">
                                    <Avatar size="small" src=""/>
                                    <span className="" style={{marginLeft:"5px"}}>{this.state.username}</span>
                                </span>
                </Dropdown>
              </div>
            </Header>
            <Content>
              { this.props.children }
              <div>
                <BackTop target={() => document.getElementById('mainContainer')}  />
                <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
              </div>
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}



export default Siderdemo
