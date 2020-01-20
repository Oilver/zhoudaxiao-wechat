// pages/search/search.js
var app = getApp();
var httpClient = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    searchName:'',
    SearchProductList:''
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });

  },
  //清空输入内容
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (res) {
  //搜索数据
    this.setData(
        {
      inputVal: res.detail.value
    });
  },
  //获取输入的值，对比是否字符串，是直接请求数据，不是就返回查询不到内容
  onSearch(){
    this.data.searchName = this.data.inputVal
    console.log(this.data.searchName)
        if(this.data.searchName!=null||this.data.searchName!=''){
          httpClient.request('product/queryProductList',
              {orderBy: 'pageviews',
                sortType: 'desc',
                productName: this.data.searchName},
              this.searchProductListSuccess, this.searchProductListFail);
        }
        else {
          wx.showToast({
            title: '查询不到结果！',
            icon: 'loading',
            duration: 1500
          })
        }
        },
  searchProductListSuccess(result) {
    this.setData({
      SearchProductList: result.data.list
    })
    console.log(this.data.SearchProductList)
  },
  searchProductListFail() {
    console.log("失败")
  }
})
