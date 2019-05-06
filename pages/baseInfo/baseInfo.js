// pages/baseInfo/baseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    xingbieArray: [
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      }
    ],
    xingbie: {},
    birthday: '',
    shenfenArray: [
      {
        id: 1,
        name: '职场人生'
      },
      {
        id: 2,
        name: '应届生'
      }
    ],
    shenfen: {},
    workTime: '',
    tagArray: [],
    addTag: false,
    tagVal: '',
    maxlengthModal: false,
    delModal: false,
    delId: '',
    baseInfo: '',
    name: '',
    phone: '',
    email: '',
    work: '',
    city: '',
    cityChooseMask: false,
    chooseActive: 'used',
    btnChoose: '',
    userInfo: null,
    common: null,
    cityList: [],
    areaList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let baseInfo = app.globalData.baseInfo.user_info
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc,
      baseInfo: app.globalData.baseInfo,
      name: baseInfo.username,
      phone: baseInfo.mobile,
      email: baseInfo.email,
      work: baseInfo.job_name,
      birthday: baseInfo.birthday,
      xingbie: baseInfo.gender == 1 ? { id: 1, name: '男' } : { id: 2, name: '女' },
      shenfen: baseInfo.identity == 1 ? { id: 1, name: '职场人生' } : { id: 2, name: '应届生' },
      workTime: baseInfo.work_begin_time,
      city: baseInfo.city_name,
      btnChoose: baseInfo.city_code,
      tagArray: [baseInfo.label1, baseInfo.label2, baseInfo.label3]
    })
    this.getData()
  },
  // 名字改变
  nameChange (e) {
    console.log(4, e)
    this.setData({
      name: e.detail.value
    })
  },
  // 手机号码改变
  phoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // email改变
  emailChange(e) {
    this.setData({
      email: e.detail.value
    })
  },
  // 岗位改变
  workChange(e) {
    this.setData({
      work: e.detail.value
    })
  },
  // 添加标签
  addTag() {
    this.setData({
      tagVal: '',
      addTag: true
    })
  },
  // 监听输入改变
  tagValChange(e) {
    this.setData({
      tagVal: e.detail.detail.value
    })
  },
  // 取消删除
  cancelDel() {
    this.setData({
      delModal: false,
      delId: ''
    })
  },
  // 确认删除
  confirmDel() {
    let tagArray = this.data.tagArray
    let delId = this.data.delId
    let newTagArray = tagArray.filter((el, index) => {
      return el !== delId
    })
    this.setData({
      tagArray: newTagArray,
      delModal: false
    })
  },
  // 删除标签
  delTag(e) {
    this.setData({
      delModal: true,
      delId: e.currentTarget.dataset.id
    })
  },
  // 关闭最长提示
  maxlengthModalClose() {
    this.setData({
      maxlengthModal: false
    })
  },
  // 添加标签--确认
  addTagOk() {
    let tagVal = this.data.tagVal
    if (tagVal !== '') {
      let tagArray = this.data.tagArray
      if (tagArray.length > 2) {
        this.setData({
          addTag: false,
          maxlengthModal: true
        })
      } else {
        tagArray.push(tagVal)
        this.setData({
          tagArray: tagArray,
          addTag: false
        })
      }
    }
  },
  // 添加标签--取消
  addTagCancel() {
    this.setData({
      addTag: false
    })
  },
  // 参加工作时间
  workTimeChange(e) {
    this.setData({
      workTime: e.detail.value
    })
  },
  // 当前身份
  shenfenChange(e) {
    this.setData({
      shenfen: this.data.shenfenArray[e.detail.value]
    })
  },
  // 出生日期
  birthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  // 性别
  xingbieChange(e) {
    this.setData({
      xingbie: this.data.xingbieArray[e.detail.value]
    })
  },
  // 打开选择城市
  openChooseCity () {
    this.setData({
      cityChooseMask: true
    })
  },
  // 保存
  saveInfo () {
    console.log(333, this.data)
    let name = this.data.name
    let xingbie = this.data.xingbie.id
    let workTime = this.data.workTime
    let identity = this.data.shenfen.id
    let phone = this.data.phone
    let email = this.data.email
    let job_name = this.data.work
    let city_code = this.data.btnChoose
    let tagArray = this.data.tagArray
    let birthday = this.data.birthday
    if (name == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入真实姓名',
      })
    } else if (xingbie == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择性别',
      })
    } else if (birthday == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择出生日期',
      })
    } else if (identity == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择当前身份',
      })
    } else if (workTime == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择参加工作时间',
      })
    } else if (phone == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入手机号',
      })
    } else if (email == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入联系邮箱',
      })
    } else if (job_name == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入所在岗位',
      })
    } else if (city_code == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择所在城市',
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '保存中...',
      })
      wx.request({
        url: `${app.globalData.baseUrl}/Resume/resumeFillBasic.html`,
        data: {
          sess_key: app.globalData.sess_key,
          user_name: name,
          gender: xingbie,
          work_begin_time: workTime,
          identity: identity,
          mobile: phone,
          email: email,
          job_name: job_name,
          city_code: city_code,
          label1: tagArray[0] || '',
          label2: tagArray[1] || '',
          label3: tagArray[2] || '',
          birthday: birthday
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          })
        },
        fail: (res) => {
          wx.showToast({
            icon: 'none',
            title: '网络请求失败',
          })
        }
      })
    }
  },
  // 初始化获取数据
  getData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Addr/chooseDistrict.html`,
      data: {
        sess_key: app.globalData.sess_key,
        lat: this.data.userInfo.lat,
        lng: this.data.userInfo.lng
      },
      method: 'POST',
      success: (res) => {
        let resData = res.data.bizobj.data
        this.setData({
          cityList: resData.prov_list,
          common: resData.common
        })
        console.log(resData)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 左侧选择省份
  chooseCity(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      chooseActive: key
    })
    if (key !== 'used' && key !== 'municipality') {
      this.getProv2CityList(key)
    }
  },
  getProv2CityList(code) {
    wx.request({
      url: `${app.globalData.baseUrl}/Addr/prov2CityList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        prov_code: code
      },
      method: 'POST',
      success: (res) => {
        let resData = res.data.bizobj.data
        this.setData({
          areaList: resData.area_list
        })
        console.log(resData)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 选择城市
  chooseBtn(e) {
    this.setData({
      btnChoose: e.currentTarget.dataset.id,
      city: e.currentTarget.dataset.ida,
      cityChooseMask: false
    })
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