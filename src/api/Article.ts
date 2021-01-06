import request from '@/utils/request'

interface CreateAccountParamsType {
  owner: string | null
  name: string
  secret_id: string
  secret_key: string
  provider: string
}

/**
 * 获取文章列表
 *
 * @export
 * @return {*}
 */
export async function getArticleLists() {
  return request(`/api/v1/blog/article/list`, {
    method: 'GET',
  })
}
