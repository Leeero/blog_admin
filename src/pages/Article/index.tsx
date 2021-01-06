import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, PageHeader, Space, Table, Tag } from 'antd'
import React from 'react'
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <div className="article">
      <PageHeader
        ghost={false}
        backIcon={false}
        title="文章列表"
        extra={[
          <Button type="primary" icon={<PlusOutlined />}>
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
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}
