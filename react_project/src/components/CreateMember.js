import React, {Component} from 'react';

class CreateMember extends Component {
  render() {
    return(
      <article>
        <h2>Create</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(e.target.userId.value, e.target.userPassword.value, e.target.userName.value);
          }.bind(this)}>
          <p>
            <input type="text" name="userId" placeholder="userId"></input>
          </p>
          <p>
            <input type="text" name="userPassword" placeholder="userPassword"></input>
          </p>
          <p>
            <input type="text" name="userName" placeholder="userName"></input>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateMember;