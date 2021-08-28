import { createNewArticle } from '@/api/Article'
import cloudbase from '@cloudbase/js-sdk'
import { Breadcrumb, Button, Col, Input, message, Row, Select } from 'antd'
import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Editor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useHistory } from 'react-router-dom'
import './index.scss'

const { Option } = Select
const { TextArea } = Input

const app = cloudbase.init({
  env: 'cloudbase-prepaid-9egn8486f362e1',
  region: 'ap-guangzhou',
})
var db = app.database()

export default function ArticleEdit() {
  const mdEditor = useRef(null)
  const [markdownValue, setMarkdownValue] = useState()

  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  //@ts-ignore
  const handleEditorChange = ({ text }) => {
    const newValue = text.replace(/\d/g, '')
    console.log(newValue)
    setMarkdownValue(newValue)
  }

  const handleCreateNewArticle = async () => {
    message.loading('加载中...')
    try {
      const res = await createNewArticle({
        articleClassification: 'vue',
        articleTitle: 'Test',
        articleTags: ['1', '2'],
        articleCreateTime: '10.00',
        articleContent: '测试',
        articleProfile: '这是简介',
      })
      message.success('新增成功!')
      console.log('🚀 ~ file: ArticleEdit.tsx ~ line 44 ~ handleCreateNewArticle ~ res', res)
    } catch (error) {
      console.log('🚀 ~ file: ArticleEdit.tsx ~ line 47 ~ handleCreateNewArticle ~ error', error)
      message.error(error.code)
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
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/article">文章列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增文章</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="edit_content">
        <div className="edit_content-header">
          <div className="edit_content-title">
            <p>文章标题:</p>
            <Input placeholder="请输入文章标题" maxLength={20} />
          </div>
          <div className="edit_content-action">
            <Button onClick={() => handleGetArticles()}>存为草稿</Button>
            <Button type="primary" onClick={() => handleCreateNewArticle()}>
              发布文章
            </Button>
          </div>
        </div>
        <Row className="edit_content-editor">
          <Col span={20} style={{ height: '100%' }}>
            <Editor
              ref={mdEditor}
              value={markdownValue}
              style={{
                height: '94%',
              }}
              onChange={handleEditorChange}
              renderHTML={(text) => <ReactMarkdown source={text} />}
            />
          </Col>
          <Col span={4} className="edit_content-introduction">
            <div>
              <p>文章分类:</p>
              <Select defaultValue="lucy" style={{ width: '100%', marginBottom: '10px' }}>
                <Option value="jack">Vue</Option>
                <Option value="lucy">React</Option>
                <Option value="Yiminghe">Node</Option>
              </Select>
            </div>
            <div>
              <p>文章简介:</p>
              <TextArea autoSize={{ minRows: 4, maxRows: 10 }} maxLength={200} placeholder="请输入文章简介" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
