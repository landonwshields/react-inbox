
import React, {Component} from 'react';
import Message from './Message';

export default class MessageList extends Component {

  mapData() {
    // console.log(this.props.data);
    return this.props.data.map(eachData => {
      // console.log(eachData);
      return <Message key={eachData.id} subject={eachData.subject} read={eachData.read} starred={eachData.starred} labels={eachData.labels}
      selected={eachData.selected}
      starClick={() => this.props.starClick(this.props.data.indexOf(eachData))}
      selectedClick={() => this.props.selectedClick(this.props.data.indexOf(eachData))}/>
    })
  }

  render() {
    return (
      <div>
        {this.mapData()}
      </div>)
  }
}

// export default MessageList
