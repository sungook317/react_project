import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title';
import MemberList from './components/MemberList';
import Control from './components/Control';
import ReadMember from './components/ReadMember';
import CreateMember from './components/CreateMember';
import UpdateMember from './components/UpdateMember';

class App extends Component {
  constructor(props) {
    super(props);

    this.memberCnt = 3;
    this.state = {
      mode:'main',
      selectedMemberId:2,
      members:[
        {id:1, userId:'aaa', userPassword:'bbb', userName:'name1'},
        {id:2, userId:'ccc', userPassword:'ddd', userName:'name2'},
        {id:3, userId:'eee', userPassword:'fff', userName:'name3'}
      ]
    }
  }

  getReadMember() {
    var _members = null;

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
    var _memberList = null;

    if(this.state.mode === 'main') {
      // _title = this.state.main.title;
      // _desc = this.state.main.desc;
      // _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var _members = this.getReadMember();

      _memberList = <ReadMember userId={_members.userId}
                                userPassword={_members.userPassword}>
                    </ReadMember>
    } else if(this.state.mode === 'create') {
      _memberList = <CreateMember onSubmit={function(_userId, _userPassword, _userName){
                                    this.memberCnt = this.memberCnt + 1;
                                    var _members = Array.from(this.state.members);
                                    _members.push({id:this.memberCnt, userId:_userId, userPassword:_userPassword, userName:_userName});
                                    this.setState({members:_members, mode:'read', selectedMemberId:this.memberCnt});
                                  }.bind(this)}>
                    </CreateMember>
    } else if(this.state.mode === 'update') {
      var _members = this.getReadMember();

      _memberList = <UpdateMember data={_members}
                                  onSubmit={function(_id, _userId, _userPassword, _userName){
                                    var _members = Array.from(this.state.members);

                                    for(var i = 0; i < _members.length; i ++) {
                                      if(_members[i].id === _id) {
                                        _members[i] = {id:_id, userId:_userId, userPassword:_userPassword, userName:_userName};
                                        break;
                                      }
                                    }
                                    this.setState({members:_members, mode:'read'});
                                  }.bind(this)}>
                    </UpdateMember>
    }

    return _memberList;
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