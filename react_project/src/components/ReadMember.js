import React, {Component} from 'react';

class ReadMember extends Component {
  render() {
    return(
      <nav>
        <h2>회원 정보 조회</h2>
        <nav>
          <b>회원 아이디:</b> {this.props.userId}
        </nav>
        <nav>
          <b>회원 비밀번호:</b> {this.props.userPassword}
        </nav>
        <nav>
          <b>회원 이름:</b> {this.props.userName}
        </nav>
      </nav>
    );
  }
}

export default ReadMember;