import React, { Component } from 'react';
import './users.css';
import './user.css';

class User  extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { 
            isVisible : false, 
            color : 'white',
            id : this.props.id,
            name : this.props.name,
            email : this.props.email,
            address : {
                street : this.props.street,
                city : this.props.city,
                zipcode : this.props.zipcode,    
            }         
         }
    }

  

  handleUpdate = () => 
  {
       
        let jsonData = {id : this.state.id, name : this.state.name, email : this.state.email, address: {street : this.state.street, city : this.state.city, zipcode : this.state.zipcode}}
        this.props.callbackUpdate(jsonData)
    }  

  handleDelete = () =>
  {
      let jsonData = {id : this.state.id}
      this.props.callbackDelete(jsonData)

  }  


 handleMouseEnter = () =>
 {
     this.setState({ isVisible : !this.state.isVisible })
   
 }

 handleMouseLeave = () =>
 {
     this.setState({  isVisible : !this.state.isVisible })

 }

 showTodos = () =>  
 {
  this.setState({ color : 'orange' }) 
  let jsonData = {id : this.state.id}
  this.props.callbackTodos(jsonData)
 }


    render() { 
        let divStyle = {
             backgroundColor : this.state.color, 
          }

        if (this.props.isCompletedTodos == false  )
        {
          divStyle = 
          {
              border : '3px solid red'
          }
        }

        return ( 
            <div>
            <div className="usersdiv"  style={divStyle} key={this.props.id} >
           <label onClick={this.showTodos}>  ID : {this.props.id}  </label><br/>
             Name :  <input type="text" onChange={e => this.setState({name : e.target.value})}  value={this.state.name}/><br/>
             Email : <input type="text" onChange={e => this.setState({email : e.target.value})} value={this.state.email}/><br/>
                     <span></span><input type="button" value="Other Data" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/><span/>
                     <span><input type="button" id="updateBtn" value="Update" onClick={this.handleUpdate}/></span>
                     <span> <input type="button" id="deleteBtn" value="Delete" onClick={this.handleDelete}/></span>  
                     {this.state.isVisible?
                     <div className="hiddenDiv">
                     <label>Street</label> :<input type="text" onChange={e => this.setState({street : e.target.value})} value={this.state.address.street} /> <br/>
                     <label>City </label>:<input type="text" onChange={e => this.setState({city : e.target.value})} value={this.state.address.city} /><br/>
                            Zip Code :<input type="text" onChange={e => this.setState({zipcode : e.target.value})} value={this.state.address.zipcode} />  
              </div>
              :null
                     }
            </div>
                    
            </div>
         );
    }
}
 
export default User;