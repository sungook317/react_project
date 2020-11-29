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
      <article>
        <h2>Update</h2>
        <form action="/update_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(this.state.id, this.state.userId, this.state.userPassword, this.state.userName);
          }.bind(this)}>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input type="text" name="userId" placeholder="userId" value={this.state.userId} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <input type="text" name="userPassword" placeholder="userPassword" value={this.state.userPassword} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <input type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateMember;