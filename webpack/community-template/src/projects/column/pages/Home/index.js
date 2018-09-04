import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

// 导入社区公用组件
import { 
    AskPanels,
} from '../../../../components';

// 导入项目公用组件
import { 
    AskPanels,
} from '../../components';

// 页面自身样式
import './Home.css';

/*
* @class Home
* @param {String} hotrep : tcss hotrep属性
* @param {Array} xxxxx : 参数的说明
*/

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={'Home'}>
                这是Home
            </div>
        );
    }
}
export default Home;