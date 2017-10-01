import React, { Component } from 'react';
import { Button, DropdownButton, Col, Image, FormControl, FormGroup, ButtonGroup, MenuItem, Row, Well } from 'react-bootstrap'
import curtis from '../curtis.jpg';
import { ToastContainer, toast } from 'react-toastify';

class VillainDataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {login: true, choosingRegion: true, showPrivacyModal: false, show18Modal: false}
    this.handleGet();
  }

  closePrivacy = () => {
    this.setState({ showPrivacyModal: false });
  }

  openPrivacy = () => {
    this.setState({ showPrivacyModal: true });
  }

  close18 = () => {
    this.setState({ show18Modal: false });
  }

  closeLogout18 = () => {
    this.setState({ show18Modal: false, login: true, choosingRegion: true, selectedRegion: null });
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
        { this.state.showPrivacyModal ?
          <div className="other-modal">
            <div className="other-modal-text">Privacy Policy: Tumblr single-origin coffee portland irure, freegan typewriter cray echo park. Pok pok flexitarian messenger bag, thundercats YOLO hammock vexillologist deserunt +1 tattooed ut helvetica green juice. Pickled offal glossier fingerstache. Nulla yr keytar, wolf truffaut next level chambray tbh. Yr iceland ex, narwhal adaptogen YOLO succulents ad biodiesel. Coloring book nostrud minim green juice offal authentic live-edge. Normcore jean shorts drinking vinegar, magna ipsum put a bird on it heirloom cray asymmetrical occaecat aesthetic disrupt. Lyft quis gluten-free synth dolore messenger bag pickled copper mug DIY. Wayfarers listicle artisan, quis chillwave non kickstarter cold-pressed butcher. Hot chicken polaroid copper mug consectetur. Bespoke microdosing ea, ut chia unicorn laborum drinking vinegar narwhal.</div>
            <Button onClick={this.closePrivacy} className="other-modal-button">Close</Button>
          </div> : ''
        }
        { this.state.show18Modal && this.state.ruleSet[this.state.selectedRegion]['prompt18'] ?
          <div className="other-modal">
            <div className="other-modal-text offset-top">This website requires you to be 18 years or older.</div>
            <div className="other-modal-text large">Are you over 18?</div>
            <ButtonGroup className="other-modal-button">
            <Button onClick={this.close18}>Yes</Button>
            <Button onClick={this.closeLogout18}>No</Button>
            </ButtonGroup>
          </div> : ''
        }
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
                            choosingRegion: false,
                            show18Modal: true
                          })
                        } key={region} >{region}</MenuItem>
                      })
                    }
                  </DropdownButton>
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
                    {this.state.ruleSet[this.state.selectedRegion]['regionalPrivacy'] ? <Button style={{marginBottom: '5px'}} onClick={this.openPrivacy}>Privacy Policy</Button> : ''}
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