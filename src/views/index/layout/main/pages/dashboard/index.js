import React, { Component, Fragment } from 'react'

import { List } from 'antd'

const data = [
  '集成最佳响应式布局的基本骨架。',
  '集成路由配置的最佳实践。',
  '集成状态管理的最佳实践。',
  '集成异步编程及数据处理的最佳实践。',
  '集成Mock数据和联调方案的最佳实践。',
]

export default class Analysis extends Component {
  componentDidMount() {
  }

  render() {
    return (
<div>
    <h3 style={{ marginBottom: 16 }}>基于塞伯坦和antDesign的最佳工程实践解决方案</h3>
    <List
      bordered
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </div>
    )
  }
}
