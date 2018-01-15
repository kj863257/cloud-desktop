import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/common.css';
import '../css/taskbar.css';
import image from './image';
import Util from "../util/util";
export default class Taskbar extends Component {
    constructor(props){
        super(props);
        this.state = {checked: false};
    }
    componentDidMount(){
        this.context.addComponents(this);
    }
    render() {
        const d = this.props;
        return (
            <div className={Util.defClassName(this,'taskbar')}>
                <div className="taskbar-btn">
                    <i className="taskbar-btn-logo"/>
                    <span>开始</span>
                </div>
            </div>
        );
    };
    click(e) {
        e.stopPropagation();
        this.context.components.forEach(e=>e.setState({checked:false}));
        this.setState({checked:true});
    }
    doubleClick() {

    }
}
Taskbar.contextTypes = {
    components: PropTypes.array,
    addComponents:PropTypes.func,
};