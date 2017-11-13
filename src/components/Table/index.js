import React, { Component } from 'react';
import {Table } from 'antd';
import './style.css';
class Tables extends Component{
    pageChage(value){
        console.log(value);
        this.props.currentPage(value.current,value.pageSize)
    }
    render(){
        const {totalPage} = this.props;
        return(
            <div>
                <Table
                    columns={this.props.columns}
                    dataSource={this.props.data}
                    bordered
                    pagination={{
                            total: totalPage,
                            pageSize: 5,
                            defaultPageSize:5,
                            showQuickJumper : true,
                            showSizeChanger: this.props.showSizeChanger,
                            pageSizeOptions:['5','10']
                        }}
                    onChange={this.pageChage.bind(this)}
                    /* scroll={{ y: 255 }} */
                />
            </div>
        )
    }
}

export default Tables;