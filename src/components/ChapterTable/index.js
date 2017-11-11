import React from 'react';
import {Button ,Select, Input ,Icon} from 'antd';
import Tables from '../Table/index.js';
import './style.css'
const Option = Select.Option;
const columns = [{
    title: '辅助识别码',
    className: 'column-Id',
    dataIndex: 'id',
    width : 120
  },
   {
    title: '页码',
    className: 'column-page',
    dataIndex: 'page',
    width:60
  },
  {
    title: '章序号',
    className: 'column-chapter',
    dataIndex: 'chapter',
    width:250
  },{
    title: '节序号',
    className: 'column-section',
    dataIndex: 'section',
  }];
  const data =[
        {
            key: '1',
            id: 17005,
            page: 1,
            chapter:'',
            section:''
          },
          {
            key: '2',
            id: 17006,
            page: 1,
            chapter:'',
            section:''
          },
          {
            key: '3',
            id: 17007,
            page: 2,
            chapter:'',
            section:''
          }
  ]
class ChapterTable extends React.Component{
    constructor(){
        super();
        this.state={
            showPrompt: false
        }
    }
    submitHnadle(){
        this.setState({
            showPrompt : true
        })
    }
    cancelHandle(){
        this.setState({
            showPrompt : false
        })
    }
    render(){
        return(
            <div>
                <div className='control-area'>
                    <div className='title'><span>新增图书/章节表</span></div>
                    <div className='content'>
                        <span>范围:</span>
                        <Select style={{width:320,marginLeft:10}}>
                            <Option value="1">七上辅导书</Option>
                            <Option value="2">七上课本</Option>
                            <Option value="3">七上新编基础训练通用版S</Option>
                            <Option value="4">七上新编基础训练沪科版</Option>
                            <Option value="5">七上同步训练k</Option>
                        </Select>
                        <Input placeholder='页码' style={{width:60,marginLeft:20}}/>
                        <Button type="primary" style={{marginLeft:20}}>搜索</Button>
                        <Button type="primary" style={{marginLeft:120}}>暂存</Button>
                        <Button type="primary" style={{marginLeft:30}} onClick={this.submitHnadle.bind(this)}>提交</Button>

                        <div className='prompt' style={this.state.showPrompt?{display:'block'}:{display:'none'}}>
                            <div className='prompt-note'>
                                <Icon type="exclamation-circle" />
                                <span>请确定任务已完成</span>
                            </div>
                            <div className='prompt-info'>
                                <span>提交后空格信息会自动填充</span>
                            </div>
                            <div className='prompt-btn'>
                                <Button type="primary">确定</Button>
                                <Button onClick={this.cancelHandle.bind(this)}>取消</Button>
                            </div>
                        </div>
                    </div>
                    <div className='notes'><span>注:如果下面一格等同于上面一格信息，可不填写，空格部分提交后系统会自动填充</span></div>
                   
                </div>
                <div className='table-content'>
                    <Tables columns={columns} data={data} showSizeChanger={false}/>
                </div>
            </div>
        )
    }
}

export default ChapterTable;