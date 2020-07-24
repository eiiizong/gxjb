// Promise 重新封装 uniapp API 接口

import config from '../../config';

/**
 * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
 * @param {Number} timeout 默认 6000ms 超时时间
 */
const login = (timeout = 6000) => {
  return new Promise((resolve, reject) => {
    uni.login({
      timeout,
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

// const uni = uni;

/**
 * ajax 数据请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数 body
 * @param {Object} header 请求参数 header
 * @param {String} method 请求方式 默认 GET
 * @param {Boolean} showMsgToast 是否显示数据请求结果msg提示
 */
const request = (
  url,
  data,
  header = {},
  method = 'GET',
  showMsgToast = true
) => {
  if (!url) {
    console.warn('请求参数url为空, 请求终止');
  }
  header = {
    ...header,
    'device-type': 'wechat',
    'content-type': 'application/json',
  };
  return new Promise((resolve, reject) => {
    url = config.requestUrl + url;
    uni.request({
      url,
      data,
      header,
      method,
      success: (res) => {
        const resData = res.data;
        // 请求成功 状态码为200 &&
        if (res.statusCode === 200 && resData && resData.status === config.statusCode) {
          console.log(`
            请求地址${url}, 状态码 ${resData.status}, 数据返回结果: 
          `,resData.data);
          resolve(resData.data);
        } else {
          console.log(`
            请求地址${url}, 状态码 ${resData.status}, 数据返回结果:
          `, res);
          // if(res.statusCode === 200 && resData.status===config.certificationInvalidationStatusCode) {
          //   redirectTo(config.loginPath)
          // }
          if (showMsgToast) {
            showToast(resData.msg);
          }
          reject(res);
        }
      },
      fail: (err) => {
        console.log(`
          请求地址${url},数据返回结果:
        `, err);
        reject(err);
      },
    });
  });
};

/**
 * 路由跳转 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 * eg:'/pages/test/test?id=1&name=uniapp'
 * @param {String} url
 */
const redirectTo = (url) => {
  return new Promise((resolve, reject) => {
    uni.redirectTo({
      url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层
 * eg:'/pages/test/test?id=1&name=uniapp'
 * @param {String} url
 */
const navigateTo = (url) => {
  return new Promise((resolve, reject) => {
    uni.navigateTo({
      url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 隐藏返回首页按钮
 */
const hideHomeButton = () => {
  return new Promise((resolve, reject) => {
    uni.hideHomeButton({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 从本地相册选择图片或使用相机拍照。
 * @param {Number} count
 * @param {Array<String>} sizeType
 * @param {Array<String>} sourceType
 */
const chooseImage = (
  count = 9,
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera']
) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sizeType,
      sourceType,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 * @param {String} current
 * @param {Array<String>} urls
 */
const previewImage = (current, urls) => {
  return new Promise((resolve, reject) => {
    uni.previewImage({
      current,
      urls,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 拍摄视频或从手机相册中选视频。
 * @param {Boolean} compressed 是否压缩所选择的视频文件
 * @param {Number} maxDuration 拍摄视频最长拍摄时间，单位秒
 * @param {Array<String>} sourceType 视频选择的来源
 * @param {String} camera
 */
const chooseVideo = (
  sourceType = ['album', 'camera'],
  compressed = true,
  maxDuration = 60,
  camera = 'back'
) => {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      compressed,
      sourceType,
      maxDuration,
      camera,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 拍摄或从手机相册中选择图片或视频。
 * @param {Number} count
 * @param {Array<String>} mediaType
 * @param {Array<String>} sourceType
 * @param {Number} maxDuration
 * @param {Array<String>} sizeType
 * @param {String} camera
 */
const chooseMedia = (
  count = 9,
  mediaType = ['image', 'video'],
  sourceType = ['album', 'camera'],
  maxDuration = 30,
  sizeType = "['original', 'compressed']",
  camera = 'back'
) => {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count,
      mediaType,
      sizeType,
      sourceType,
      maxDuration,
      camera,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
 * @param {String} url 开发者服务器地址
 * @param {String} filePath 要上传文件资源的路径 (本地路径)
 * @param {String} name 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 * @param {Object} header HTTP 请求 Header，Header 中不能设置 Referer
 * @param {Object} formData HTTP 请求中其他额外的 form data
 * @param {Number} timeout 超时时间，单位为毫秒
 */
const uploadFile = (url, filePath, name, header, formData, timeout) => {
  if (!url) {
    console.warn('请求参数url为空, 请求终止');
  }
  url = config.requestUrl + url;
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      header,
      formData,
      timeout,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框。
 * @param {String} title 提示的内容
 * @param {Boolean} mask 是否显示透明蒙层，防止触摸穿透，默认：true
 */
const showLoading = (title, mask = true) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title,
      mask,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 隐藏 loading 提示框。
 */
const hideLoading = () => {
  return new Promise((resolve, reject) => {
    uni.hideLoading({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 显示消息提示框。
 * @param {String} title 提示的内容，长度与 icon 取值有关
 * @param {String} iocn 图标，有效值 success loading none 默认值
 * @param {*} image 自定义图标的本地路径
 * @param {*} mask 是否显示透明蒙层，防止触摸穿透，默认：true
 * @param {*} duration 提示的延迟时间，单位毫秒，默认：1500
 * @param {*} position 纯文本轻提示显示位置，填写有效值后只有 title 属性生效， 有效值 top bottom center 默认值
 */

const showToast = (
  title,
  icon = 'none',
  image = '',
  mask = true,
  duration = 1500,
  position = 'center'
) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      icon,
      image,
      mask,
      duration,
      position,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 *  ======================   以上api已根据微信官方接口确定注释参数类型    =======================
 */

/**
 * 拨打电话
 * @param {String} phoneNumber 电话号码
 */
const makePhoneCall = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    uni.makePhoneCall({
      phoneNumber,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 路由跳转
 * @param {String} url  需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
 */
const switchTab = (url) => {
  return new Promise((resolve, reject) => {
    uni.switchTab({
      url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 获取当前的地理位置、速度
 * @param {String} type
 */
const getLocation = (type = 'wgs84') => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 打开地图选择位置
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} keyword
 */
const chooseLocation = (latitude, longitude, keyword) => {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      latitude,
      longitude,
      keyword,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 使用应用内置地图查看位置。
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} name
 * @param {*} address
 * @param {*} scale
 */
const openLocation = (latitude, longitude, name, address, scale = 18) => {
  return new Promise((resolve, reject) => {
    uni.openLocation({
      latitude,
      longitude,
      name,
      address,
      scale,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 动态设置当前页面的标题。
 * @param {*} title
 */
const setNavigationBarTitle = (title) => {
  return new Promise((resolve, reject) => {
    uni.setNavigationBarTitle({
      title,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 设置页面导航条颜色
 * @param {*} backgroundColor
 * @param {*} frontColor
 */
const setNavigationBarColor = (backgroundColor, frontColor) => {
  return new Promise((resolve, reject) => {
    uni.setNavigationBarColor({
      frontColor,
      backgroundColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn',
      },
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 为 tabBar 某一项的右上角添加文本
 * @param {Number} index  abBar的哪一项，从左边0算起
 * @param {String} text  显示的文本
 */
const setTabBarBadge = (index, text) => {
  return new Promise((resolve, reject) => {
    uni.setTabBarBadge({
      index,
      text,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 为 tabBar 移除某一项的右上角添加文本
 * @param {Number} index  abBar的哪一项，从左边0算起
 * @param {String} text  显示的文本
 */
const removeTabBarBadge = (index) => {
  return new Promise((resolve, reject) => {
    uni.removeTabBarBadge({
      index,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
/**
 * 获取系统信息
 */
const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

const navigateBack = (delta = 1) => {
  uni.navigateBack({
    delta,
  });
};
/**
 * 获取系统信息
 */
const getUserInfo = (lang = 'en', withCredentials = false) => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      lang,
      withCredentials,
      success(res) {
        const userInfo = res.userInfo;
        if (userInfo) {
          resolve(userInfo);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

const setStorage = (key, data) => {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data,
      success(res) {
        // console.log(res);
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
const removeStorage = (key) => {
  return new Promise((resolve, reject) => {
    uni.removeStorage({
      key,
      success(res) {
        console.log(res);
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
const clearStorage = () => {
  return new Promise((resolve, reject) => {
    uni.clearStorage({
      success(res) {
        console.log(res);
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

const showModal = (title, content) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      success(res) {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

const requestPayment = (timeStamp, nonceStr, zdyPackage, signType, paySign) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      timeStamp,
      nonceStr,
      package: zdyPackage,
      signType,
      paySign,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

export {
  request,
  navigateTo,
  redirectTo,
  hideHomeButton,
  chooseImage,
  previewImage,
  chooseVideo,
  chooseMedia,
  login,
  uploadFile,
  showLoading,
  hideLoading,
  makePhoneCall,
  showToast,
  switchTab,
  getLocation,
  chooseLocation,
  openLocation,
  setNavigationBarTitle,
  setNavigationBarColor,
  setTabBarBadge,
  removeTabBarBadge,
  getSystemInfo,
  navigateBack,
  getUserInfo,
  setStorage,
  getStorage,
  clearStorage,
  removeStorage,
  showModal,
  requestPayment,
};
