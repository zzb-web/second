import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import ChapterTable from '../ChapterTable/index.js';
import './style.css';
const { Header, Content,Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Navigation extends Component {
  constructor(){
    super();
    this.state={
      contentHeight : 0,
      key : '5'
    }
  }
  clickHandle(e) {
    console.log(e.key)
    this.setState({
      key: e.key
    })
  }
  render() {
     const {contentHeight ,key} = this.state;
    return (
      <Layout>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']} onClick={this.clickHandle.bind(this)}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>其他一级导航</span></span>}
            >
              <Menu.Item key="1">111</Menu.Item>
              <Menu.Item key="2">222</Menu.Item>
              <Menu.Item key="3">333</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>新增图书</span></span>}
            >
              <Menu.Item key="4">上传初始零级属性表</Menu.Item>
              <Menu.Item key="5">章节表</Menu.Item>
              <Menu.Item key="6">栏目名称表</Menu.Item>
              <Menu.Item key="7">问题序号,小问最大序号表</Menu.Item>
              <Menu.Item key="8">出题方程式</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className='user-main'>
              <div className='user-msg'>
                <div className='user-icon-content'>
                  <Icon type="user" className='user-icon'/>
                </div>
                <div className='user-name'>Jay.Liu</div>
              </div>
            </div>
          </Header>
          <Content style={{borderTop:'1px solid #ececec',padding: 12,background: '#fff',minHeight:contentHeight}}>
              {
                 key === '5'? <ChapterTable/> : null
              }
          </Content>
        </Layout>
      </Layout>
    );
  }
  componentDidMount(){
    let that = this;
    let allHeight = document.documentElement.clientHeight;
    this.setState({
      contentHeight :　allHeight-76
    })
    window.onresize = function(){
      let allHeight = document.documentElement.clientHeight;
      that.setState({
        contentHeight :　allHeight-76
      })
    }
  }
}

export default Navigation;
