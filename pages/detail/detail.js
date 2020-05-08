// pages/detail/detail.js
var httpClient = require("../../utils/request.js")

Page({

    data: {
        productDetail: {
          imageEntityList:[],
          category: {},
          monthlySales: '0',
          name: '',
          originalPrice: 0,
          stock: 0,
          num: 1,
        },

},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      console.log(options);
      wx.setNavigationBarTitle({
        title: '商品详情',
      })
      httpClient.request('product/query?id=' + options.id, null, this.querySuccess, this.queryFail);
    },

    querySuccess(result) {
      this.setData({
          productDetail: result.data
      });
        console.log(result);
        console.log(result);
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
      showModalStatus: true,
      'productDetail.num': 1
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
  },

  navToShopCart: function() {
    wx.reLaunch({
      url: '/pages/shopcart/shopcart',
    })
  },

  // 加入购物车
  addToShopCart: function () {
    //1. 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[];
    console.log(cart);
    //2. 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex( v=> v.id === this.data.productDetail.id);
    if (index === -1) {
      // 不存在 第一次添加
      this.data.productDetail.num = 1;
      cart.push(this.data.productDetail);
    } else {
      //已存在购物车中，数字加一
      cart[index].num += this.data.productDetail.num || 1;
    }
    //5. 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    this.hideModal();
    //6. 弹窗提示
    wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true
    })
  },

  buyNumChange: function (e) {
      this.setData({
          'productDetail.num': e.detail
      });
      console.log(this.data.productDetail);
  }
});
