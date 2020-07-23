import React, { useState, useEffect } from 'react';
import { firebaseAuth, firebaseDB } from '../firebase'

import { Button, Modal, Form, Input, Space, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'


const SignUp = () => {

  const [modalSignUpShow, setmodalSignUpShow] = React.useState(false)
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [gender, setgender] = useState('');
  const [phone, setphone] = useState('');
  const [gmail, setgmail] = useState('');
  const [address, setaddress] = useState('');
  const [dayOfBirth, setdayOfBirth] = useState('');
  const [password, setpassword] = useState('');
  const [cFPassword, setCFPassword] = useState('');
  //  const [roleUser, setroleUser] = useState('');
  const [Error, setError] = useState(null)
  const [PwError, setPwError] = useState(null)
  const [userName, setUserName] = useState(null);


  const [user, setUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const showmodalSignUp = () => {
    setmodalSignUpShow(true);
  };
  const handleCancelmodalSignUp = () => {
    setmodalSignUpShow(false);
  };

  const handleSubmitSignUp = () => {
    // const listInf = {
    //   'First Name': fName,
    //   'Last Name': lName,
    //   'Gender': gender,
    //   'Phone': phone,
    //   'Gmail': gmail,
    //   'Password': password,
    //   'Confirm Password': cFPassword`
    // }`
    //textInput.focus();
    // console.log(listInf);
    if (fName === '' || lName === '' || gmail === '' || password === '' || cFPassword === '') {
      setError('* Không được để trống')
      return true
    }
    if (password !== cFPassword) {
      setPwError('* Password và Confirm Password không trùng!!')
      setpassword('');
      setCFPassword('');
      return true
    }
    if (password.length <= 5) {
      setPwError('* Password phải >= 6 kí tự')
      setpassword('');
      setCFPassword('');

      return true
    }
    else {
      setError(null)
      firebaseAuth.createUserWithEmailAndPassword(gmail, password)
        .then(user => {
          let userID = user.uid
          firebaseDB.ref('user/' + userID).set({
            iduser: userID,
            fName: fName,
            lName: lName,
            userName: userName,
            gender: gender,
            phone: phone,
            gmail: gmail,
            dayOfBirth: dayOfBirth,
            address: address,
            password: password,
            roleUser: "user",
            avatarUser: 'https://ih0.redbubble.net/image.198078755.6567/mp,550x550,matte,ffffff,t.u5.jpg',
          })
          firebaseAuth.currentUser.updateProfile({ photoURL: "http://localhost:3000/static/media/logofooter.87b938cf.png" })
          alert('User register successfully!')
          setmodalSignUpShow(false);
        })
        .catch(err => console.log("createUserWithEmailAndPassword err", alert(err)))
    }
  }
  const genderType = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  }

  return (
    <div  >
      {user ? <div id='user'>{null}</div> : <div id='user'>{<Button type="link" onClick={showmodalSignUp}>Đăng ký</Button>}</div>}

      <Modal
        title=" SIGNUP ACCOUNT"
        visible={modalSignUpShow}
        onOk={handleSubmitSignUp}
        onCancel={handleCancelmodalSignUp}>
        <Form direction='vertical' labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}>
          <Form.Item label='First Name: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input placeholder="Please enter your First Name" required onChange={event => setfName(event.target.value)} ></Input>
          </Form.Item>
          <Form.Item label='Last Name: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input placeholder="Please enter your Last Name" required onChange={event => setlName(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='User Name: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input placeholder="Please enter your UserName" required onChange={event => setUserName(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='Address: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input placeholder="Please enter your Address" required onChange={event => setaddress(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='Day Of Birth: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input type="date" id="birthday" name="birthday" required onChange={event => setdayOfBirth(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='Gender'>
            <Radio.Group name="radiogroup" wrapperCol={{ span: 18 }}   >
              <Radio value='Male' checked={gender === 1} onChange={event => setgender(event.target.value)} >Male</Radio>
              <Radio value='Female' checked={gender === 2} onChange={event => setgender(event.target.value)} >Female</Radio>
              <Radio value='Other' checked={gender === 3} onChange={event => setgender(event.target.value)} >Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Phone Number: '>
            <Input placeholder="Please enter your Phone Number" type='number' required onChange={event => setphone(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='Gmail: '>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <Input placeholder="Please enter Gmail" required onChange={event => setgmail(event.target.value)}></Input>
          </Form.Item>
          <Form.Item label='PassWord:' >
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            {PwError && <p style={{ color: "red" }}>{PwError}</p>}
            <Space direction="vertical">
              <Input.Password
                placeholder="Password >= 6 characters"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={event => setpassword(event.target.value)}
              />
            </Space>
          </Form.Item>
          <Form.Item label='Confirm PassWord:'>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            {PwError && <p style={{ color: "red" }}>{PwError}</p>}
            <Space direction="vertical">
              <Input.Password
                placeholder="Confirm Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={event => setCFPassword(event.target.value)}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>





    // <button onClick={() => firebaseAuth.createUserWithEmailAndPassword('test@gmail.com', '123456')
    // .then(user => console.log("createUserWithEmailAndPassword", user))
    // .catch(err => console.log("createUserWithEmailAndPassword err", err))}>sign up</button>
  )
}

export default SignUp