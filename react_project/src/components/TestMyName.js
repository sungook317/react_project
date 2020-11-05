import React, {Component} from 'react';

class TestMyName extends Component {
    render() {
        return(
            <div>
                안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
            </div>
        );
    }
}

TestMyName.defaultProps = {
    name : '기본이름'
}

export default TestMyName;