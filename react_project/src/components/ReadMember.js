import React, {Component} from 'react';

class ReadMember extends Component {
  render() {
    return(
      <article>
        <h2>{this.props.userId}</h2>
        {this.props.userPassword}
      </article>
    );
  }
}

export default ReadMember;