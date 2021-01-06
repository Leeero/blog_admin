import { FileOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import './App.scss'
import Article from './pages/Article'
import Tag from './pages/Tag'

const { Content, Sider } = Layout

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  const { pathname } = useLocation()
  let selectedMenu
  switch (pathname) {
    case '/':
    case '/article':
      selectedMenu = ['article']
      break
    case '/tag':
      selectedMenu = ['tag']
      break
    case '/me':
      selectedMenu = ['me']
      break
  }

  return (
    <div className="app">
      <Layout className="app_layout">
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Menu theme="dark" defaultSelectedKeys={selectedMenu} mode="inline">
            <Menu.Item key="article" icon={<FileOutlined />}>
              <Link to="/article">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="tag" icon={<TagsOutlined />}>
              <Link to="/tag">标签管理</Link>
            </Menu.Item>
            <Menu.Item key="me" icon={<UserOutlined />}>
              个人信息管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="app_content">
            <Switch>
              <Route exact path="/" component={Article} />
              <Route exact path="/article" component={Article} />
              <Route exact path="/tag" component={Tag} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
