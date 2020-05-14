import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user_id: '',
      data: [],
      users: [],
      signup_username: '',
      signup_password: ''
    }
  }
  setSignupUsername(event) {
    const value = event.target.value
    this.setState({
      signup_username: value
    })
  }
  setSignupPassword(event) {
    const value = event.target.value
  
    this.setState({
      signup_password: value
    })
  }
  handleInsert() {
    this.insertIntoDB(this.state.signup_username, this.state.signup_password)
  }
  getUserById(id) {
    axios.get('http://localhost:1337/getuserid/' + id)
      .then(res => {
        this.setState({
          data: res.data.data
        })
      })
      console.log(this.state.data)
  }
  insertIntoDB(username, password) {
    axios.get('http://localhost:1337/insertuser/' + username + '/' + password)
      .then(res => {
        console.log('Successful')
      })
  }
  getAllUsers() {
    axios.get('http://localhost:1337/getusers')
      .then(res => {
        this.setState({
          users: res.data.data 
        })
      })
  }
  componentDidMount() {
    this.getAllUsers()
  }
  setUserId(event) {
    let value = event.target.value
    this.setState({
      user_id: value
    })
  }
  submitId(event) {
    event.preventDefault()
    this.getUserById(this.state.user_id)
  }
  componentDidMount() {
  this.getAllUsers()
}
  render(){
   return (
    <div className="App">
      <form>
      <h2>Sign Up Here</h2>
<label>Username: </label>
<input onChange={this.setSignupUsername.bind(this)} type="text"/>
<br />
<label>Password: </label>
<input onChange={this.setSignupPassword.bind(this)} type="text"/>
<button onClick={this.handleInsert.bind(this)} id="userID_submit">Submit</button>

<br />
<br />  
<br />
  <label id="userID">Enter ID: </label>
  <input onChange={this.setUserId.bind(this)} type="text" id="userID_input"/>
  <button onClick={this.submitId.bind(this)} id="userID_submit">Submit</button>
      </form>
      <p>
        List of Users: {this.state.data.username}
      </p>  
      {this.state.users.map((user) => (
        <p>{user.username}</p>
      ))}

    </div> 
  );
}
}
export default App;

