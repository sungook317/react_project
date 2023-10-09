import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import MainTitle from './components/MainTitle';
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
      selectedMemberId:0,
      members:[
        {id:1, userId:'aaa', userPassword:'bbb', userName:'name1'},
        {id:2, userId:'ccc', userPassword:'ddd', userName:'name2'},
        {id:3, userId:'eee', userPassword:'fff', userName:'name3'}
      ]
    }
  }

  userIdIsValid(userId) {
    if(userId == null || userId.trim() === '') {
      return false;
    }

    return true;
  }

  userIdIsExist(userId) {
    for(var idx = 0; idx < this.state.members.length; idx ++) {
      if(userId.trim() === this.state.members[idx].userId) {
        return true;
      }
    }

    return false;
  }

  userIdIsChanged(id, userId) {
    if(userId.trim() !== this.state.members[id - 1].userId) {
      return true;
    }

    return false;
  }

  userPasswordIsValid(userPassword) {
    if(userPassword == null || userPassword.trim() === '') {
      return false;
    }

    return true;
  }

  userNameIsValid(userName) {
    if(userName == null || userName.trim() === '') {
      return false;
    }

    return true;
  }

  userNameIsExist(userName) {
    for(var idx = 0; idx < this.state.members.length; idx ++) {
      if(userName.trim() === this.state.members[idx].userName) {
        return true;
      }
    }

    return false;
  }

  userNameIsChanged(id, userName) {
    if(userName.trim() !== this.state.members[id - 1].userName) {
      return true;
    }

    return false;
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
    var _members = null;
    var _memberList = null;

    if(this.state.mode === 'read') {
      _members = this.getReadMember();
      _memberList = <ReadMember userId={_members.userId}
                                userPassword={_members.userPassword}
                                userName={_members.userName}>
                    </ReadMember>
    } else if(this.state.mode === 'create') {
      _memberList = <CreateMember onSubmit={function(_userId, _userPassword, _userName){
                                    if(this.userIdIsValid(_userId) === false) {
                                      alert('회원 아이디는 필수입니다.');
                                      return;
                                    }

                                    if(this.userIdIsExist(_userId)) {
                                      alert('동일한 아이디가 존재합니다.');
                                      return;
                                    }

                                    if(this.userPasswordIsValid(_userPassword) === false) {
                                      alert('회원 비밀번호는 필수입니다.');
                                      return;
                                    }

                                    if(this.userNameIsValid(_userName) === false) {
                                      alert('회원 이름은 필수입니다.');
                                      return;
                                    }

                                    if(this.userNameIsExist(_userName)) {
                                      alert('동일한 이름이 존재합니다.');
                                      return;
                                    }

                                    this.memberCnt = this.memberCnt + 1;
                                    var _members = Array.from(this.state.members);

                                    _members.push({id:this.memberCnt, userId:_userId.trim(), userPassword:_userPassword.trim(), userName:_userName.trim()});
                                    this.setState({members:_members, mode:'read', selectedMemberId:this.memberCnt});

                                    alert('신규 회원을 등록하였습니다.');
                                  }.bind(this)}>
                    </CreateMember>
    } else if(this.state.mode === 'update') {
      _members = this.getReadMember();
      _memberList = <UpdateMember data={_members}
                                  onSubmit={function(_id, _userId, _userPassword, _userName){
                                    if(this.userIdIsValid(_userId) === false) {
                                      alert('회원 아이디는 필수입니다.');
                                      return;
                                    }

                                    if(this.userIdIsChanged(_id, _userId)) {
                                      if(this.userIdIsExist(_userId)) {
                                        alert('동일한 아이디가 존재합니다.');
                                        return;
                                      }
                                    }

                                    if(this.userPasswordIsValid(_userPassword) === false) {
                                      alert('회원 비밀번호는 필수입니다.');
                                      return;
                                    }

                                    if(this.userNameIsValid(_userName) === false) {
                                      alert('회원 이름은 필수입니다.');
                                      return;
                                    }

                                    if(this.userNameIsChanged(_id, _userName)) {
                                      if(this.userNameIsExist(_userName)) {
                                        alert('동일한 이름이 존재합니다.');
                                        return;
                                      }
                                    }

                                    var _members = Array.from(this.state.members);

                                    for(var i = 0; i < _members.length; i ++) {
                                      if(_members[i].id === _id) {
                                        _members[i] = {id:_id, userId:_userId.trim(), userPassword:_userPassword.trim(), userName:_userName.trim()};
                                        break;
                                      }
                                    }

                                    this.setState({members:_members, mode:'read'});

                                    alert('회원 정보를 수정하였습니다.');
                                  }.bind(this)}>
                    </UpdateMember>
    }

    return _memberList;
  }

  render() { // state를 변경하게 되면 render() 함수가 재실행
    return(
      <div className="App">
        <MainTitle>
        </MainTitle>
        <Control onChangeMode={function(_mode){
                   if(_mode === 'create') {
                     this.setState({selectedMemberId:0, mode:_mode});
                   } else if(_mode === 'update') {
                     if(this.state.selectedMemberId === 0) {
                       alert('수정할 회원을 선택해주세요..');
                       return;
                     }

                     this.setState({mode:_mode});
                   } else if(_mode === 'delete') {
                     if(this.state.selectedMemberId === 0) {
                       alert('삭제할 회원을 선택해주세요.');
                       return;
                     }
                     
                     if(window.confirm('회원을 삭제하시겠습니까?')) {
                       var _members = Array.from(this.state.members);

                       for(var i = 0; i < this.state.members.length; i ++) {
                         if(_members[i].id === this.state.selectedMemberId) {
                           _members.splice(i, 1);
                           break;
                         }
                       }

                       this.setState({mode:'readAll', members:_members});

                       alert('회원 정보를 삭제하였습니다.');
                     }
                   } else {
                     this.setState({mode:_mode});
                   }
                 }.bind(this)}>
        </Control>
        <MemberList mode={this.state.mode}
                    members={this.state.members}
                    onChangePage={function(id){
                      this.setState({mode:'read', selectedMemberId:Number(id)});
                    }.bind(this)}>
        </MemberList>
        {this.getMembers()}
      </div>
    );
  }
}

export default App;