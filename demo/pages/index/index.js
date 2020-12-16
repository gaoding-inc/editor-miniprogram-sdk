import { getCode } from '../../utils/util.js';

Page({
  data: {
    thirdPartyUserCode: '',
    pageRoutes: {
      templates: '/pages/index/index',
      design: '/pages/design/design',
      complete: '/pages/complete/complete',
    }
  },
  onLoad() {
    getCode((res) => {
      console.log(res.data)
    });
    getCode((res) => {
      this.setData({
        thirdPartyUserCode: res.data.code
      });
    });
  }
})
