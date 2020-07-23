import React, { Component } from 'react'
import logo from '../asset/image/logoheader.png'
import { Menu, Row, Col } from 'antd'
import '../asset/css/header.css'
import {BrowserRouter as  Link} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
                    <div className='menuHeader'>

                        <Row>
                            <Col  span={2}></Col>
                            <Col span={6}>
                                <img id='logoheader' src={logo} alt="logoheader" />
                                <p>Luôn Bên Bạn :)))</p>
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <Menu mode='horizontal'>
                                    <Menu.Item><Link to='/'>HOME</Link> </Menu.Item>
                                    <Menu.Item><Link to=''>SERVICE</Link></Menu.Item>
                                    <Menu.Item>PORTFOLIOS</Menu.Item>
                                    <Menu.Item>BLOGS</Menu.Item>
                                    <Menu.Item>CONTACT</Menu.Item>
                                </Menu>
                            </Col>
                            <Col  span={2}></Col>
                        </Row>

                    </div>

        )
    }
}
