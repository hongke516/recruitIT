// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstMask: true,
    noAuthWrap: false,
    imgSrc: '',
    authMask: false,
    noLocation: false,
    password: false,
    passwordMask: false,
    lat: '',
    lng: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.initAuto()
    }, 1000)
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 授权成功后添加用户信息
  addUserInfo(data) {
    let obj = app.globalData.userInfo || {}
    obj['avatar'] = data.avatarUrl
    obj['gender'] = data.gender
    obj['nickname'] = data.nickName
    Object.assign(app.globalData.userInfo, obj)
    this.updateUserinfo()
  },
  // 更新用户信息
  updateUserinfo () {
    let data = app.globalData.userInfo
    console.log(4555, data)
    wx.request({
      url: `${app.globalData.baseUrl}/User/updateUserInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        nickname: data.nickname,
        avatar: data.avatar,
        gender: (data.gender),
        lat: (data.lat),
        lng: (data.lng)
      },
      method: 'POST',
      success: (res) => {
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 初始化判断授权
  initAuto() {
    this.setData({
      firstMask: false
    })
    if (app.globalData.has_password == 1) {
      // 有密码的情况
      if (app.globalData.need_auth == 1) {
        // 需要强制授权
        this.setData({
          password: true
        })
        this.initLocation()
        // this.initUserInfo()
      } else {
        // 不需要强制授权，去登录页面
        this.setData({
          passwordMask: true
        })
      }
    } else {
      // 没有密码必须要强制授权
      this.initLocation()
      // this.initUserInfo()
    }
  },
  // 打开登录提示
  openPassword() {
    this.setData({
      passwordMask: true
    })
  },
  // 初始化地理信息
  initLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('位置授权成功回调', res)
        this.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        let obj = app.globalData.userInfo || {}
        obj['lat'] = res.latitude
        obj['lng'] = res.longitude
        Object.assign(app.globalData.userInfo, obj)
        this.initUserInfo()
      },
      fail: (res) => {
        this.setData({
          noLocation: true
        })
      }
    })
  },
  // 关闭位置不授权提示弹框
  closeNoLocation() {
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.initLocation()
          this.setData({
            noLocation: false
          })
        }
      }
    })
  },
  // 初始化用户授权信息
  initUserInfo(on) {
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log('个人信息', res)
              this.addUserInfo(res.userInfo)
              if (this.data.password) {
                this.openPassword()
              }
            }
          })
        } else {
          this.setData({
            authMask: true
          })
        }
      }
    })
  },
  // 用户拒绝授权
  noAuto() {
    this.setData({
      noAuthWrap: false
    })
  },
  // 进入登录页面
  goPassword() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 获取城市信息
  getCityInfo(lat, lng, on) {
    wx.request({
      url: `${app.globalData.baseUrl}/User/getUserLocation.html`,
      data: {
        sess_key: app.globalData.sess_key,
        lat: lat,
        lng: lng
      },
      method: 'POST',
      success: (res) => {
        let data = res.data.bizobj
        ? res.data.bizobj.location_info
        : {}
        let obj = app.globalData.userInfo || {}
        console.log(obj)
        console.log(data)
        obj['city_code'] = data.city_code
        obj['city_name'] = data.city_name
        obj['lat'] = lat
        obj['lng'] = lng
        Object.assign(app.globalData.userInfo, obj)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 获取用户信息
  autoGetUserInfo(res) {
    if (res.detail.userInfo) {
      this.setData({
        authMask: false,
        noAuthWrap: false
      })
      this.addUserInfo(res.detail.userInfo)
      if (this.data.password) {
        this.openPassword()
      }
    }
  },
  // 用户授权结果回调
  bindgetuserinfo(res) {
    if (res.detail.errMsg === "getUserInfo:fail auth deny") {
      this.setData({
        noAuthWrap: true
      })
    } else {
      this.setData({
        authMask: false
      })
      this.addUserInfo(res.detail.userInfo)
      if (this.data.password) {
        this.openPassword()
      }
    }
  },
  goHomePage(e) {
    let key = e.currentTarget.dataset.id
    app.globalData.userType = key
    wx.navigateTo({
      url: '../home/home'
    })
    // wx.navigateTo({
    //   url: '../home/home'
    // })
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

  }
})