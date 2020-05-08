Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopCart: [],
        selectItem: [],
        checkAll: false,
        totalValue: 0,
        showList: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let cart = wx.getStorageSync('cart') || [];
        console.log(cart);
        this.setData({
            shopCart: cart,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    },

    // 单选
    onCheckBoxChange: function (event) {
        this.setData({
            selectItem: event.detail
        });
        if (this.data.selectItem.length === this.data.shopCart.length) {
            this.setData({
                checkAll: true,
            })
        } else {
            this.setData({
                checkAll: false,
            })
        }
        this.caculateTotalPrice();
    },
    // 全选
    onSelectAllChange: function (event) {
        if (event.detail) {
            let select = [];
            for (let i = 0; i < this.data.shopCart.length; i++) {
                select.push(i+'');
            }
            this.setData({
                selectItem: select
            });
        } else {
            this.setData({
                selectItem: []
            });
        }
        this.setData({
            checkAll: event.detail,
        })
        this.caculateTotalPrice();
    },
    
    caculateTotalPrice: function () {
        let price = 0;
        this.data.selectItem.forEach(value => {
            price += this.data.shopCart[value].originalPrice * this.data.shopCart[value].num;
        });
        console.log(price);
        this.setData({
            totalValue: price * 100
        })
    },

    onClickButton: function () {
        if (this.data.selectItem.length == 0) {
            wx.showToast({
                title: '请选择要购物的物品',
                icon: 'none',
                duration: 2000
            });
        } else {
            this.setData({
                showList: true
            })
        }
    },

    hideList: function () {
        this.setData({
            showList: false
        })
    }
});