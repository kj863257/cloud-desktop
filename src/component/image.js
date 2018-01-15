import React, {Component} from 'react';
export default function (name) {
    let img = require('../image/' + name + ".png");
    return {
        backgroundImage:'url('+img+')'
    };
}
