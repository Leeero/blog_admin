import cloudbase from '@cloudbase/js-sdk'

export const cloudbaseApi = cloudbase.init({
  env: 'blog-0gpyjydc66f2d57f',
  region: 'ap-shanghai',
})

// 匿名登录cloudbase
export const handleLoginCloudbase = async () => {
  //@ts-ignore
  const auth = cloudbaseApi.auth()
  const loginState = await auth.getLoginState()
  // 检查是否登录成功
  // 匿名登录成功检测登录状态isAnonymous字段为true
  if (loginState && loginState.isAnonymousAuth) {
    return
  }
  await auth.anonymousAuthProvider().signIn()
}
