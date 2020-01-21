//logs.js
var httpClient = require("../../utils/request.js")

Page({
    data: {
        categoryList: [],
        currentTab: null,
        categoryId: null,
        productList: [],
    },

    /**
     * 生命周期
     * 初始化
     */
    onLoad() {
        httpClient.request('category/queryAll', {}, this.queryAllSuc, this.queryAllFail);
    },
    queryAllSuc(result) {
        this.setData({
            categoryList: result.data,
            currentTab: 0,
            categoryId: result.data[0].id
        })
        this.queryProductListByCategoryId()
    },
    queryAllFail: function () {
        console.log("失败")
    },

    queryProductListSuc(result) {
        this.setData({
            productList: result.data.list,
        })
    },

    queryProductListFail() {
        console.log("失败")
    },

    queryProductListByCategoryId() {
        let param = {
            categoryId: this.data.categoryId
        }
        httpClient.request('product/queryProductList', param, this.queryProductListSuc, this.queryProductListFail);
    },

    // 导航切换监听
    navbarTap(event) {
        this.setData({
            currentTab: event.target.dataset.idx
        });
        this.data.categoryId = this.data.categoryList[this.data.currentTab].id
        this.queryProductListByCategoryId()
    },
    onSearch(event) {
        wx.navigateTo({
            url: "../search/search"
        })
    }
})
