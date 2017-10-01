import React, { Component } from 'react';
import { Button, DropdownButton, Col, FormControl, ControlLabel, FieldGroup, FormGroup, MenuItem, Row, Well } from 'react-bootstrap'

class VillainDataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {login: true, choosingRegion: true, showModal: false}
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
      this.state.regions = wants;
      this.state.ruleSet = json;
      console.log(this.state.ruleSet);
    });
  };

  handleRegionAndModal = (region) => {
    this.open();
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
    this.handleGet();
    return (
      <div>
        <div className="header">
          <img className="alpaca" />
          <span className="header-title">CODE: MAMMAL</span>
          <img className="shield" />
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
                      return <MenuItem onClick={
                        this.handleRegionAndModal(region)} key={region} >{region}</MenuItem>
                    })
                  }
                </DropdownButton>
                </Col>
              </Row> :
            <Row>
              <Col md={4} />
              <Col md={4}>
                <div class="button-wrapper">
                  <Button bsStyle="info" onClick={this.viewTheVillian}>View Villian</Button>
                </div>
                {this.state.viewVillian ?
                  <div>
                    <Row>
                      <Well bsSize="small"><span style={{marginRight: '100px'}}>First Name:</span>Curtis</Well>
                      <Well bsSize="small"><span style={{marginRight: '100px'}}>Last Name:</span>Meuth</Well>
                      <Well bsSize="small"><span style={{marginRight: '100px'}}>Gender:</span>Female</Well>
                      <Well bsSize="small"><span style={{marginRight: '100px'}}>Power Level:</span>-1</Well>
                      <Well bsSize="small"><span style={{marginRight: '100px'}}>Alter Ego:</span>El Corgo</Well>
                      { this.state.ruleSet[this.state.selectedRegion]['allowDataRemoval'] ? <Button bsStyle="danger">Delete</Button> : ''}
                    </Row>
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