// class component
// function component

import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

  state = {
    listUsers: [
      { id: 1, name: "John", age: 10 },
      { id: 2, name: "John 1", age: 20 },
      { id: 3, name: "John 2", age: 35 },
    ]
  }

  handleAddNewUser = (objUser) => {
    console.log(objUser)
    this.setState({
      listUsers: [objUser, ...this.state.listUsers]
    })
  }

  handleDeleteUser = (userId) => {
    let listUsers = this.state.listUsers.filter(item => item.id !== userId)
    this.setState({
      listUsers: listUsers
    })
  }

  //JSX
  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        <hr />
        <AddUserInfo
          handleAddNewUser={this.handleAddNewUser}// truyen tham chiếu func cho con, ko goi no
        />
        <hr />
        <DisplayInfo
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        />
      </>
    )
  }
}

export default MyComponent;