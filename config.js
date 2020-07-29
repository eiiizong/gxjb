// 配置文件

const config = {
    // 请求地址通用前缀
    // requestUrl: 'http://rap2.taobao.org:38080/app/mock/260235/api/'
    // requestUrl: 'https://take.kbftech.cn/api/',
    requestUrl: 'https://jianbo.yangfugui.com/api/',
    // 服务器返回的状态码 有时是 number类型
    statusCode: '200',
    // 认证失效，请重新登录 状态码
    certificationInvalidationStatusCode: '410',
    // 认证失效，请重新登录 返回的页面
    loginPath: '/pages/project/login/login?type=error'
}

export default config