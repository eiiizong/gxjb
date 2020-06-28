// Promise 重新封装 uniapp API 接口

import config from '../../config';

// const uni = uni;

/**
 * ajax 数据请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数 body
 * @param {Object} header 请求参数 header
 * @param {String} method 请求方式 默认 GET
 */
const request = (url, data, header = {}, method = 'GET') => {
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
      success: res => {
        const resData = res.data;
        // 请求成功 状态码为200 &&
        if (res.statusCode === 200 && resData && resData.status === '200') {
          console.log(`
            请求地址${url},数据返回结果:
            ${resData.data}
          `);
          resolve(resData.data);
        } else {
          console.log(`
            请求地址${url},数据返回结果:
            ${res}
          `);
          showToast(resData.msg);
          reject(res);
        }
      },
      fail: err => {
        console.log(`
          请求地址${url},数据返回结果:
          ${err}
        `);
        reject(err);
      },
    });
  });
};

/**
 * 路由跳转 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 * @param {String} url  eg:'test?id=1&name=uniapp'
 */
const redirectTo = url => {
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
 *  ======================   以上api已根据微信官方接口确定注释参数类型    =======================
 */

/**
 * 拨打电话
 * @param {String} phoneNumber 电话号码
 */
const makePhoneCall = phoneNumber => {
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
 * @param {String} url  eg:'test?id=1&name=uniapp'
 */
const navigateTo = url => {
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
 * 路由跳转
 * @param {String} url  需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
 */
const switchTab = url => {
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
 * 从本地相册选择图片或使用相机拍照。
 * @param {Number} count
 * @param {*} sizeType
 * @param {*} sourceType
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
 * 预览图片
 * @param {String|Number} current
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
 * 动态设置当前页面的标题。
 * @param {*} title
 */
const setNavigationBarTitle = title => {
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
const removeTabBarBadge = index => {
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
const login = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        if (res.code) {
          request(
            'login',
            {},
            {
              code: res.code,
            },
            'POST'
          )
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
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
const getStorage = key => {
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
const removeStorage = key => {
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

const showToast = title => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title: title + '',
      icon: 'none',
      mask: true,
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

const uniApi = {
  request,
  makePhoneCall,
  navigateTo,
  showToast,
  switchTab,
  getLocation,
  chooseLocation,
  openLocation,
  chooseImage,
  previewImage,
  setNavigationBarTitle,
  setNavigationBarColor,
  setTabBarBadge,
  removeTabBarBadge,
  getSystemInfo,
  navigateBack,
  getUserInfo,
  login,
  setStorage,
  getStorage,
  clearStorage,
  removeStorage,
  showModal,
  requestPayment,
  redirectTo,
};
export default uniApi;
export {
  request,
  makePhoneCall,
  navigateTo,
  redirectTo,
  showToast,
  switchTab,
  getLocation,
  chooseLocation,
  openLocation,
  chooseImage,
  previewImage,
  setNavigationBarTitle,
  setNavigationBarColor,
  setTabBarBadge,
  removeTabBarBadge,
  getSystemInfo,
  navigateBack,
  getUserInfo,
  login,
  setStorage,
  getStorage,
  clearStorage,
  removeStorage,
  showModal,
  requestPayment,
};
