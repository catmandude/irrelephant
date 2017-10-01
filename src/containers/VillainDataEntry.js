import React, { Component } from 'react';
import { Button, DropdownButton, Col, Image, FormControl, FormGroup, Modal, MenuItem, Row, Well } from 'react-bootstrap'
import curtis from '../curtis.jpg';
import { ToastContainer, toast } from 'react-toastify';

class VillainDataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {login: true, choosingRegion: true, showModal: true, deleteVillian: false}
    this.handleGet();
  }
  toggleClick = (event) => {
    const oldRuleSet = this.state.ruleSet;
    const changedIdValue = event.target.id;
    oldRuleSet[this.state.selectedRegion][changedIdValue] = !oldRuleSet[this.state.selectedRegion][changedIdValue];
    this.setState({
      oldRuleSet
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleGet = () => {
    fetch('http://localhost:3001/api/v1/ruleSet',
      {
        method: 'get',
        headers: {
          "Content-type": "application/json"
        }},
    ).then( response => {
      return response.json();
    }).then( json => {
      const keys = Object.keys(json);
      const wants = keys.filter(key => {
        return (key !== '_id' && key !== '_rev');
      })
      this.setState({regions:wants, ruleSet:json})
    });
  };

  handleRegionAndModal = (region) => {
    this.setState({
      selectedRegion: region,
      choosingRegion: false
    })
  }

  handleLogin = () => {
    this.setState({login: false})
  }

  viewTheVillian = () => {
    this.setState({viewVillian: true})
    this.setState({showModal: true})
  }

  componentWillReceiveProps(next) {
    this.setState({region: this.state.selectedRegion, ruleset: next.state.ruleSet})
  }
  render() {
    return (
      <div>
        <ToastContainer 
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <div className="header">
          <img alt="Application Logo" className="alpaca" />
          <span className="header-title">CODE: MAMMAL</span>
          <Button bsStyle="primary" className='pull-right' style={{marginRight: '200px', marginTop:'30px', width: '200px'}}
            onClick={() => this.setState({login: true, choosingRegion: true, showModal: true, deleteVillian: false, selectedRegion: null})}>Log out</Button>
          <img alt="Enterprise Logo" className="shield" />
        </div>
        {this.state.login ?
          <form className="login">
            <Col md={4} />
            <Col md={4}>
              <FormGroup
                controlId="username"
              >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="password"
              >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button style={{width: '250px'}} bsSize="small" onClick={this.handleLogin}>Login</Button>
            </Col>
          </form>
          :
          <div>
            {this.state.choosingRegion ?
              <Row>
                <Col md={4} />
                <Col md={4}>
                  <DropdownButton title={this.state.selectedRegion ? this.state.selectedRegion : 'Select a Region'} id="bg-nested-dropdown">
                    {
                      this.state.regions.map((region) => {
                        return <MenuItem onClick={ () =>
                          this.setState({
                            selectedRegion: region,
                            choosingRegion: false
                          })
                        } key={region} >{region}</MenuItem>
                      })
                    }
                  </DropdownButton>
                  <Modal title='Modal title' onRequestHide={this.hideListItem}>
                    <p>I am a modal!</p>
                  </Modal>{/*<Modal show={this.state.showModal} onHide={this.close}>
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
                 </Modal>*/}
                </Col>
              </Row> :
              <Row>
                <Col md={2} />
                <Col md={8}>
                  <div className="button-wrapper">
                    <Button bsStyle="info" onClick={this.viewTheVillian}>View Villian</Button>
                  </div>
                  {this.state.viewVillian ?
                    <div>
                      {!this.state.deleteVillian ?
                        <Row>
                          <Col md={6}>
                            <Image style={{width: '350px', marginTop:'15px', marginBottom: '15px'}} src={curtis} />
                          </Col>
                          <Col md={6} style={{marginTop: '100px'}} >
                            <Well bsSize="small"><span style={{marginRight: '100px'}}>First Name:</span>Curtis</Well>
                            <Well bsSize="small"><span style={{marginRight: '100px'}}>Last Name:</span>Meuth</Well>
                            <Well bsSize="small"><span style={{marginRight: '100px'}}>Gender:</span>Female</Well>
                            <Well bsSize="small"><span style={{marginRight: '100px'}}>Power Level:</span>-1</Well>
                            <Well bsSize="small"><span style={{marginRight: '100px'}}>Alter Ego:</span>El Corgo</Well>
                          </Col>
                          { this.state.ruleSet[this.state.selectedRegion]['allowDataRemoval'] ? <Button bsStyle="danger" onClick={() => {
                            toast('Villian has been deleted!')
                            this.setState({deleteVillian: true})}}>Delete</Button>
                            : ''}
                        </Row> : ''}
                    </div>
                    : ''}
                  {!this.state.viewVillian ?
                    <div className="button-wrapper">
                      <Button style={{marginBottom: '5px'}} bsStyle="info">Add Villian</Button>
                    </div>
                    :
                    '' }
                  <Row>
                    {this.state.ruleSet[this.state.selectedRegion]['regionalPrivacy'] ? <Button style={{marginBottom: '5px'}}>Privacy Policy</Button> : ''}
                  </Row>
                  <Row>
                    {this.state.ruleSet[this.state.selectedRegion]['allowComplaints'] ? <Button style={{marginBottom: '5px'}}>Complaint Department</Button> : ''}
                  </Row>
                </Col>
              </Row> }
          </div>

        }
      </div>
    );
  }
}

export default VillainDataEntry;