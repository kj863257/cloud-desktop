import React from 'react';
import ReactDOM from 'react-dom';
import Desktop from './component/desktop';
import Icon from './component/icon';
import Iconset from './component/iconset';
import Taskbar from './component/taskbar';
require(['./util/ready'], function (ready) {
    ready(() => {
        ReactDOM.render(
            <Desktop>
                <Iconset>
                    <Icon name={"我的文档"} icon={"document"}/>
                    <Icon name={"我的电脑"} icon={"computer"}/>
                    <Icon name={"网上邻居"} icon={"network"}/>
                    <Icon name={"回收站"} icon={"recycle-bin"}/>
                    <Icon name={"Internet Explorer"} icon={"internet"}/>
                </Iconset>
                <Taskbar/>
            </Desktop>
            ,
            document.getElementById('root'));
    });
});
