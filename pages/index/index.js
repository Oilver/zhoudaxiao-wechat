//引入代码
var app = getApp();
var httpClient = require("../../utils/request.js")

Page({
    /**
     * 页面的初始数据
     */
    data: {
      carouselsList: [],
      todayProductList: [],
      hotProductList: [],
      background: ['demo-1', 'demo-2', 'demo-3'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        //轮播图初始化
        httpClient.request('image/queryCarousels', {}, this.carouselsSuccess, this.carouselsFail);

        //今日推荐初始化
        httpClient.request('product/queryProductList', {isNew: true}, this.todayProductListSuccess, this.todayProductListFail);

        //爆款推荐初始化
        httpClient.request('product/queryProductList', {isNew: false}, this.hotProductListSuccess, this.hotProductListFail);
    },

    carouselsSuccess(result) {
        this.setData({
            carouselsList: result.data
        })
    },
    carouselsFail() {
        console.log("失败")
    },

    todayProductListSuccess(result) {
        this.setData({
            todayProductList: result.data.list
        })

    },
    todayProductListFail() {
        console.log("失败")
    },

    hotProductListSuccess(result) {
        this.setData({
            hotProductList: result.data.list
        })
    },
    hotProductListFail() {
        console.log("失败")
    },


    /**
     * 跳转到详情页
     */
    onDetailTap(event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?id=" + id
        })
    },
    /**
     * 跳转到今日推荐或者爆款推荐
     */
    //todo 换成eventChannel方式传递数据
    onRecommendTap(event) {
        var topName = event.currentTarget.dataset.type;
        wx.navigateTo({
            url: "../recommend/recommend",
            success(res) {
                res.eventChannel.emit('topName', topName) //todo 这里的数据可以传一个对象，如 {data: topName}
            }
        })
    },

    /**
     * 调用刷新函数
     */

    onPullDownRefresh: function () {

        // 显示顶部刷新图标
        wx.showNavigationBarLoading();

        //今日推荐重新加载
        httpClient.request('product/queryProductList', {isNew: true}, this.todayProductListSuccess, this.todayProductListFail);

        //爆款推荐重新加载
        httpClient.request('product/queryProductList', {isNew: false}, this.hotProductListSuccess, this.hotProductListFail);

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

    onSearch: function() {
      wx.navigateTo({
        url: "../search/search"
      })
    },

  onClickTabs: function(event) {
    console.log(event.detail);
    console.log(event.detail.index);
  }


})
