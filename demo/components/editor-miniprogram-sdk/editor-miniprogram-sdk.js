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

        // 小程序路由
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
        },

        // 主题色
        themeColor: {
            type: String
        },
        // 保存按钮文案
        buttonText: {
            type: String
        },
        // 自定义webview标题
        title: {
            type: String
        },

        // 稿定账户登录及调试，稿定内部专用
        tokenData: {
            type: String
        },
        clientId: {
            type: String
        },
        env: {
            type: String
        }
    },
    data: {
        url: ''
    },
    observers: {
        'thirdPartyUserCode,tokenData,templateId,thirdCateId,pageRoutes,currentPage,mode,image': function(v) {
            const props = this.properties;
            if(props.thirdPartyUserCode || props.tokenData) {
                this.lazySetUrl();
            }
        }
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
        lazySetUrl() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.setUrl();
            }, 10)
        },
        setUrl() {
            const url = this.getUrl() + '#wechat_redirect';
            console.log(url);
            this.setData({
                url
            })
        },
        getUrl() {
            const props = this.properties;
            const queryObj = {
                thirdPartyUserCode: props.thirdPartyUserCode,

                id: props.templateId,
                mode: props.mode,
                thirdCateId: props.thirdCateId,
                
                pageRoutes: props.pageRoutes,
                sourceId: props.sourceId,
                image: props.image,
                themeColor: props.themeColor ? encodeURIComponent(props.themeColor) : '',
                buttonText: props.buttonText,
                tokenData: props.tokenData,
                clientId: props.clientId,
                title: props.title ? encodeURIComponent(props.title) : '',

                // dev
                // thirdParty: 'qiye_miniprogram',
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

            // 内部开发调试
            const baseHostMap = {
                'local': 'http://design.dev.gaoding.com',
                'dev': 'https://sdk.open-dev.gaoding.com',
                'fat': 'https://sdk.open-fat.gaoding.com',
                'stage': 'https://sdk.open-stage.gaoding.com',
            };

            if(props.env && baseHostMap[props.env]) {
                const baseHost = baseHostMap[props.env];
                const basePath = `/h5/${routeMap[props.currentPage]}`;
                return baseHost + basePath + query + '&thirdParty=qiye_miniprogram';
            }

            return utmsMap[routeMap[props.currentPage || 'templates']] + query;
        }
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function(size) {}
    }
})
