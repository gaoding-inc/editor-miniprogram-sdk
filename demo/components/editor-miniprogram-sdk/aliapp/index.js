Component({
    props: {
        // 表示模板来源 (user = 个人作品记录、company = 渠道库、为空 = 稿定模板)
        mode: '',
        // 模板 ID（可以是，稿定模板、个人作品记录、分发渠道库模板
        templateId: undefined,
        // 当前要访问的 webview 页面 (templeates = 模板中心、design = 编辑器页面、complete = 完成页)
        currentPage: 'templeates',
        // 渠道分发库 ID (模板数据源)
        thirdCateId: undefined,
        // 合作方账号关联签名 (所有页面均需携带)
        thirdPartyUserCode: undefined,
        pageRoutes: {},

        // 原模板 ID （complete 页面所需字段）
        sourceId: undefined,
        // 编辑后的完成图 （complete 页面所需字段）
        image: undefined,

        // 主题色
        themeColor: '',
        // 保存按钮文案
        buttonText: '',
        // 自定义webview标题
        title: '',
        clientId: '',
        query: ''
    },
    data: {
        url: ''
    },
    initialized: false,
    async deriveDataFromProps(props) {
      if (!props.thirdPartyUserCode) return;
      if (this.initialized) return;
      this.initialized = true;
      this.lazySetUrl();
    },
    methods: {
      onMessage(message) {
        if(message && message.detail.type === 'editor.download') {
          const {type, ...other} = message.detail;
            other.id = other.template_id;
            const path = this.props.pageRoutes ? this.props.pageRoutes.complete : '/pages/complet/complet';
          my.navigateTo({
            url: path + this.stringifyQuery(other)
          });
        }
      },
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
            const url = this.getUrl();
            this.setData({
                url
            })
        },
        getUrl() {
            const props = this.props;
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

            return utmsMap[routeMap[props.currentPage || 'templates']] + query + '&thirdParty=qiye_miniprogram&from=alibaba_miniprogram&' + (props.query || '');
        }
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function(size) {}
    }
})