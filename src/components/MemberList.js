import React, {Component} from 'react';

class MemberList extends Component {
  shouldComponentUpdate(newProps, newState) { // render()를 수행하기 전에 수행하는 함수
    if(this.props.members === newProps) {
      return false;  // render() 함수 수행 X
    }

    return true; // render() 함수 수행
  }

  render() {
    var mode = this.props.mode;
    var members = this.props.members;
    var htmlList = [];

    if(mode !== 'main') {
      for(var idx = 0; idx < members.length; idx ++) {
        htmlList.push(<li key={members[idx].id}>
                        <a href={"/content/" + members[idx].id}
                           data-id = {members[idx].id}
                           onClick={function(e){
                             e.preventDefault();
                             this.props.onChangePage(e.target.dataset.id);
                           }.bind(this)}>{members[idx].userName}
                        </a>
                      </li>);
      }
    }

    return(
      <nav>
        <ul>
          {htmlList}
        </ul>
      </nav>
    );
  }
}

export default MemberList;