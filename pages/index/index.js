//引入代码
var app = getApp();
var httpClient = require("../../utils/request.js")
var RECOMMEND = "recommend"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    carouselsList: [],
    categoryList: [],
    todayProductList: [],
    categoryId: null,
    pageIndex: 1,
    pageSize: 6,
    hasNextPage: true,
    tabsActive: RECOMMEND
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //轮播图初始化
    httpClient.request('image/queryCarousels', {}, this.carouselsSuccess, this.carouselsFail);
    //分类列表初始化
    httpClient.request('category/queryAll', {}, this.queryAllCategorySuccess, this.queryAllCategoryFail)
    //今日推荐初始化
    this.initPageData();
  },

  /**
   * 查询商品的初始化方法
   */
  initPageData() {
    this.setData({
      pageIndex: 1,
      pageSize: 6,
      hasNextPage: true
    })
    httpClient.request('product/queryProductList', {
      "isNew": this.data.tabsActive === RECOMMEND ? 1 : null,
      "categoryId": this.data.tabsActive === RECOMMEND ? null : this.data.categoryId,
      "pageNum": this.data.pageIndex,
      "pageSize": this.data.pageSize,
    }, this.todayProductListSuccess, this.todayProductListFail);
  },

  carouselsSuccess(result) {
    this.setData({
      carouselsList: result.data,
    })
  },
  queryAllCategorySuccess(result) {
    this.setData({
      categoryList: result.data,
    })
  },
  todayProductListSuccess(result) {
    this.setData({
      todayProductList: result.data.list,
      hasNextPage: result.data.hasNextPage,
    })
  },

  /**
   * 选择tab后需要重新获取数据，和页面初始化基本一致
   * @param {} event 
   */
  onClickTabs: function (event) {
    this.setData({
      tabsActive: event.detail.name, //"推荐"tab的name是RECOMMEND
      categoryId: RECOMMEND === event.detail.name ? null : event.detail.name
    })
    this.initPageData();
  },

  /**
   * 调用刷新函数
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.setData({
      todayProductList: [],
      pageIndex: 1,
      hasNextPage: true,
    });

    //今日推荐重新加载
    this.initPageData();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 下拉加载更多
   */
  onReachBottom: function () {
    if (this.data.hasNextPage) {
      // 加载下一页的代码
      const params = {
        "isNew": this.data.tabsActive === RECOMMEND ? 1 : null,
        "categoryId": this.data.tabsActive === RECOMMEND ? null : this.data.categoryId,
        "pageNum": ++this.data.pageIndex,
        "pageSize": this.data.pageSize,
      }
      httpClient.request('product/queryProductList', params, (result) => {
        const list = this.data.todayProductList.concat(result.data.list);
        this.setData({
          hasNextPage: result.data.hasNextPage,
          todayProductList: list
        })
      }, this.todayProductListFail);
    }
  },

  onSearch: function () {
    wx.navigateTo({
      url: "../search/search"
    })
  },

  carouselsFail() {
    console.log("失败")
  },
  queryAllCategoryFail() {
    console.log("失败")
  },
  todayProductListFail() {
    console.log("失败")
  },
})