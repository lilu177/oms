import dva from 'dva';
import './index.css';
//import { hashHistory } from 'dva/router'
import { browserHistory } from 'dva/router'

// 1. Initialize
const app = dva({


});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
