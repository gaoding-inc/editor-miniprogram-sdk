import { getCode } from '../../utils/util.js';

Page({
  data: {
    thirdPartyUserCode: '',
    query: {}
  },
  onLoad: function (options) {

    this.setData({
      query: options
    });
    getCode((res) => {
      this.setData({
        thirdPartyUserCode: res.data.code
      });
    });
  }
})
