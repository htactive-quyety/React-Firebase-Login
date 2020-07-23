import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import logoFt from '../asset/image/logofooter.png'
import { FacebookOutlined, TwitterOutlined, GoogleOutlined, SkypeOutlined, LinkedinOutlined, EnvironmentOutlined, PhoneOutlined, WhatsAppOutlined, MailOutlined, MinusOutlined, RightOutlined } from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu';
import '../asset/css/footer.css'


export default class footer extends Component {
    render() {
        return (
            <div id='footer'>
            <div className='footer1' >
              <div className='footer'>
                <Row>
                  <Col span={2}></Col>
                  <Col span={9}>
                    <img src={logoFt} alt='loFT' />
                    <Row>
                      <Col span={12}>
                        <p>Your satisfaction is our success!</p>
                        <FacebookOutlined className='FTicons' />
                        <TwitterOutlined className='FTicons' />
                        <GoogleOutlined className='FTicons' />
                        <SkypeOutlined className='FTicons' />
                        <LinkedinOutlined className='FTicons' />
                      </Col>
                      <Col span={12} className='list-icons'>
                        <Col ><EnvironmentOutlined /> 150 Duy Tan Da Nang, Viet Nam</Col>
                        <Col ><PhoneOutlined /> (+84) 905 610 229</Col>
                        <Col ><WhatsAppOutlined />(+84) 1227 423 919</Col>
                        <Col ><MailOutlined /> <a href="#">recruit@htactive.com</a></Col>
                      </Col>
                      <a className='list-icons' href="#">About Us <MinusOutlined /><RightOutlined /></a>
                    </Row>
                  </Col>
                  <Col span={3} className='menufooter'>
                    <h2>Links</h2>
                    <Menu onClick={handleClick} mode='vertical'>
                      <SubMenu className='submenu' key='sub1' title='HOME'></SubMenu>
                      <SubMenu className='submenu' key='sub1' title='SERVICE'></SubMenu>
                      <SubMenu className='submenu' key='sub1' title='PORTFOLIOS'></SubMenu>
                      <SubMenu className='submenu' key='sub1' title='BLOGS'></SubMenu>
                      <SubMenu className='submenu' key='sub1' title='CONTACT'></SubMenu>
                    </Menu>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={6} className='htactive'>
                    <h2>CONNECT WITH US!</h2>
                    <iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhtactive%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1780445882280832'></iframe>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </div>
              <div className='bw'>
                <Row>
                  <Col></Col>
                </Row>
              </div>
            </div>
            <div className='subfooter'>
              <Row>
                <Col span={2}></Col>
                <Col span={6} className='textFT'>
                  <p>Copyright © 2019 by HT Active. All Rights Reserved.</p>
                </Col>
                <Col span={6}></Col>
                <Col span={8} >
                  {/* <Row>
                    <Col span={4} className='textFT'>
                      <a href="#">Home </a>
                    </Col>
                    <Col span={5} className='textFT'>
                      <a href="#">Service  </a>
                    </Col>
                    <Col span={5} className='textFT'>
                      <a href="#">Portfolios </a>
                    </Col>
                    <Col span={4} className='textFT'>
                      <a href="#">Blogs </a>
                    </Col>
                    <Col span={4} className='textFT'>
                      <a href="#">Contact </a>
                    </Col>
                  </Row> */}
                </Col>
                <Col span={2}></Col>
              </Row>
            </div>
          </div>
        )
    }
}
function handleClick(e) {
    console.log('click', e);
  }