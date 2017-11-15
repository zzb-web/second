import React from 'react';
import {Button ,Select, InputNumber ,Icon,message} from 'antd';
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
            data : [],
            pageSize:5,
            currentPage:1,
            oldData :{Data:[]},
            totalPage : 0
        }
        this.modifyValue = this.modifyValue.bind(this);
    }
    submitHnadle(){
        this.setState({
            showPrompt : true
        })
    }
    okHandle(){
        var newData = [];
        const {oldData, data ,bookId} = this.state;
        oldData.Data.map((item,index)=>{
            for(var key in item){
                if(item[key] !==data.Data[index][key]){
                    newData.push(data.Data[index]);
                }
            }
        })
        var modifyDataString = [];
        newData.map((item,index)=>{
            if(modifyDataString.indexOf(JSON.stringify(item))===-1){
                modifyDataString.push(JSON.stringify(item))
            }
        })
        var finalData = [];
        modifyDataString.map((item,index)=>{
            finalData.push(JSON.parse(item))
        })
        var postData = JSON.parse(JSON.stringify(finalData));
        postData.map((item,index)=>{
            // delete item.AssistCode;
            delete item.BookID;
            delete item.Conflict;
            delete item.Page;
            delete item.UserID;
        })
        var warningAssistCode = [];
        postData.map((item,index)=>{
            if(item.Chapter ==='-1' || item.Section === '-1'){
                warningAssistCode.push(item.AssistCode)
            }
        })
        if(warningAssistCode.length === 0){
            let params = {
                "BookID" : String(bookId),
                "UserID" : "1",
                "Data"   : postData
            }
            let result = Post('http://47.96.20.101:8080/bookchapter/commit',params);
            result.then((response)=>{
                if(response.data.success){
                    this.setState({
                        showPrompt : false
                    })
                    message.success('提交成功', 2)
                }
            })
        }else{
           message.error(warningAssistCode.toString()+'填写不完整',5);
        }
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
        const {bookId,page,currentPage,pageSize} = this.state;
        var params;
        if(page === 0){
            params = new FormData();
            params.append('BookID',bookId);
            params.append('UserID',1);
        }else{
            params = new FormData();
            params.append('BookID',bookId);
            params.append('UserID',1);
            params.append('BookPage',page);
            params.append('Page',currentPage);
            params.append('PageSize',pageSize);
        }
        let data = Post('http://47.96.20.101:8080/bookchapter/query',params);
        data.then((response)=>{
            var oldData = JSON.parse(JSON.stringify(response.data.data));
            this.setState({
                data : response.data.data,
                oldData : oldData,
                totalPage : response.data.Total  
            })
        })
    }
    currentPage(currentPage,pageSize){
        this.setState({
            currentPage : currentPage,
            pageSize : pageSize
        })
        const {bookId,page} = this.state;
        var params;
        if(page!== 0){
            params = new FormData();
            params.append('BookID',bookId);
            params.append('UserID',1);
            params.append('BookPage',page);
            params.append('Page',currentPage);
            params.append('PageSize',pageSize);

            let data = Post('http://47.96.20.101:8080/bookchapter/query',params);
            data.then((response)=>{
                this.setState({
                    data : response.data.data,     
                })
            })
        }
    }
    modifyValue(e,value){
        let changedAssistCode = e[1];
        let changedLocation = e[0];
        let changedValue;
        if(value === undefined){
            changedValue = '-1'
        }else{
            changedValue = value+'';
        }
        var data = this.state.data;
        data.Data.map((item,inex)=>{
            if(item.AssistCode === changedAssistCode){
                item[changedLocation] = changedValue;
            }
        })
        // console.log('modify',data);
        this.setState({
            data : data
        })
    }
    temporaryHandle(){
        var newData = [];
        const {oldData, data} = this.state;
        // console.log('xxx',oldData)
        oldData.Data.map((item,index)=>{
            for(var key in item){
                if(item[key] !==data.Data[index][key]){
                    newData.push(data.Data[index]);
                }
            }
        })
        var modifyDataString = [];
        newData.map((item,index)=>{
            if(modifyDataString.indexOf(JSON.stringify(item))===-1){
                modifyDataString.push(JSON.stringify(item))
            }
        })
        var finalData = [];
        modifyDataString.map((item,index)=>{
            finalData.push(JSON.parse(item))
        })
        // console.log('xxxxxxxx',finalData);
        var postData = JSON.parse(JSON.stringify(finalData));
        postData.map((item,index)=>{
            delete item.AssistCode;
            delete item.BookID;
            delete item.Conflict;
            delete item.Page;
            delete item.UserID;
        })
        var params ={
            "data": postData
         }
       var msg = Post('http://47.96.20.101:8080/bookchapter/tempsave',params);
       msg.then((response)=>{
           if(response.data.success){
            message.success('暂存成功', 2)
           }
       })
    }
    render(){
        const {books,bookId,page,maxPages, data,totalPage} = this.state;
        // console.log(data);
        var tableData = data.Data || [];
        var dataResource = [];
        tableData.map((item,index)=>{
            dataResource.push(
                {
                    key: index,
                    id: item.AssistCode,
                    page: item.Page,
                    chapter:item.Chapter ==='-1'?<InputNumber value='' onChange={this.modifyValue.bind(this,['Chapter',item.AssistCode])}/>: <InputNumber value={item.Chapter} onChange={this.modifyValue.bind(this,['Chapter',item.AssistCode])}/>,
                    section:item.Section ==='-1'?<InputNumber value='' onChange={this.modifyValue.bind(this,['Section',item.AssistCode])}/>: <InputNumber value={item.Section} onChange={this.modifyValue.bind(this,['Section',item.AssistCode])}/>,
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
                        <Button type="primary" style={{marginLeft:120}} onClick={this.temporaryHandle.bind(this)}>暂存</Button>
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
                                <Button type="primary" onClick={this.okHandle.bind(this)}>确定</Button>
                                <Button onClick={this.cancelHandle.bind(this)}>取消</Button>
                            </div>
                        </div>
                    </div>
                    <div className='notes'><span>注:如果下面一格等同于上面一格信息，可不填写，空格部分提交后系统会自动填充</span></div>
                   
                </div>
                <div className='table-content'>
                    <Tables columns={columns} 
                            data={dataResource} 
                            showSizeChanger={false} 
                            totalPage={totalPage} 
                            currentPage={this.currentPage.bind(this)}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let data = Get('http://47.96.20.101:8080/book/query');
        data.then((response)=>{
            this.setState({
                books:response.data
            })
        })
    }
}

export default ChapterTable;