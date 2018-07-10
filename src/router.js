import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import Main from './routes/Main';
// 引入单个页面（包括嵌套的子页面）
import myTable from './components/Settlement/table.js';
import cadTable from './components/Settlement/cad.js';
import pcbTable from './components/Settlement/pcb.js';
import smtTable from './components/Settlement/smt.js';
import colTable from './components/Settlement/col.js';
import offerTable from './components/Settlement/offer.js';
import myTableDetail from './components/Settlement/table_detail';
import offerTableDetail from './components/Settlement/offer_detail';
import  taxRate  from './components/Parameter/tax_rate';
import preferentialType from './components/Parameter/preferential_type'
import businessMark from "./components/Parameter/business_mark";
import contractSupplier from "./components/Parameter/contract_supplier";
import contractTemplate from './components/Parameter/contract_template';
import salesContract from './components/Sale/sales_contract';
import quotationContract from './components/Sale/quotation_contract';
import saleDetail from "./components/Sale/sale_detail";
import user from './components/System/user';
import role from './components/System/role';
import salesDepartment from './components/System/sales_department';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={myTable}/>
        <Route path="/myTable" component={myTable} />
        <Route path="/cadTable" component={cadTable} />
        <Route path="/pcbTable" component={pcbTable} />
        <Route path="/smtTable" component={smtTable} />
        <Route path="/colTable" component={colTable} />
        <Route path="/offerTable" component={offerTable} />
        <Route path="/myTable/:id" component={myTableDetail} />
        <Route path="/offerTable/:id" component={offerTableDetail} />
        <Route path="/taxRate" component={taxRate} />
        <Route path="/preferentialType" component={preferentialType} />
        <Route path="/businessMark" component={businessMark} />
        <Route path="/contractSupplier" component={contractSupplier} />
        <Route path="/contractTemplate" component={contractTemplate}/>
        <Route path="/salesContract" component={salesContract} />
        <Route path="/quotationContract" component={quotationContract}/>
        <Route path="/quotationContract/:id" component={saleDetail} />
        <Route path="/salesContract/:id" component={saleDetail} />
        <Route path="/user" component={user}/>
        <Route path="/role" component={role}/>
        <Route path="/salesDepartment" component={salesDepartment}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;

