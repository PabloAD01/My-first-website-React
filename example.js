import React, { Component } from 'react'

export default class ModalClass extends Component {
  isActive;
  closeModal;

  constructor(isActive, closeModal) {
    this.closeModal = closeModal
    this.isActive = isActive
  }

  getDerivedStateFromProps() {}


  render() {
    return (
      <div>example</div>
    )
  }
}

