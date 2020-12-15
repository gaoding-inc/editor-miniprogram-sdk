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
  const kongServiceInfo =  'eyJ0eXBlIjoxLCJzayI6ImY5ZGQ2YzFiNjliMzIzZjZhYzBiNDA4NWY1Y2FiNTEzIiwiYWsiOiI0MzY4YjFlMGY2NzEwMTU1NzFhMmM5NTRkYWRmOWM4YSIsImVmZmVjdGl2ZV90aW1lIjozNjAwLCJ1c2VyX2lkIjoxMDAwMDEsImFwcF9pZCI6IlFmNXB0d2RHN3BIMSJ9';
  // 'eyJ0eXBlIjoxLCJzayI6ImY5ZGQ2YzFiNjliMzIzZjZhYzBiNDA4NWY1Y2FiNTEzIiwiYWsiOiI0MzY4YjFlMGY2NzEwMTU1NzFhMmM5NTRkYWRmOWM4YSIsImVmZmVjdGl2ZV90aW1lIjozNjAwLCJ1c2VyX2lkIjoxMDAwMDEsImFwcF9pZCI6IlFmNXB0d2RHN3BIMSJ9';

  wx.request({
    url: 'https://sso.my-stage.gaoding.com/api/oauth/authorize/sdk',
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
