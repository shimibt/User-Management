import React from 'react';
import './Todos.css';

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title : this.props.title,
            completed : !!this.props.completed,
            showButton : false,
            completed : this.props.completed,
            selectedID : this.props.postID
         }
    }

    markCompleted = () =>
    {
      this.setState({completed : 'true'})
      
    }


    render() { 

    

        const todosDivStyle = 
        {
            border : 'solid black 1px',
            margin : '5px'
        }
        
        return ( 
      
              <div className="mainDiv" >    
              
                  <div className="todosDiv" key={this.props.i} style={todosDivStyle} >
                     Title : {this.state.title}<br></br>
                     Completed : {this.state.completed}
                     {console.log(this.state.completed)}
                     {this.state.completed == 'false'?
                      <input type="button" value="Mark Completed" onClick={this.markCompleted}/>
                      :null
                    }
                  </div>         
              </div>
            );
        }
    }
 
export default Todos;