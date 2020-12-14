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

function getCode(fn) {
  const kongServiceInfo =  'test';

  wx.request({
    url: 'https://sso.my-fat.gaoding.com/api/oauth/authorize/sdk',
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
