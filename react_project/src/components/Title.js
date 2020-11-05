import React, {Component} from 'react';

class Title extends Component {
  getTitle(mode) {
    var htmlList = [];

    if(mode === 'main') {
      htmlList.push(<h1>회원 관리</h1>);
      htmlList.push(<h2>회원 정보를 관리하는 화면입니다.</h2>);
    } else if(mode === 'read') {
      htmlList.push(<h1>회원 조회</h1>);
      htmlList.push(<h2>회원 정보를 조회하였습니다.</h2>);
    } else if(mode === 'create') {
      htmlList.push(<h1>회원 조회</h1>);
      htmlList.push(<h2>회원 정보를 조회하였습니다.</h2>);
    } else if(mode === 'update') {
      htmlList.push(<h1>회원 조회</h1>);
      htmlList.push(<h2>회원 정보를 조회하였습니다.</h2>);
    } else if(mode === 'delete') {
      htmlList.push(<h1>회원 조회</h1>);
      htmlList.push(<h2>회원 정보를 조회하였습니다.</h2>);
    }

    return htmlList;
  }

  render() {
    return(
      <header>
        {this.getTitle(this.props.mode)}
      </header>
    );
  }
}

export default Title;