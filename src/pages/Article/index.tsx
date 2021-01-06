import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

export default function Article() {
  const history = useHistory()

  return <div className="article">文章管理</div>
}
