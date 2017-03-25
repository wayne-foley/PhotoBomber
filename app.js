/** @jsx React.DOM */

var ReactDOM = require('react-dom');
var React = require('react');
var PhotoGallery = require('./components/PhotoGallery');

var mountNode = document.getElementById('react-main-mount');
var props = window.PROPS;

ReactDOM.render(<PhotoGallery data={ props } />, mountNode);