import { Breadcrumb, Button, Col, Input, Row, Select } from 'antd'
import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Editor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useHistory } from 'react-router-dom'
import './index.scss'

const { Option } = Select
const { TextArea } = Input

export default function ArticleEdit() {
  const mdEditor = useRef(null)
  const [markdownValue, setMarkdownValue] = useState()

  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  // @ts-ignore
  const handleEditorChange = ({ text }) => {
    const newValue = text.replace(/\d/g, '')
    console.log(newValue)
    setMarkdownValue(newValue)
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
            <Button>存为草稿</Button>
            <Button type="primary">发布文章</Button>
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
