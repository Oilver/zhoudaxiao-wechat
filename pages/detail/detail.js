// pages/detail/detail.js
var httpClient = require("../../utils/request.js")

Page({

    data: {
        productDetail: {
          imageEntityList:[
            {
              bucketKey: "product/2020-01-12-23:20:12-WechatIMG17.jpeg",
              id: 7,
              isAvatar: true,
              isCarousel: false,
              priority: 1,
              productId: 1,
              url: "https://yiseven-1300292849.cos.ap-guangzhou.myqcloud.com/product/2020-01-12-23:20:12-WechatIMG17.jpeg"},
            {
              bucketKey: "product/2020-01-12-23:20:12-WechatIMG17.jpeg",
              id: 7,
              isAvatar: true,
              isCarousel: false,
              priority: 1,
              productId: 1,
              url: "https://yiseven-1300292849.cos.ap-guangzhou.myqcloud.com/product/2020-01-12-23:20:12-WechatIMG17.jpeg"},
            {
              bucketKey: "product/2020-01-12-23:20:12-WechatIMG17.jpeg",
              id: 7,
              isAvatar: true,
              isCarousel: false,
              priority: 1,
              productId: 1,
              url: "https://yiseven-1300292849.cos.ap-guangzhou.myqcloud.com/product/2020-01-12-23:20:12-WechatIMG17.jpeg"
            },
          ]
        },
        category: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      wx.setNavigationBarTitle({
        title: '商品详情',
      })
      httpClient.request('product/query?id=' + options.id, null, this.querySuccess, this.queryFail);
    },

    querySuccess(result) {
        // this.setData({
        //     productDetail: result.data
        // })
    },
    queryFail() {
        console.log("失败")
    },

  //点击我显示底部弹出框
  showModal: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})
