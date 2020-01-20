// pages/recommend/recommend.js
var app = getApp();
var httpClient = require("../../utils/request.js")
Page({
    data: {
        title: '',
        topProductList: {},
        topName: '',
        pageCount: 1,
        isEmpty: true,

    },

    onLoad(options) {
        //todo
        const eventChannel = this.getOpenerEventChannel()
        let $this = this;
        eventChannel.on('topName', data => {
            $this.data.topName = data
        })

        if (this.data.topName === 'today') {
            wx.setNavigationBarTitle({
                title: "今日推荐"
            })
            //todo 把请求的参数换掉
            //今日推荐初始化
            httpClient.request('product/queryProductList', {isNew: true}, this.productListSuccess, this.productListFail);
        } else if (this.data.topName === 'hot') {
            wx.setNavigationBarTitle({
                title: "爆款推荐",
            })
            //爆款推荐初始化
            httpClient.request('product/queryProductList', {}, this.productListSuccess, this.productListFail);
        }
    },

    productListSuccess(result) {
        this.data.pageCount += 1
        if (this.data.topProductList != null && this.data.topProductList.length > 0) {
            this.setData({
                topProductList: this.data.topProductList.concat(result.data.list)
            });
        } else {
            this.setData({
                topProductList: result.data.list
            });
        }
    },

    productListFail() {
        console.log("失败")
    },
    onReachBottom(event) {
        let param = {
            pageNum: this.data.pageCount,
            pageSize: 6,
            isNew: this.data.topName === 'today' ? true : false,
            orderBy: 'pageviews',
            sortType: 'desc',
        }
        httpClient.request('product/queryProductList', param, this.productListSuccess, this.productListFail);
    },
    onSearch(event){
        wx.navigateTo({
            url: "../search/search"
        })
    }
})
