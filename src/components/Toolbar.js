import React from 'react';
import MessageList from './MessageList';

let data = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  }, {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  }, {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  }, {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  }, {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  }, {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

 export default class Toolbar extends React.Component {
  constructor() {
    super();
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].selected);
      data[i].selected = false;
    }
    this.state = {
      checked: false,
      someChecked: false,
      data: data
    };
    // console.log(this.state.checked);
  }

  starClick(i) {
    let newData = this.state.data;
    newData[i].starred = !newData[i].starred
    // console.log(newData[i].starred);
    this.setState({data: newData})
    // console.log(data);
  }

  selectedClick(i) {
    let newData = this.state.data;
    let allChecked = true;
    let allUnchecked = true;
    newData[i].selected = !newData[i].selected
    for (var j = 0; j < newData.length; j++) {
      if (newData[j].selected) {
        allUnchecked = false;
      } else {
        allChecked = false;
      }
    }
    if (allChecked) {
      this.setState({
        checked: true,
        someChecked: false,
        data: newData
      })
    }else if(allUnchecked){
      this.setState({
        checked: false,
        someChecked: false,
        data: newData
      })
    } else {
      this.setState({
        checked: false,
        someChecked: true,
        data: newData
      })
    }
  }

  checkAll = () => {
    let newData = this.state.data;
    let allCheck = true;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        continue;
      } else {
        newData[i].selected = true;
        allCheck = false;
      }
    }
    if (allCheck) {
      for (i = 0; i < newData.length; i++) {
        newData[i].selected = false;
      }
      this.setState({
        checked: false,
        someChecked: false,
        data: newData})
    } else {
      this.setState({
        checked: true,
        someChecked: false,
        data: newData})
    }
  }

  isChecked() {
    if (this.state.checked) {
      return "fa fa-check-square-o";
    } else if (this.state.someChecked) {
      return "fa fa-minus-square-o";
    } else {
      return "fa fa-square-o";
    }
  }

  markRead = () => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        // console.log(newData);
        newData[i].read = true;
      }
    }
    this.setState({
      data: newData
    })
  }

  markAsUnRead = () => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        newData[i].read = false;
      }
    }
    this.setState({
      data: newData
    })
  }

  countUnread(){
    var count = 0;
    // console.log(this.state.data.length);
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].read) {
        // console.log(this.state.data[i].read);
        count++;
      }
    }
    return count;
  }

  deleteMessages = () => {
    let newData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].selected) {
        // console.log(!this.state.data[i].selected);
        newData.push(this.state.data[i])
      }
    }
    this.setState({
      data: newData,
      checked: false,
      someChecked:false
    })
  }

  addLabel = (event) => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        // console.log(newData[i].selected);
        var added = true;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if(newData[i].labels[j] === event.target.value){
            added = false;
          }
        }
        // console.log(e.targets);
        if (added) {
          newData[i].labels.push(event.target.value)
        }
      }
    }
    this.setState({
      data: newData,
    })
  }

  removeLabel = (event) => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        let remove = false;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if(newData[i].labels[j] === event.target.value){
            remove = true;
          }
        }
        if (remove) {
           newData[i].labels.splice(newData[i].labels.indexOf(event.target.value), 1)
           //splice out one item at the appropriate index
        }
      }
    }
    this.setState({
      data: newData,
    })
  }

  checkDisabled() {
    for (var i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].selected){
        return "";
      }
    }
    return "disabled";
  }

  render() {
    return (<div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.countUnread()}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.checkAll}>
            <i className={this.isChecked()}></i>
          </button>

          <button className="btn btn-default" onClick={this.markRead} disabled={this.checkDisabled()}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.markAsUnRead} disabled={this.checkDisabled()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.addLabel} disabled={this.checkDisabled()}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.removeLabel} disabled={this.checkDisabled()}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.deleteMessages}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
      <MessageList data={this.state.data}
        starClick={i => this.starClick(i)} selectedClick={i => this.selectedClick(i)}/>
    </div>);
  }
}

// export default Toolbar
