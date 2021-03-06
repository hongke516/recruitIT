// pages/bbs/bbs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    releaseMark: false,
    topFilterBtn: 1,
    shaixuanArray: [
      {
        id: 1,
        name: '工程师'
      },
      {
        id: 2,
        name: '企业HR'
      },
      {
        id: 3,
        name: '经纪人'
      }
    ],
    shaixuan: '',
    page: 1,
    listData: [],
    loading: false,
    pickerVal: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.getList()
  },
  // top改变
  topFilter(e) {
    let key = e.currentTarget.dataset.id
    if (key == 3) {
      this.setData({
        topFilterBtn: key,
        page: 1
      })
    } else {
      this.setData({
        topFilterBtn: key,
        page: 1,
        shaixuan: '',
        pickerVal: 0
      })
      this.getList()
    }
  },
  // 获取列表
  getList() {
    this.setData({
      loading: true
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Post/getPostList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        user_type: this.data.shaixuan,
        type: this.data.topFilterBtn,
        page: this.data.page,
        page_size: 10
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.post_list
        console.log(listData)
        if (listData.length > 0) {
          let newList = this.data.listData
          this.setData({
            listData: [...newList, ...listData],
            page: this.data.page + 1
          })
        }
        this.setData({
          loading: false
        })
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 筛选
  shaixuanChange (e) {
    this.setData({
      shaixuan: this.data.shaixuanArray[e.detail.value].id
    })
    this.getList()
  },
  // 发布帖子
  goReleaseBbs() {
    wx.navigateTo({
      url: '../releaseBbs/releaseBbs'
    })
  },
  // 发布岗位
  goReleaseGangwei() {
    wx.navigateTo({
      url: '../releaseGangwei/releaseGangwei'
    })
  },
  // 发布项目
  goReleaseProject() {
    wx.navigateTo({
      url: '../releaseProject/releaseProject'
    })
  },
  // 进入首页
  goHome() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  // 进入赏金平台
  goBountyPlatform() {
    wx.navigateTo({
      url: '../bountyPlatform/bountyPlatform'
    })
  },
  // 发布
  goRelease() {
    this.setData({
      releaseMark: true
    })
  },
  closeRelease() {
    this.setData({
      releaseMark: false
    })
  },
  // 进入我的
  goMy() {
    if (this.data.userType === 'engineer' && this.data.userInfo.identity_auth.is_engineer == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else if (this.data.userType === 'hr' && this.data.userInfo.identity_auth.is_hr == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else if (this.data.userType === 'agent' && this.data.userInfo.identity_auth.is_agent == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else {
      wx.navigateTo({
        url: '../my/my'
      })
    }
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})