import React from 'react';
// import logo from './logo.svg';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
import './App.css';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {messages: props.messages}
  }
  render(){
    return (
      <div>
        <Toolbar />
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}






export default App;
