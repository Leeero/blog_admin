import { getArticleLists } from '@/api/Article'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, message, PageHeader, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export default function Article() {
  const history = useHistory()
  const [tableData, setTableData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'ID',
      dataIndex: 'articleId',
      key: 'articleId',
    },
    {
      title: '简介',
      dataIndex: 'articleIntroduction',
      key: 'articleIntroduction',
      width: '50%',
    },
    {
      title: '类型',
      key: 'articleType',
      dataIndex: 'articleType',
      render: (text: any, record: { articleId: string | number | null | undefined }) => (
        <Tag key={record.articleId} color="#87d068">
          {text}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ]

  /**
   * 获取文章列表数据
   *
   */
  const handleGetArticleLists = async () => {
    setIsLoading(true)
    try {
      const { articleLists } = await getArticleLists()
      setTableData(articleLists)
      setIsLoading(false)
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    handleGetArticleLists()
  }, [])

  return (
    <div className="article">
      <PageHeader
        ghost={false}
        backIcon={false}
        title="文章列表"
        extra={[
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push('/article/create')
            }}
          >
            新增
          </Button>,
        ]}
      ></PageHeader>
      <div className="article_search">
        <div className="article_search-input">
          <Input placeholder="输入文章标题" />
        </div>
        <div className="article_search-button">
          <Button type="primary">查询</Button>
        </div>
      </div>
      <div className="article_table">
        <Table columns={tableColumns} dataSource={tableData} loading={isLoading} />
      </div>
    </div>
  )
}
