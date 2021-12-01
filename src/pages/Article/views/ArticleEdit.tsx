import { createNewArticle } from '@/api/Article'
import cloudbase from '@cloudbase/js-sdk'
import { Button, Input, message, Select, PageHeader, Form, Drawer, Space } from 'antd'
import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Editor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useHistory } from 'react-router-dom'
import './index.scss'

const { Option } = Select
const { TextArea } = Input

const app = cloudbase.init({
  env: 'blog-0gpyjydc66f2d57f',
  region: 'ap-shanghai',
})
var db = app.database()

const MOCK_TAGS = [
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'angular',
    label: 'Angular',
  },
]

export default function ArticleEdit() {
  const mdEditor = useRef(null)
  const history = useHistory()

  // 是否展示抽屉
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false)
  // 文章内容
  const [markdownValue, setMarkdownValue] = useState<string>('')
  // 文章标题
  const [articleTitle, setArticleTitle] = useState<string>('')
  // 文章简介
  const [articleProfile, setArticleProfile] = useState<string>('')
  // 文章分类
  const [articleClassification, setArticleClassification] = useState<string>('')

  //@ts-ignore
  const handleEditorChange = ({ text }) => {
    const newValue = text.replace(/\d/g, '')
    setMarkdownValue(newValue)
  }

  /**
   * 新增文章
   *
   */
  const handleCreateNewArticle = async () => {
    message.loading('加载中...')
    try {
      const res = await createNewArticle({
        articleClassification,
        articleTitle,
        articleTags: ['1', '2'],
        articleCreateTime: new Date().valueOf(),
        articleContent: markdownValue,
        articleProfile,
      })
      message.destroy()
      message.success('新增成功!')
    } catch (error) {
      console.log('🚀 ~ file: ArticleEdit.tsx ~ line 47 ~ handleCreateNewArticle ~ error', error)
    }
  }

  const handleGetArticles = async () => {
    db.collection('blog_articles')
      .get()
      .then((res) => {
        console.log(res.data)
      })
  }

  return (
    <div className="edit">
      <div className="edit_header">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="新增文章"
          style={{ width: '100%' }}
          extra={[
            <Button onClick={() => handleGetArticles()}>存为草稿</Button>,
            <Button type="primary" onClick={() => setIsShowDrawer(true)}>
              发布文章
            </Button>,
          ]}
        ></PageHeader>
      </div>
      <div className="edit_content">
        <Form>
          <Form.Item label="文章标题:">
            <Input
              placeholder="请输入文章标题"
              maxLength={20}
              value={articleTitle}
              onChange={(value) => {
                setArticleTitle(value.target.value)
              }}
            />
          </Form.Item>
        </Form>
        <div className="edit_content_editor">
          <Editor
            ref={mdEditor}
            value={markdownValue}
            style={{
              height: '94%',
            }}
            onChange={handleEditorChange}
            renderHTML={(text) => <ReactMarkdown source={text} />}
          />
        </div>
      </div>
      <Drawer
        title="发布文章"
        width={500}
        onClose={() => setIsShowDrawer(false)}
        visible={isShowDrawer}
        extra={
          <Space>
            <Button onClick={() => setIsShowDrawer(false)}>取消</Button>
            <Button type="primary" onClick={() => handleCreateNewArticle()}>
              确认发布
            </Button>
          </Space>
        }
      >
        <Form>
          <Form.Item label="文章分类:">
            <Select
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(value: string) => {
                setArticleClassification(value)
              }}
            >
              {MOCK_TAGS.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="文章简介:">
            <TextArea
              autoSize={{ minRows: 4, maxRows: 10 }}
              maxLength={200}
              placeholder="请输入文章简介"
              value={articleProfile}
              onChange={(e) => {
                setArticleProfile(e.target.value)
              }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
