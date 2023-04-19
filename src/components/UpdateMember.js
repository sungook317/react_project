import React, {Component} from 'react';

class UpdateMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:this.props.data.id,
      userId:this.props.data.userId,
      userPassword:this.props.data.userPassword,
      userName:this.props.data.userName
    };

    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    return(
      <nav>
        <h2>회원 정보 수정</h2>
        <form action="/update_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(this.state.id, this.state.userId, this.state.userPassword, this.state.userName);
          }.bind(this)}>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <b>회원 아이디:</b> <input type="text" name="userId" placeholder="아이디" value={this.state.userId} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <b>회원 비밀번호:</b> <input type="text" name="userPassword" placeholder="비밀번호" value={this.state.userPassword} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <b>회원 이름:</b> <input type="text" name="userName" placeholder="이름" value={this.state.userName} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <input type="submit" value="수정"></input>
          </p>
        </form>
      </nav>
    );
  }
}

export default UpdateMember;