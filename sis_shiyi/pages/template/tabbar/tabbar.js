var app = getApp(), _function = require("../../../resource/function/function.js");

Page({
    onLoad: function() {
        _function.system(this);
    }
});