import { getCode } from '../../utils/util.js';

Page({
  data: {
    thirdPartyUserCode: '',
  },
  onLoad() {
    getCode((res) => {
      this.setData({
        thirdPartyUserCode: res.data.code
      });
    });
  }
})
