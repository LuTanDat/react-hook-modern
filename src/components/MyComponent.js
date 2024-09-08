// class component
// function component

import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

  state = {
    listUsers: [
      { id: 1, name: "John", age: 10 },
      { id: 1, name: "John 1", age: 20 },
      { id: 1, name: "John 2", age: 35 },
    ]
  }

  //JSX
  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        <hr />
        <UserInfo />
        <hr />
        <DisplayInfo listUsers={this.state.listUsers} />
      </>
    )
  }
}

export default MyComponent;