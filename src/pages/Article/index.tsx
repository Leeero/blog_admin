import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default function Article() {
  const history = useHistory()

  const [collapsed, setCollapsed] = useState(false)

  return <div className="article">文章管理</div>
}
