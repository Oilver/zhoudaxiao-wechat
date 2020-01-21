// pages/recommend/recommend.js
var httpClient = require("../../utils/request.js")
Page({
    data: {
        title: '',
        topProductList: [],
        topName: '',
        pageNum: 1,
        isEmpty: true,
    },

    onLoad(options) {
        const eventChannel = this.getOpenerEventChannel()
        let $this = this;
        eventChannel.on('topName', data => {
            $this.data.topName = data
        })
        this.initData()
    },

    initData() {
        if (this.data.topName === 'today') {
            wx.setNavigationBarTitle({
                title: "今日推荐"
            })
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
        //如果不为空就进行数组追加
        if (result.data.list != null && result.data.list.length > 0) {
            this.setData({
                topProductList: this.data.topProductList.concat(result.data.list)
            });
            this.data.pageNum += 1;
        }
    },

    productListFail() {
        console.log("失败")
    },

    /**
     * 页面上拉触底事件的处理函数
     * 监听用户上拉触底事件。
     * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
     * 在触发距离内滑动期间，本事件只会被触发一次。
     */
    onReachBottom(event) {
        let param = {
            pageNum: this.data.pageNum,
            pageSize: 6,
            isNew: this.data.topName === 'today',
            orderBy: 'pageviews',
            sortType: 'desc',
        }
        httpClient.request('product/queryProductList', param, this.productListSuccess, this.productListFail);
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh: function () {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        this.data.pageNum = 1;
        this.data.topProductList = [];
        this.initData();
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

    /**
     * 进入搜索界面
     * @param event
     */
    onSearch(event) {
        wx.navigateTo({
            url: "../search/search"
        })
    }
})
