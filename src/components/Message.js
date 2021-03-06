import React, {Component} from 'react';

export default class Message extends Component {

  wasRead() {
    if (this.props.read) {
      return "row message read" + this.isSelected(" selected");
    } else {
      return "row message unread" + this.isSelected(" selected");
    }
  }

  isSelected(str) {
    // console.log(str);
    if (this.props.selected || this.props.checked) {
      return str;
    } else {
      return "";
    }
  }

  getLabels() {
    // console.log(this);
    return (this.props.labels.map(x => {
      return (<span className="label label-warning" key={x.toString()}>{x}
      </span>);
    }))
  }

  isStarred() {
    // console.log(this.props);
    if (this.props.starred) {
      return "star fa fa-star";
    } else {
      return "star fa fa-star-o";
    }
  }

  render() {
    return (
      <div className={this.wasRead()}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.isSelected("checked")} onClick={this.props.selectedClick}
              />
            </div>
            <div className="col-xs-2">
              <i className={this.isStarred()} onClick={this.props.starClick}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.getLabels()}
          <a href="#">
            {this.props.subject}
          </a>
        </div>
      </div>);
  }
}

// export default Message
