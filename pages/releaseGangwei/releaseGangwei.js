// pages/releaseGangwei/releaseGangwei.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    name: '',
    jingyanArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '应届毕业生'
      },
      {
        id: 2,
        name: '3年以内'
      },
      {
        id: 3,
        name: '3-5年'
      },
      {
        id: 4,
        name: '5-10年'
      },
      {
        id: 5,
        name: '10年以上'
      }
    ],
    jingyan: {},
    xueliArray: [
      {
        id: 1,
        name: '不限'
      },
      {
        id: 4,
        name: '高中'
      },
      {
        id: 5,
        name: '大专'
      },
      {
        id: 6,
        name: '本科'
      },
      {
        id: 7,
        name: '硕士'
      },
      {
        id: 8,
        name: '博士'
      }
    ],
    xueli: {},
    moneyArray: [
      {
        id: 1,
        name: '不限'
      },
      {
        id: 2,
        name: '小于2k'
      },
      {
        id: 3,
        name: '2-5k'
      },
      {
        id: 4,
        name: '5-10k'
      },
      {
        id: 5,
        name: '10-15k'
      },
      {
        id: 6,
        name: '15-25k'
      },
      {
        id: 7,
        name: '25-50k'
      },
      {
        id: 8,
        name: '50k+'
      }
    ],
    money: {},
    tagArray: [],
    addTag: false,
    tagVal:'',
    maxlengthModal: false,
    delModal: false,
    delId: '',
    chooseActive: 'used',
    address: '',
    btnChoose: '',
    userInfo: null,
    common: null,
    cityList: [],
    areaList: [],
    cityChooseMask: false,
    gangweiTextareaMaskBox: false,
    instruction: '',
    yaoqiuTextareaMaskBox: false,
    requirement: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc
    })
    this.getData()
  },
  // 岗位名字
  nameChange (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 打开城市选择
  openChooseCity () {
    this.setData({
      cityChooseMask: true
    })
  },
  // 选择城市
  chooseBtn(e) {
    this.setData({
      btnChoose: e.currentTarget.dataset.id,
      address: e.currentTarget.dataset.ida,
      cityChooseMask: false
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
  tagValChange (e) {
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
  addTagCancel () {
    this.setData({
      addTag: false
    })
  },
  // 岗位职责
  goGangweizhize() {
    this.setData({
      gangweiTextareaMaskBox: true
    })
  },
  // 关闭岗位职责
  choseGangwei() {
    this.setData({
      gangweiTextareaMaskBox: false
    })
  },
  // 任职要求
  goRenzhiyaoqiu() {
    this.setData({
      yaoqiuTextareaMaskBox: true
    })
  },
  // 关闭任职要求
  choseYaoqiu() {
    this.setData({
      yaoqiuTextareaMaskBox: false
    })
  },
  // 岗位职责输入框输入内容
  gangweiChange(e) {
    this.setData({
      instruction: e.detail.value
    })
  },
  // 任职要求输入框输入内容
  zhizeChange(e) {
    this.setData({
      requirement: e.detail.value
    })
  },
  // 经验要求
  jingyanChange(e) {
    this.setData({
      jingyan: this.data.jingyanArray[e.detail.value]
    })
  }, 
  // 学历
  xueliChange(e) {
    this.setData({
      xueli: this.data.xueliArray[e.detail.value]
    })
  },
  // 月薪
  moneyChange(e) {
    this.setData({
      money: this.data.moneyArray[e.detail.value]
    })
  },
  // 发布
  saveRelease() {
    let name = this.data.name
    let btnChoose = this.data.btnChoose
    let job_experience = this.data.jingyan.id
    let education = this.data.xueli.id
    let salary_range = this.data.money.id
    let instruction = this.data.instruction
    let requirement = this.data.requirement
    let job_label1 = this.data.tagArray[0] || ''
    let job_label2 = this.data.tagArray[1] || ''
    let job_label3 = this.data.tagArray[2] || ''
    if (name == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入岗位名称',
      })
    } else if (btnChoose == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择工作地点',
      })
    } else if (job_experience == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择经验要求',
      })
    } else if (education == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择学历',
      })
    } else if (salary_range == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择月薪',
      })
    } else if (instruction == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入岗位职责',
      })
    } else if (requirement == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入任职要求',
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '提交中...',
      })
      wx.request({
        url: `${app.globalData.baseUrl}/Work/publish.html`,
        data: {
          sess_key: app.globalData.sess_key,
          name: name, 
          city_code: btnChoose,
          job_experience: job_experience,
          education: education,
          salary_range: salary_range,
          instruction: instruction,
          requirement: requirement,
          job_label1: job_label1,
          job_label2: job_label2,
          job_label3: job_label3
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '../home/home'
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