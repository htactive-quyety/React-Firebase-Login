import React, { useState, useEffect } from 'react';
import { firebaseAuth, firebaseDB,storage } from '../firebase'
import '../asset/css/editprofile.css'

import { Row, Col, Button, Tabs, Form, Input, Space, Radio, Menu } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';




const UserProfile = () => {

  const { TabPane } = Tabs;

  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [userName, setUserName] = useState('');
  const [dayOfBirth, setdayOfBirth] = useState('');
  const [gender, setgender] = useState('');
  const [address, setaddress] = useState('');
  const [password, setpassword] = useState('');
  const [cfpassword, setCFPassword] = useState('');
  const [phone, setphone] = useState('');
  const [gmail, setgmail] = useState('');
  const [Error, setError] = useState(null)
  const [avatarUser, setavatarUser] = useState(null)
 const [user, setUser] = useState(null);
 const [userDB, setUserDB] = useState({})
 const [url, setUrl]=useState('');

  const genderType = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  }

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

  const handleChange = (e) =>{
    var output = document.getElementById('imgPF');
     output.src = URL.createObjectURL(e.target.files[0]);

     output.onloadend = () => {
      const result = output.result
      console.log('result', result);
      setavatarUser(result)
    }
    // output.onload = handleChange();{
    //    URL.revokeObjectURL(output.src)
    // }


    // if ( e.target.files[0]) {
    //   setavatarUser(e.target.files[0]);
    // }
  }

  const submitEdit = ()=>{
    const uploadimg = storage.ref(`images/${avatarUser.name}`).put(avatarUser);
    uploadimg.on('state_changed',
    snapshot=>{},
    error =>{
      console.log(error);
    },
    ()=>{
      storage
      .ref('images')
      .child(avatarUser.name)
      .getDownloadURL()
      .then(url =>{
        setUrl(url)

      });
    })



  }


 console.log('img',avatarUser)



  return (
    
    
    <div className='editForm'>
      <div className='imge-upload'>
        <label htmlFor='file-input'>
  <img id='imgPF'  src={userDB.avatarUser} alt="imgProfile" /> 
        </label>
        <input id="file-input" accept='image/*' type='file' onChange={(e) => handleChange(e)} />
      </div>
      <Row className='menuWC'>
        <Col span={2}> </Col>
        <Col span={20}>
          <Tabs defaultActiveKey='1' tabPosition='left' >
            <TabPane tab='Edit Profile' key='1'>
              <Form direction='vertical' labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}>
                <Form.Item label='First Name: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your First Name" 
                   required value={userDB.fName}
                  onChange={event => setfName(event.target.value)} ></Input>
                </Form.Item>
                <Form.Item label='Last Name: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your Last Name" required
                  value={userDB.lName}
                   onChange={event => setlName(event.target.value)}></Input>
                </Form.Item>
                <Form.Item label='User Name: '>
                      {Error && <p style={{ color: "red" }}>{Error}</p>}
                      <Input placeholder="Please enter your UserName" required 
                       value={userDB.userName}
                      onChange={event => setUserName(event.target.value)}></Input>
                    </Form.Item>
                <Form.Item label='Address: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter your Address" required 
                  value={userDB.address}
                  onChange={event => setaddress(event.target.value)}></Input>
                </Form.Item>
                <Form.Item label='Day Of Birth: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input type="date" id="birthday" name="birthday" required
                  value={userDB.dayOfBirth}
                   onChange={event => setdayOfBirth(event.target.value)}></Input>
                </Form.Item>
                <Form.Item label='Gender'>
                  <Radio.Group name="radiogroup" wrapperCol={{ span: 18 }}   >
                    <Radio value='Male'  checked={gender === 1} onChange={event => setgender(event.target.value)} >Male</Radio>
                    <Radio value='Female'  checked={gender === 2} onChange={event => setgender(event.target.value)} >Female</Radio>
                    <Radio value='Other'  checked={gender === 3} onChange={event => setgender(event.target.value)} >Other</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label='Phone Number: '>
                  <Input placeholder="Please enter your Phone Number" type='number' required 
                  value={userDB.phone}
                  onChange={event => setphone(event.target.value)}></Input>
                </Form.Item>
                <Form.Item label='Gmail: '>
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  <Input placeholder="Please enter Gmail" required
                  value={userDB.gmail}
                   onChange={event => setgmail(event.target.value)}></Input>
                </Form.Item>
                <Button className='btnsaveEditPF'>Save</Button>
              </Form>
            </TabPane>
            <TabPane tab='Change Password' key='2'>
              <Form labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}>
                <Form.Item label='PassWord:' >
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  {/* {PwError && <p style={{ color: "red" }}>{PwError}</p>} */}
                  <Space direction="vertical">
                    <Input.Password
                      placeholder="Password >= 6 characters"
                      value={userDB.password}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      onChange={event => setpassword(event.target.value)}
                    />
                  </Space>
                </Form.Item>
                <Form.Item label='New PassWord:' >
                  {Error && <p style={{ color: "red" }}>{Error}</p>}
                  {/* {PwError && <p style={{ color: "red" }}>{PwError}</p>} */}
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
                  {/* {PwError && <p style={{ color: "red" }}>{PwError}</p>} */}
                  <Space direction="vertical">
                    <Input.Password
                      placeholder="Confirm Password"

                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      onChange={event => setCFPassword(event.target.value)}
                    />
                  </Space>
                </Form.Item>
                <Button className='btnsaveEditPF'>Save</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={2}></Col>
      </Row>



    </div>
  )


}
export default UserProfile