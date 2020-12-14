# 小程序 SDK 使用指南
## 安装 SDK
npm安装，[微信官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)
```
npm i @gaoding/editor-miniprogram-sdk
```

在你的页面 `page.json` 中添加

```json
{
  "usingComponents": {
    "editor-miniprogram-sdk": "@gaoding/editor-miniprogram-sdk"
  }
}
```

不使用构建工具序安装，拷贝[仓库中](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) `components` 下的文件到项目中的放组件的目录，同样需要在页面配置json中声明

```json
{
  "usingComponents": {
    "editor-miniprogram-sdk": "../../components/editor-miniprogram-sdk/editor-miniprogram-sdk"
  }
}
```

其他第三方框架引用
- [mpvue 参考](https://github.com/mpvue/examples/tree/master/echarts)
- [taro  参考](http://taro-docs.jd.com/taro/docs/mini-third-party)


### 参数
| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| currentPage | String | 当前访问页面 | templates/design/complete |
| thirdPartyUserCode | String | 授权信息，第三方账号接入, 详情见下方文档 | 5e0818ee84d9453db6b4a4c3895a269c
| thirdCateId | String | 分发渠道 ID(数据源) | 112 |
| templatesPage? | String | 模板中心路由(用于在 webview 跳转) | wx.miniprogram.navigateTo('/pages/templates/templates') |
| designPage? | String | 编辑页路由 | wx.miniprogram.navigateTo('/pages/design/design') |
| completePage? | String | 完成页路由 | wx.miniprogram.navigateTo('/pages/complete/complete') |

### 访问模板中心
currentPage = templates 时
```
<editor-miniprogram-sdk
    templatesPage="/pages/index/index"
    designPage="/pages/design/design"
    completePage="/pages/complete/complete"

    thirdPartyUserCode="{{thirdPartyUserCode}}"
    thirdCateId="112"
    currentPage="templates"></editor-miniprogram-sdk>
```

### 访问编辑页
currentPage = design 时
| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| templateId | String | 模板ID/作品ID | 124567 |
| mode | String | id 为作品 ID 时值必须为 `user`<br> id 为分发渠道模板时值必须为 `company` | company/user |

```
<editor-miniprogram-sdk
    templatesPage="/pages/index/index"
    designPage="/pages/design/design"
    completePage="/pages/complete/complete"

    thirdPartyUserCode="{{thirdPartyUserCode}}"
    thirdCateId="112"
    currentPage="design"
    mode="{{query.mode}}"
    templateId="{{query.id}}"></editor-miniprogram-sdk>
```

### 访问完成页
currentPage = complete 时

且该页面接收编辑页完成后的结果

| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| templateId | String | 作图记录ID | 1234567 |
| sourceId | String | 原模板ID | 7654321 |
| image | String | 图片地址 | https://gd-filems-fat.my-static.dancf.com/saas/4149m9/-1813-453b-a91d-b263bb2901a02435.png |

> 若要支持分享等其他能力，建议自定义完成页

```
  <editor-miniprogram-sdk
    templatesPage="/pages/index/index"
    designPage="/pages/design/design"
    completePage="/pages/complete/complete"
    currentPage="complete"

    thirdPartyUserCode="{{thirdPartyUserCode}}"
    image="{{query.image}}"
    templateId="{{query.id}}"
    sourceId="{{query.sourceId}}"></editor-miniprogram-sdk>
```