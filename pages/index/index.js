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
      categoryId: 0,
      pageIndex: 1,
      pageSize: 6,
      hasNextPage: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        //轮播图初始化
        httpClient.request('image/queryCarousels', {}, this.carouselsSuccess, this.carouselsFail);

        //今日推荐初始化
      httpClient.request('product/queryProductList', {
        "categoryId": this.data.categoryId,
        "pageNum": this.data.pageIndex,
        "pageSize": this.data.pageSize,
      }, this.todayProductListSuccess, this.todayProductListFail);

        //爆款推荐初始化
        httpClient.request('product/queryProductList', {isNew: false}, this.hotProductListSuccess, this.hotProductListFail);
    },

    carouselsSuccess(result) {
        console.log(result.data);
        this.setData({
            carouselsList: result.data,
        })
    },
    carouselsFail() {
        console.log("失败")
    },

    todayProductListSuccess(result) {
        console.log(result.data.list);
        this.setData({
            todayProductList: result.data.list,
            hasNextPage: result.data.hasNextPage,
        })

    },
    todayProductListFail() {
        console.log("失败")
    },

    hotProductListSuccess(result) {
        console.log(result.data.list);
        this.setData({
            hotProductList: result.data.list
        })
    },
    hotProductListFail() {
        console.log("失败")
    },

    /**
     * 调用刷新函数
     */

    onPullDownRefresh: function () {

        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        this.setData({
            todayProductList: [],
            hotProductList: [],
            categoryId: 0,
            pageIndex: 1,
            pageSize: 6,
            hasNextPage: true,
        });

        //今日推荐重新加载
        httpClient.request('product/queryProductList', {
            "categoryId": this.data.categoryId,
            "pageNum": this.data.pageIndex,
            "pageSize": this.data.pageSize,
        }, this.todayProductListSuccess, this.todayProductListFail);

        //爆款推荐重新加载
        httpClient.request('product/queryProductList', {isNew: false}, this.hotProductListSuccess, this.hotProductListFail);

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

    /**
     * 下拉加载更多
     */
    onReachBottom: function() {
      console.log('触底了');
      let {categoryId, pageIndex, pageSize} = this.data;
      // 加载下一页的代码
      const params = {
        "categoryId": categoryId,
        "pageNum": ++pageIndex,
        "pageSize": pageSize,
      }
      console.log(params);
      if(this.data.hasNextPage) {
        httpClient.request('product/queryProductList', params, (result) => {
          console.log(result);
          const list = this.data.todayProductList.concat(result.data.list);
          this.setData({ categoryId, pageIndex, pageSize, hasNextPage: result.data.hasNextPage, todayProductList: list })
        }, this.todayProductListFail);
      }
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
