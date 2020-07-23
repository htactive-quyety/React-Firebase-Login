import React, { Component } from 'react'
import { Button } from 'antd'
import '../asset/css/productList.css'



export default class index extends Component {
    constructor() {
        super();
        this.state = {
          contacts: [],
        };
      }
      componentDidMount(){
        fetch('https://5ee7355452bb0500161fd5be.mockapi.io/products')
        .then(res => res.json())
        .then(data => this.setState({ contacts: data }))
      }
    render() {
        return (
            <div>
        <div className='flex-container'>
          {this.state.contacts.map((contact, index) => (
            <div className='showProduct' key={index}>
              <img src={contact.image} alt="img product" />
              <div className='productInfor'>
                <p><strong>Name:</strong> {contact.nameProduct} </p>
                <p><strong>Price:</strong> {contact.price} </p>
              </div>
              <div className='buttonProduct'>
                <Button >Edit </Button>
                <Button > Delete</Button>
              </div>
            </div>))}
        </div>
      </div>
        )
    }
}
