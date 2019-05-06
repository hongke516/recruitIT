// pages/goodJob/goodJob.js
const app = getApp()
let goodJobTimer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    userInfo: null,
    page: 1,
    imgSrc: '',
    topFilterBtn: '',
    maskOnOff: false,
    jingyanData: [
      [{
        id: '',
        name: '不限'
      }, {
        id: '1',
        name: '应届毕业生'
      }, {
        id: '2',
        name: '3年以内'
        }],
      [{
        id: '3',
        name: '3-5年'
      }, {
        id: '4',
          name: '5-10年'
      }, {
        id: '5',
        name: '10年以上'
      }]
    ],
    jingyanChoose: '',
    xueliData: [
      [{
        id: '1',
        name: '不限'
      }, {
        id: '5',
        name: '大专'
      }, {
        id: '6',
        name: '本科'
        }],
      [{
        id: '7',
        name: '硕士'
      }]
    ],
    xueliChoose:'1',
    shaixuanData: [
      [{
        id: '1',
        name: '不限'
      }, {
        id: '2',
        name: '今天发布'
      }, {
        id: '3',
        name: '三日内'
        }],
      [{
        id: '4',
        name: '一周内'
      }, {
        id: '5',
          name: '两周内'
      }, {
        id: '',
        name: ''
      }]
    ],
    shaixuan1: '1',
    shaixuan2: '',
    listData: [],
    keyword: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc
    })
    this.getList()
  },
  // 岗位详情
  goPostDetail (e) {
    wx.navigateTo({
      url: `../postDetail/postDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 切换城市
  goChooseCity() {
    wx.navigateTo({
      url: '../chooseCity/chooseCity'
    })
  },
  // 输入框输入
  keywordChange (e) {
    if (goodJobTimer) {
      clearTimeout(goodJobTimer)
    }
    goodJobTimer = setTimeout(() => {
      this.setData({
        keyword: e.detail.value
      })
      this.getList()
    }, 300)
  },
  // 经验选择
  jingyanChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      jingyanChoose: id,
      xueliChoose: '1',
      shaixuan1: '1',
      shaixuan2: '',
      page: 1,
      listData: [],
      maskOnOff: false
    })
    this.getList()
  },
  // 学历选择
  xueliChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      xueliChoose: id,
      jingyanChoose: '',
      shaixuan1: '1',
      shaixuan2: '',
      page: 1,
      listData: [],
      maskOnOff: false
    })
    this.getList()
  },
  // 确认筛选
  confirmChoose() {
    this.setData({
      xueliChoose: '1',
      jingyanChoose: '',
      page: 1,
      listData: [],
      maskOnOff: false
    })
    this.getList()
  },
  // 发布时间
  shaixuan1Filter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      shaixuan1: id
    })
  },
  // 工作周期
  shaixuan2Filter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      shaixuan2: id
    })
  },
  // 获取职位列表
  getList() {
    this.setData({
      loading: true
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        page: this.data.page,
        create_time: this.data.shaixuan1,
        nature: this.data.shaixuan2,
        education: this.data.xueliChoose,
        job_experience: this.data.jingyanChoose,
        keyword: this.data.keyword,
        page_size: 20
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.job_list
        console.log(listData)
        if (listData.length > 0) {
          listData.forEach((el, index) => {
            el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
            el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
          })
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
  // 选择过滤类型弹窗
  topFilter(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.topFilterBtn === id && this.data.maskOnOff) {
      this.setData({
        maskOnOff: false
      })
    } else {
      this.setData({
        topFilterBtn: id,
        maskOnOff: true
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