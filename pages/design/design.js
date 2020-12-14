import { getCode } from '../../utils/util.js';

// pages/design/design.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    thirdPartyUserCode: '',
    query: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      query: options
    });
    getCode((res) => {
      this.setData({
        thirdPartyUserCode: res.data.code
      });
    });
  },
})