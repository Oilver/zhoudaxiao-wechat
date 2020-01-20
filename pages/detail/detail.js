// pages/detail/detail.js
var httpClient = require("../../utils/request.js")

Page({

    data: {
        productDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        httpClient.request('product/query?id=' + options.id, null, this.querySuccess, this.queryFail);
    },

    querySuccess(result) {
        this.setData({
            productDetail: result.data
        })
    },
    queryFail() {
        console.log("失败")
    },
})
