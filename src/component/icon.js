import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/common.css';
import '../css/icon.css';
import image from './image';
export default class Icon extends Component {
    constructor(props){
        super(props);
        this.state = {checked: false};
    }
    componentDidMount(){
        this.context.addComponents(this);
    }
    render() {
        const d = this.props;
        let className = this.state.checked ?'icon checked':'icon';
        return (
            <div className={className} onClick={e => this.click(e)} onDoubleClick={e=>this.doubleClick(e)}>
                <div className="icon-img" style={image(d.icon)}/>
                <span className="icon-title">
                <span className="icon-msg">{d.name}</span>
                </span>
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
Icon.contextTypes = {
    style: PropTypes.string,
    components: PropTypes.array,
    addComponents:PropTypes.func
};