import React, {Component} from 'react';

class Control extends Component {
  render() {
    return(
      <nav>
        <input type="button"
               value="회원 조회"
               onClick={function(e){
                 e.preventDefault();
                 this.props.onChangeMode('readAll');
               }.bind(this)}>
        </input>
        <input type="button"
               value="회원 등록"
               onClick={function(e){
                 e.preventDefault();
                 this.props.onChangeMode('create');
               }.bind(this)}>
        </input>
        <input type="button"
               value="회원 수정"
               onClick={function(e){
                 e.preventDefault();
                 this.props.onChangeMode('update');
               }.bind(this)}>
        </input>
        <input type="button"
               value="회원 삭제"
               onClick={function(e){
                 e.preventDefault();
                 this.props.onChangeMode('delete');
               }.bind(this)}>
        </input>
      </nav>
    );
  }
}

export default Control;