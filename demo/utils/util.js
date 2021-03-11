const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取签名
// https://www.yuque.com/docs/share/4e30e11a-ca1e-4a69-902b-0aa8f2b70c29?#
function getCode(fn) {
  const kongServiceInfo = {}

  wx.request({
    url: '',
    method: 'POST',
    data: {
      uid: 'test01'
    },
    header: {
      'Content-Type': 'application/json',
      'Kong-Service-Info': kongServiceInfo,
    },
    success(res) {
      fn(res);
    }
  })
};

module.exports = {
  getCode,
  formatTime: formatTime
}
