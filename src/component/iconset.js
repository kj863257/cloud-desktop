import React, {Component} from 'react';
import '../css/iconset.css';
export default class Icons extends Component {
    render() {
        return (
            <div className="iconset">
                {this.props.children}
            </div>
        );
    }
}