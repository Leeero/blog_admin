import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default function Tag() {
  const history = useHistory()

  const [collapsed, setCollapsed] = useState(false)

  return <div className="tag">标签管理</div>
}
