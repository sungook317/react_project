import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title';
import ReadContent from './components/ReadContent';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import MemberList from './components/MemberList';

class App extends Component {
  constructor(props) {
    super(props);

    this.memberCnt = 3;
    this.state = {
      mode:'main',
      selectedMemberId:2,
      subject:{title:'WEB', sub:'world wide web!'},
      main:{title:'main', desc:'Hello, React!!'},
      members:[
        {id:1, userId:'aaa', userPassword:'bbb', userName:'name1'},
        {id:2, userId:'ccc', userPassword:'ddd', userName:'name2'},
        {id:3, userId:'eee', userPassword:'fff', userName:'name3'}
      ]
    }
  }

  getReadMember() {
    var _members= null;

    for(var idx = 0; idx < this.state.members.length; idx ++) {
      _members = this.state.members[idx];

      if(_members.id === this.state.selectedMemberId) {
        return _members;
      }
    }
  }
  
  getMembers() {
    var _title = null;
    var _desc = null;
    var _memberInfo = null;

    if(this.state.mode === 'main') {
      // _title = this.state.main.title;
      // _desc = this.state.main.desc;
      // _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var _content = this.getReadMember();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.memberCnt = this.memberCnt + 1;
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.memberCnt, title:_title, desc:_desc});
        this.setState({contents:_contents, mode:'read', selectedMemberId:this.memberCnt});
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({contents:_contents, mode:'read'});
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }

  render() { // state를 변경하게 되면 render() 함수가 재실행
    console.log('render', this);

    return(
      <div className="App">
        <Title mode={this.state.mode}>
        </Title>
        <MemberList members={this.state.members}
                    onChangePage={function(id){
                      this.setState({mode:'read', selectedMemberId:Number(id)});
                    }.bind(this)}>
        </MemberList>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete') {
            if(window.confirm('really?')) {
              var _members = Array.from(this.state.members);
              var i= 0;

              while(i < this.state.members.length) {
                if(_members[i].id === this.state.selectedMemberId) {
                  _members.splice(i, 1);
                  break;
                }

                i = i + 1;
              }

              this.setState({
                mode:'main',
                members:_members
              });

              alert('deleted!');
            }
          } else {
            this.setState({
              mode : _mode
            });
          }
        }.bind(this)}>
        </Control>
        {this.getMembers()}
      </div>
    );
  }
}

export default App;