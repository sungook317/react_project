import React, {Component} from 'react';

class TOC extends Component {
  // render()를 수행하기 전에 수행하는 함수
  shouldComponentUpdate(newProps, newState) {
    if(this.props.data === newProps) {
      return false; // render() 함수 수행 X
    }

    return true; // render() 함수 수행
  }

  render() {
    var lists = [];
    var data = this.props.data; // input으로 넘어오는 데이터
    var i = 0;

    while(i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/"+data[i].id}
            data-id = {data[i].id} // (특수형식 선언) dataset 하위에 있는 id의 값 set
            onClick={function(e){
              e.preventDefault(); // 페이지를 처음부터 새로 다시 그리는 기능을 방지
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >{data[i].title}</a>
        </li>);
      i = i + 1;
    }

    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC; // 외부에서 TOC를 가져다 쓸 수 있게함