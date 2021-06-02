import './App.css';
import React from 'react';
import Users from './Components/Users';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    { 
  
     }
  }

  // onSearchChange =  (event) => {
	// 	this.setState({searchfield: event.target.value})
	// }



 

  render() { 


    return ( 
    <div className="App"> 
       <Users/>
    </div> 
    );
  }
}
 
export default App;
