Component({
    properties: {
        // 表示模板来源 (user = 个人作品记录、company = 渠道库、为空 = 稿定模板)
        mode: {
            type: String
        },
        // 模板 ID（可以是，稿定模板、个人作品记录、分发渠道库模板
        templateId: {
            type: String
        },
        // 当前要访问的 webview 页面 (templeates = 模板中心、design = 编辑器页面、complete = 完成页)
        currentPage: {
            type: String
        },
        // 渠道分发库 ID (模板数据源)
        thirdCateId: {
            type: String
        },
        // 合作方账号关联签名 (所有页面均需携带)
        thirdPartyUserCode: {
            type: String,
        },

        pageRoutes: {
            type: Object
        },

        // 原模板 ID （complete 页面所需字段）
        sourceId: {
            type: String
        },
        // 编辑后的完成图 （complete 页面所需字段）
        image: {
            type: String
        }
    },
    data: {
        url: ''
    },
    observers: {
        'thirdPartyUserCode': function(v) {
            v && this.setUrl();
        },
    },
    methods: {
        stringifyQuery(query) {
            let str = '?';
            for(let k in query) {
                k = encodeURIComponent(k);
                if(query[k] && typeof query[k] === 'object') {
                    str += `&${k}=` + encodeURIComponent(JSON.stringify(query[k]));
                }
                else if(query[k]) {
                    str += `&${k}=${query[k]}`;
                }
            }
            return str.replace('&', '');
        },
        setUrl() {
            console.log(this.getUrl() + '#wechat_redirect');
            this.setData({
                url: this.getUrl() + '#wechat_redirect'
            })
        },
        getUrl() {
            const props = this.properties;
            const queryObj = {
                thirdPartyUserCode: props.thirdPartyUserCode,

                id: props.templateId,
                mode: props.mode,
                thirdCateId: props.thirdCateId,
                // thirdParty: 'qiye_miniprogram',
                
                pageRoutes: props.pageRoutes,
                sourceId: props.sourceId,
                image: props.image,

                // __DEBUG__: 1,
            };

            const routeMap = {
                'complete': 'complet',
                'complet': 'complet',
                'design': 'design',
                'templates': 'templates',
            }

            const utmsMap = {
                'complet': 'https://sdk.open.gaoding.com/utms/f6f4c526533ef3ea5eea6bcd3601e539',
                'complete': 'https://sdk.open.gaoding.com/utms/f6f4c526533ef3ea5eea6bcd3601e539',
                'templates': 'https://sdk.open.gaoding.com/utms/3f341b5ad7fa7a1bb561b6d2b0c081c1',
                'design': 'https://sdk.open.gaoding.com/utms/a8dbab466f5e89356329d9a612aafc0f',
            }

            const query = this.stringifyQuery(queryObj);

            return utmsMap[routeMap[props.currentPage || 'templates']] + query;

            // const baseHost = 'http://design.dev.gaoding.com/';
            // const basePath = `h5/${routeMap[props.currentPage || 'templates'] || 'templates'}`;

            // return baseHost + basePath + query;
        }
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function(size) {}
      }
})
