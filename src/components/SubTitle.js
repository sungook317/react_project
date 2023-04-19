import React, {Component} from 'react';

class SubTitle extends Component {
  getTitle(mode) {
    var htmlList = [];

    

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

export default SubTitle;