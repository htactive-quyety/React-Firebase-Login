import React, { useState, useEffect } from 'react';
import { firebaseAuth, firebaseDB } from '../firebase'
import { Button, Modal, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../asset/css/signIn.css'
import { Link } from 'react-router-dom'







// firebaseAuth.signInWithEmailAndPassword()
// 
// firebaseAuth.onAuthStateChanged(user)
const SignIn = () => {

  const [modalLoginShow, setmodalLoginShow] = React.useState(false)
  const [gmail, setgmail] = useState('');
  const [password, setpassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [user, setUser] = useState(null);
   const [userDB, setUserDB] = useState({})


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      let userID = user.uid
      var rootRef = firebaseDB.ref('user/' + userID);
            rootRef.once('value')
           .then((snapshot) =>{
             var data = (snapshot.val() || 'null');
             setUserDB(data);
           } )  

    });
  }, []);

  const showLoginModal = () => {
    setmodalLoginShow(true);
  };
  const handleCancelLogin = () => {
    setmodalLoginShow(false);
  };
  const handleSubmitSignIn = () => {
    if (gmail === '' || password === '') {
      setNameError('* Không được để trống')
      return true
    } else {
      firebaseAuth.signInWithEmailAndPassword(gmail, password)
        .then((res) => {
          alert('User login successfully!')
          setmodalLoginShow(false);
          setgmail('');
          setpassword('')
          setUser(res.user)
          

        })
        .catch(err => console.log("signInWithEmailAndPassword err", alert('nhập sai gmail hoặc password')))
    }
  }
  const LogoutBtn = () => {
    return <div className='App'>
      <img className="avatar" id='myImgId' src={userDB.avatarUser} alt="xxx" />
      <Link to="/user-detail">{user.email}</Link>
      <Button type="link" onClick={Logout}> Đăng xuất </Button>
    </div>

  }

  const LoginBtn = () => {
    return <Button type="link" onClick={showLoginModal}>Đăng nhập </Button>
  }
  const Logout = () => {
    firebaseAuth.signOut()
      .then((res) => {
        alert('User logout successfully!', res)
      })
      .catch(err => console.log("signOut err", err))
  }




  return (
    <div  >

      {user ? <div id='user'>{LogoutBtn()}</div> : <div id='user'>{LoginBtn()}</div>}

      <Modal

        title=" LOGIN ACCOUNT"
        visible={modalLoginShow}
        onOk={handleSubmitSignIn}
        onCancel={handleCancelLogin}>

        <Form direction='vertical'>
          <Form.Item label='Gmail: '>
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            <Input placeholder="Please enter Gmail" required onChange={event => setgmail(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='PassWord:'>
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            <Space direction="vertical">
              <Input.Password
                placeholder="Please enter Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={event => setpassword(event.target.value)}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}




export default SignIn