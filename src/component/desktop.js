import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/desktop.css';
export default class Desktop extends Component {
    constructor(props){
        super(props);
        this.components = [];
        let onresize = ()=>{
            this.refs.element.style.height = document.body.offsetHeight-32+'px';
        };
        setTimeout(onresize, 0);
        document.body.onresize = onresize;
    }
    getChildContext(){
        return {
            components:this.components,
            addComponents:e=>this.components.push(e),
            style: 'default',
        }
    }

    render() {
        return (
            <div ref="element" className="desktop" onClick={(e)=>this.click(e)}>
                {this.props.children}
            </div>
        );
    }
    click(){
        this.components.forEach(e=>e.setState({checked:false}));
    }
}
Desktop.childContextTypes = {
    components:PropTypes.array,
    addComponents:PropTypes.func,
    style:PropTypes.string,
};