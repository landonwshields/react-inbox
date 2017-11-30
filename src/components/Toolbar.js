import React from 'react';
import MessageList from './MessageList';
import Compose from './Compose';


 export default class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      someChecked: false,
      data: [],
      composing: false
    };
    // console.log(this.state.checked);
  }

  async componentDidMount() {
    const response = await fetch('https://landon-hypermedia-api-server.herokuapp.com/api/messages')
    const json = await response.json()
    const data = json._embedded.messages
    // console.log(data);
    this.setState({data: data})
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].selected);
      data[i].selected = false;
    }
  }

  async changeData(item) {
    const response = await fetch('https://landon-hypermedia-api-server.herokuapp.com/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  async addItem(item) {
    const response = await fetch('https://landon-hypermedia-api-server.herokuapp.com/api/messages', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }


  starClick(i) {
    let selectStar = {
      "messageIds":[],
      "command":"star",
      "star":true
    }
    let newData = this.state.data;
    newData[i].starred = !newData[i].starred
    // console.log(newData[i].starred);
    selectStar.messageIds.push(newData[i].id)
    selectStar.star = newData[i].starred
    this.changeData(selectStar)
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
    let selectRead = {
      "messageIds": [],
      "command": "read",
      "read": true
    }
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        // console.log(newData);
        newData[i].read = true;
        selectRead.messageIds.push(newData[i].id)
        selectRead.read = newData[i].read
        this.changeData(selectRead)
      }
    }
    this.setState({
      data: newData
    })
  }

  markAsUnRead = () => {
    let selectUnRead = {
      "messageIds": [],
      "command": "read",
      "read": false
    }
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        newData[i].read = false;
        selectUnRead.messageIds.push(newData[i].id)
        // selectUnRead.read = newData[i].read
        this.changeData(selectUnRead)
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
    let isDeleted = {
      "messageIds": [],
      "command": "delete"
    }
    let newData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].selected) {
        // console.log(!this.state.data[i].selected);
        newData.push(this.state.data[i])
      } else if(this.state.data[i].selected){
        isDeleted.messageIds.push(this.state.data[i].id)
        this.changeData(isDeleted)
      }
    }
    this.setState({
      data: newData,
      checked: false,
      someChecked:false
    })
  }

  addLabel = (event) => {
    let labeled = {
      "messageIds": [],
      "command": "addLabel",
      "label": event.target.value
    }
    let newData = this.state.data;
    let label = ""
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        // console.log(newData[i].selected);
        var added = true;
        for (var j = 0; j < newData[i].labels.length; j++) {
          // console.log(event.target);
          if(newData[i].labels[j] === event.target.value){
            added = false;
            label = event.target.value
          }
        }
        // console.log(event.target.value);
        if (added) {
          newData[i].labels.push(event.target.value)
          labeled.messageIds.push(this.state.data[i].id)
          this.changeData(labeled)
        }
      }
    }
    this.setState({
      data: newData
    })
  }

  removeLabel = (event) => {
    let unLabeled = {
      "messageIds": [],
      "command": "removeLabel",
      "label": event.target.value
    }
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
           unLabeled.messageIds.push(this.state.data[i].id)
           this.changeData(unLabeled)
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

  renderCompose() {
    if (this.state.composing) {
      return(
        <Compose />
      )
    }
    return undefined
  }

  openCompose = () => {
    console.log("hello");
    return this.setState({
      composing: !this.state.composing
    })
  }

  render() {
    return (<div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.countUnread()}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={this.openCompose}>
            <i className="fa fa-plus"></i>
          </a>

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

      {this.renderCompose()}

      <MessageList data={this.state.data}
        starClick={i => this.starClick(i)} selectedClick={i => this.selectedClick(i)}/>
    </div>);
  }
}

// export default Toolbar
