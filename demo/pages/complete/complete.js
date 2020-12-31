import { getCode } from '../../utils/util.js';

Page({
  data: {
    thirdPartyUserCode: '',
    query: {},
    pageRoutes: {
      templates: '/pages/index/index',
      design: '/pages/design/design',
      complete: '/pages/complete/complete',
    }
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
