import { cloudbaseApi } from '@/utils/cloudbaseInit'
import request from '@/utils/request'

const cloudbase = cloudbaseApi.database()

interface CreateArticleParamsType {
  // 文章分类
  articleClassification: string | null
  // 文章标题
  articleTitle: string
  // 文章标签
  articleTags: string[]
  // 文章创建时间
  articleCreateTime: number
  // 文章内容
  articleContent: string
  // 文章简介
  articleProfile: string
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

/**
 * 新增文章
 * @param requestBody  新增文章内容
 * @returns
 */
export const createNewArticle = (requestBody: CreateArticleParamsType) => {
  return new Promise((resolve, reject) =>
    cloudbase
      .collection('blog_articles')
      .add(requestBody)
      .then((res: any) => {
        if (res.code) {
          reject(res)
          return
        }
        resolve(res)
      })
  )
}
