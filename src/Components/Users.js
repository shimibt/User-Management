import React, { Component } from 'react';
import User from './User';
import utils from '../Utils/Utils';
import SearchBox from './SearchBox';
import Posts from './Posts';
import Todos from './Todos';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users : [],
            todos : [],
            posts : [],
            allUsersTodos : [],
            searchfield: '',
            userSelectedTodos : [],
            selectedID : {},
            addTodoBtn : true,
            addPostBtn : true,
            addUserBtn : false,
            newTodoTitle : '',
            newPostTitle : '',
            newPostBody : '',
            newUser : {
                newUserName : '',
                newUserEmail : '',
                newUserAddress :
                {
                    newUserStreet : '',
                    newUserCity : '',
                    newUserZipCode : ''
                }
        }

         }
    }

    userUrl = "https://jsonplaceholder.typicode.com/users"
    todosUrl = "https://jsonplaceholder.typicode.com/todos"
    postsUrl = "https://jsonplaceholder.typicode.com/posts"

    //Call The Data Befor Mount The Component
    async componentDidMount () 
    {
      let resp = await utils.getAllUsers(this.userUrl);

     let resp2 = await utils.getAllTodos(this.todosUrl);

     let resp3 = await utils.getAllPosts(this.postsUrl);
     this.setState({ posts: resp3.data,todos: resp2.data,users: resp.data }); 
     }

     
     //Update The Search Filed
     handleSearchChange = (event) => 
     {
        this.setState({ searchfield: event.target.value })
     }

     handleAddTodoBtn = (e) =>
     {
         this.setState({addTodoBtn : !this.state.addTodoBtn})
     }

     handleChangeAddTodoBtn = (e) =>
     {
         
         this.setState({newTodoTitle : e.target.value})
     }

     addNewTodo = () =>
     {
         let newTodo = {userId : this.state.selectedID, title : this.state.newTodoTitle, completed : false}
         this.setState({todos : [...this.state.todos,newTodo],addTodoBtn : !this.state.addTodoBtn})
     }

     cancelTodo = () =>
     {
         this.setState({addTodoBtn : !this.state.addTodoBtn})
     }

     cancelPost = () =>
     {
        this.setState({addPostBtn : !this.state.addPostBtn})
     }

     cancelUser = () =>
     {
        this.setState({addUserBtn : !this.state.addUserBtn})
     }

     handleAddPostBtn = () => 
     {
         this.setState({addPostBtn : !this.state.addPostBtn}) 
     }

     addNewPost = () =>
     {
         let newPost = {userId : this.state.selectedID, title : this.state.newPostTitle,  body : this.state.newPostBody}
         this.setState({ posts : [...this.state.posts,newPost], addPostBtn : !this.state.addPostBtn })
     }
    
     addNewUser = () =>
     {
        this.setState({addUserBtn : !this.state.addUserBtn})
        console.log(this.state.addUserBtn)
     }

    handleAddNewUser = () =>
     {
         
         let newUser = {name : this.state.newUserName, email : this.state.newUserEmail, address : { street : this.state.newUserStreet, city : this.state.newUserCity,zipcode : this.state.newUserZipCode } }
         this.setState({ users : [...this.state.users, newUser], addUserBtn : !this.state.addUserBtn })
     }



     //Update User
     changeUserDetails = (id,data) => 
     {
       const index = this.state.users.findIndex((user) =>{
       return user.id ===id;
       });
        //Duplicat the currect user
        const user = Object.assign({}, this.state.users[index]);
        user.name = data.name
        user.email = data.email
        user.street = data.address.street
        user.city = data.address.city
        user.zipcode = data.address.zipcode

          //Duplicat the array
        const users = Object.assign([], this.state.users);

        //replace the old user details with the new one
        users[index] = user;

        //set the new array
        this.setState({users: users})
     }

     deleteUserDetails = (index) =>
     {
         const users = Object.assign([], this.state.users);
         users.splice(index -1,1);
         this.setState({users : users})
     }

     title = (e) =>
     {
         console.log(this.state.id)
     }

 

    render() { 

     
        const filteredUsers = this.state.users.filter((filuser) => {
            const {searchfield} = this.state
            return (
              `${filuser.name} ${filuser.email}`.toLowerCase().indexOf(searchfield)>-1
         ) });
        

        const items = filteredUsers.map((item,index)=>
    {
      
     let allTodos = this.state.todos;
     //Filter Task ID To Match User ID && filter unCompleted Task
     let unCompletedTodos = allTodos.filter(task => task.userId == item.id && !task.completed);
  
     let isCompletedTodos = unCompletedTodos.length == 0;

     return <User
     key = {index}
     id = {item.id}
     name = {item.name}
     email = {item.email}
     street = {item.address.street}
     city = {item.address.city}
     zipcode = {item.address.zipcode}
     isCompletedTodos = {isCompletedTodos}
    
     unCompletedTodos = {unCompletedTodos}
     filterUsers={filteredUsers} 
     callbackUpdate={ data => utils.updateUser(data.id,data),data => this.changeUserDetails(data.id,data) }
     callbackDelete = { data => utils.deleteUser(data.id),data => this.deleteUserDetails(data.id)}
     callbackTodos = {data => this.userTodos(data.id), data => this.setState({selectedID : data.id})}
     
     />
        })

  
        let user_Todos = this.state.todos.filter(todo => todo.userId == this.state.selectedID ); 
        
        
       const userTodo = user_Todos.map((todo,i) =>
    {
        console.log(todo.completed)
            return <Todos
            key = {i}
            title = {todo.title}   
            completed = {todo.completed.toString()}
            addBtn = {this.state.addBtn}
            />
    })

  
       let user_Posts = this.state.posts.filter(post => post.userId == this.state.selectedID)
       const userPost = user_Posts.map((post,ind) =>
       {
           return <Posts
           key = {ind}
           title = {post.title}
           body = {post.body}
           postID = {this.state.selectedID}
           />
       })

        return ( 
            <div>
                  
                
                <div className="left">
                    <input type="text" placeholder="Search for..." defaultValue="search"  onChange={this.handleSearchChange}/>
                    <input type="button" value="Add" onClick={this.addNewUser}/>
                    <SearchBox searchChange={this.onSearchChange}/>   
                    {items} 
                </div>
                <div className="right">
             
                {this.state.addTodoBtn?
                    <div className="todoDiv">
                        <input type="button" value="Add" id={this.state.selectedID}  onClick={this.handleAddTodoBtn}/> 
                         {userTodo}
                         {console.log(this.state.selectedID)}
                         </div>
                        
                    :
                     <div>
                     New Todo - User {this.state.selectedID}
                    <div className="newTodoDiv">     
                         Title : <input type="text" onChange={this.handleChangeAddTodoBtn} onClick={this.title}/> <br></br>
                         <input type="button" value="Add" onClick={this.addNewTodo}/>
                         <input type="button" value="Cancel" onClick={this.cancelTodo}/>
                    </div>
                    </div>
                 }
                  {this.state.addPostBtn?
                    <div className="postDiv">
                      <input type="button" value="Add" onClick={this.handleAddPostBtn}/> 
                      {userPost}
                    </div>
                    :
                    <div>
                        New Post - User {this.state.selectedID}
                    <div className="newPostDiv">
                        Title : <input type="text" onChange={e => this.setState({newPostTitle : e.target.value})}/> <br></br>
                        Body  : <input type="text" onChange={e => this.setState({newPostBody : e.target.value})}/> <br></br>
                        <input type="button" value="Add" onClick={this.addNewPost}/>
                         <input type="button" value="Cancel" onClick={this.cancelPost}/>
                    </div>
                    </div>
                  }
                  <div>
                  {this.state.addUserBtn?  
                      <div>
                          Add New User
                      <div className="newPostDiv">
                      Name : <input type="text" onChange={e => this.setState({newUserName : e.target.value})}/> <br></br>
                      Email  : <input type="text" onChange={e => this.setState({newUserEmail : e.target.value})}/> <br></br>
                      <input type="button" value="Add" onClick={this.handleAddNewUser}/>
                       <input type="button" value="Cancel" onClick={this.cancelUser}/>
                  </div>
                  </div>
                  : null
            
                  }
            
                </div>
            </div>
           </div>
         );
    }
}
 
export default Users;
