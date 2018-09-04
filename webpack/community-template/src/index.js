import './css/base.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom'
import PageGuide from './pages/PageGuide'
import * as Column from './projects/column/';
                        {/*pageImport*/}





const rootEl = document.getElementById('root');

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={PageGuide}/> {/*导航页*/}
            
            <Route exact path='/home' component={home}/>

            <Route exact path='/HomeLoading' component={HomeLoading}/>
            
            <Route exact path='/modules' component={modules}/>
            
            <Route exact path='/modal' component={modal}/>
            
            <Route exact path='/CommonTag' component={Tag.CommonTag}/>

            <Route exact path='/AllTag' component={Tag.AllTag}/>
            
            <Route exact path='/MyFollowedTag' component={UserCenter.FollowedTag}/>
            {/*pageRoute*/}
        </div>
    </Router>
    , rootEl);