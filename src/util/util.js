import React, {Component} from 'react';
let matchClass = function(name){
    return new RegExp('(' + name + '\s+)|(\s+' + name + ')|(^' + name + ')$', 'g');
};
let replaceMatch = function(name){
    return new RegExp('(\s*'+name+')|('+name+'\s*)|(^\s*'+name+'\s*$)', 'g');
};
let util = {
    getSiblings:(e)=>{
        let previous = [];
        let next = [];
        let getNext = (arr,e) => {
            if(e){
                arr.push(e);
                getNext(arr, e.nextSibling);
            }
            return arr;
        };
        let getPrev = (arr, e) => {
            if(e){
                getPrev(arr, e.previousSibling);
                arr.push(e);
            }
            return arr;
        };
        return getPrev(previous, e).concat(getNext(next, e));
    },
    addClass:(e, className)=>{
        if(!util.hasClass(e, className)){
            if(e.className !== ''){
                e.className += ' ';
            }
            e.className += className;
        }
    },
    removeClass:(e, className)=>{
        e.className = e.className.replace(replaceMatch(className), '');
    },
    hasClass:(e, className)=>{
        return matchClass(className).test(e.className);
    },
    defClassName:(_this,e)=>{
        return _this.state.checked ? e + ' checked':e;
    }
};
export default util;