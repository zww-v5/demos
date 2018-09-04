import React, {Component} from 'react';
import {Link} from 'react-router-dom'
/**
 *
 * @class PageGuide
 * @param {string} title 项目名称
 *
 *
 */

class PageGuide extends Component {
    render() {
        var divStyle = {
            "page_guide_wrap": {"minHeight": "600px","paddingTop":"100px"},
            "pages_title": {"marginTop": "50px", "fontSize": "16px", "textAlign": "center"},
            "pages_list": {"margin": "30px auto", "maxWidth": "800px","listStyleType":"circle"},
            "pages_list_li": {"marginBottom": "10px", "paddingLeft": "15px", "position": "relative","listStyle":"circle"},
            "pages_list_a": {"display": "block", "color": "#444", "wordWrap": "break-word"}
        };
        return (
            <div className="page-guide-wrap" style={divStyle.page_guide_wrap}>
                <h1 className="pages-title" style={divStyle.pages_title}>{this.props.title||"XX"}静态页面导航</h1>
                <ul className="pages-list" style={divStyle.pages_list}>
                    
                     <li style={divStyle.pages_list_li}>
                        <Link to='/home'>首页</Link>
                    </li>

                    <li style={divStyle.pages_list_li}>
                        <Link to='/HomeLoading'>首页加载状态</Link>
                    </li>
                    
                     <li style={divStyle.pages_list_li}>
                        <Link to='/modules'>公用组件</Link>
                    </li>
                    
                     <li style={divStyle.pages_list_li}>
                        <Link to='/modal'>弹窗</Link>
                    </li>
                    
                    <li style={divStyle.pages_list_li}>
                       <Link to='/CommonTag'>常用标签</Link>
                   </li>
                    
                    <li style={divStyle.pages_list_li}>
                       <Link to='/AllTag'>全部标签</Link>
                   </li>
                    
                     <li style={divStyle.pages_list_li}>
                        <Link to='/MyFollowedTag'>我关注的标签</Link>
                    </li>
                    {/*pageRoute*/}
                </ul>

            </div>
        );
    }
}

export default PageGuide;
