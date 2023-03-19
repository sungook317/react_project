import React, {Component} from 'react';

class CreateMember extends Component {
  render() {
    return(
      <nav>
        <h2>신규 회원 등록</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(e.target.userId.value, e.target.userPassword.value, e.target.userName.value);
          }.bind(this)}>
          <p>
            <b>회원 아이디:</b> <input type="text" name="userId" placeholder="아이디"></input>
          </p>
          <p>
            <b>회원 비밀번호:</b> <input type="text" name="userPassword" placeholder="비밀번호"></input>
          </p>
          <p>
            <b>회원 이름:</b> <input type="text" name="userName" placeholder="이름"></input>
          </p>
          <p>
            <input type="submit" value="등록"></input>
          </p>
        </form>
      </nav>
    );
  }
}

export default CreateMember;