// pages/projectHall/projectHall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    userInfo: null,
    mask: false,
    page: 1,
    imgSrc: '',
    topFilterBtn: '',
    quyuData: [],
    quyuChoose: '',
    shaixuanData: [
      [
        {
          id: '',
          name: "不限"
        },
        {
          id: 1,
          name: "应届毕业生"
        },
        {
          id: 2,
          name: "3年以内"
        }
      ],
      [
        {
          id: 3,
          name: "3-5年"
        },
        {
          id: 4,
          name: "5-10年"
        },
        {
          id: 5,
          name: "10年以上"
        }
      ]
    ],
    shaixuan1: '',
    shaixuan2: '',
    listData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc
    })
    this.getArea()
    this.getList()
  },
  miniSalaryChange(e) {
    this.setData({
      mini_salary: Number(e.detail.value)
    })
  },
  maxSalaryChange(e) {
    console.log(333, e)
    this.setData({
      max_salary: Number(e.detail.value)
    })
  },
  // 进入项目详情
  goProjectDetail (e) {
    wx.navigateTo({
      url: `../projectDetail/projectDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 区域选择过滤内容按钮
  quyuChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: id,
      mini_salary: '',
      max_salary: '',
      shaixuan1: '',
      shaixuan2: '',
      listData: []
    })
    this.getList()
  },
  // 价格确定
  confirmFilterjiage() {
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: '',
      shaixuan1: '',
      shaixuan2: '',
      listData: []
    })
    this.getList()
  },
  // 筛选确定
  confirmFilter() {
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: '',
      mini_salary: '',
      max_salary: '',
      listData: []
    })
    this.getList()
  },
  // 获取区域
  getArea () {
    wx.request({
      url: `${app.globalData.baseUrl}/Addr/prov2CityList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.area_list
        console.log(listData)
        listData.unshift({
          city_code: '',
          city_name: '不限'
        })
        let hangyeData = []
        let length = parseInt(listData.length / 3)
        let n = 0;
        for (let i = 1; i <= length; i++) {
          var star = (i - 1) * 3;
          hangyeData[n++] = listData.slice(star, star + 3);
        }
        let y = listData.length - length * 3;
        if (y > 0) {
          let newArr = listData.slice(length * 3)
          if (newArr.length === 2) {
            newArr.push({
              id: '',
              name: null
            })
          }
          hangyeData[n++] = newArr
        }
        this.setData({
          quyuData: hangyeData
        })
        console.log(hangyeData)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 获取项目
  getList() {
    console.log(55, this.data)
    this.setData({
      loading: true
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        district_code: this.data.quyuChoose,
        mini_salary: this.data.mini_salary,
        max_salary: this.data.max_salary,
        job_experience: this.data.shaixuan1,
        nature: this.data.shaixuan2,
        page_size: 10,
        page: this.data.page
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.statusCode !== 200) {
          this.setData({
            loading: false
          })
          return
        }
        let listData = res.data.bizobj.data.project_list
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
    if (this.data.topFilterBtn === id && this.data.mask) {
      this.setData({
        mask: false
      })
    } else {
      this.setData({
        mask: true,
        topFilterBtn: id
      })
    }
  },
  // 工作经验选择
  shaixuanchooseFilter1(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      shaixuan1: id
    })
  },
  // 工作周期选择
  shaixuanchooseFilter2(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      shaixuan2: id
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})