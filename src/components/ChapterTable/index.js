import React from 'react';
import {Button ,Select, InputNumber ,Icon} from 'antd';
import Tables from '../Table/index.js';
import {Get , Post} from '../../fetch/data.js';
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
class ChapterTable extends React.Component{
    constructor(){
        super();
        this.state={
            showPrompt: false,
            maxPages : 0,
            books : [],
            bookId : 0,
            page : 0,
            data : []
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
    bookChange(value){
        this.state.books.map((book,i)=>{
            if(book.ID === value){
                this.setState({
                    maxPages : book.TotalPage
                })
            }
        })
        this.setState({
            bookId : Number(value)
        })
    }
    pageChange(value){
        this.setState({
            page : Number(value)
        })
    }
    searchHandle(){
        const {bookId,page} = this.state;
        var params;
        if(page === 0){
            params = new FormData();
            params.append('BookID',bookId);
            params.append('UserID',1);
        }else{
            params = new FormData();
            params.append('BookID',bookId);
            params.append('UserID',1);
            params.append('Page',page-1);
            params.append('PageSize',3);
        }
        let data = Post('/bookchapter/query',params);
        data.then((response)=>{
            this.setState({
                data : response.data.data
            })
        })
        
    }
    render(){
        const {books,bookId,page,maxPages, data} = this.state;
        var tableData = data.Data || [];
        var  dataResource = [];
        tableData.map((item,index)=>{
            dataResource.push(
                {
                    key: index,
                    id: item.AssistCode,
                    page: item.Page,
                    chapter:item.Chapter ==='-1'?'': item.Chapter,
                    section:item.Section ==='-1'?'': item.Section
                  }
            )
        })
        return(
            <div>
                <div className='control-area'>
                    <div className='title'><span>新增图书/章节表</span></div>
                    <div className='content'>
                        <span>范围:</span>
                        <Select style={{width:320,marginLeft:10}} onChange={this.bookChange.bind(this)}>
                           {books.map((book,index)=><Option value={book.ID} key={index}>{book.BookName}</Option>)}
                        </Select>
                        <InputNumber placeholder='页码' min={0} max={maxPages} style={{width:60,marginLeft:20}} onChange={this.pageChange.bind(this)}/>
                        <Button type="primary" style={{marginLeft:20}} onClick={this.searchHandle.bind(this)}>搜索</Button>
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
                    <Tables columns={columns} data={dataResource} showSizeChanger={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let data = Get('/book/query');
        data.then((response)=>{
            this.setState({
                books:response.data
            })
        })
    }
}

export default ChapterTable;