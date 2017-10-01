/**
 * Created by LMH1201 on 10/1/17.
 */
import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default Modal;