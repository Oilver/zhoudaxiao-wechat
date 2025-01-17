var app = getApp();

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail) {
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: app.globalData.host + url,
        //todo 小程序用的查询接口暂时都不需要token
        // header: {
        //     "token": token
        // },
        data: postData,
        method: 'POST',
        success: function (result) {
            doSuccess(result.data);
        },
        fail: function () {
            doFail();
        },
    })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
    wx.request({
        url: app.globalData.host + url,
        method: 'GET',
        success: function (result) {
            doSuccess(result.data);
        },
        fail: function () {
            doFail();
        },
    })
}


module.exports.request = request;
module.exports.getData = getData;
