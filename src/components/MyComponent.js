// class component
// function component

import React from "react";

class MyComponent extends React.Component {

  state = {
    name: 'lu dat',
    address: 'kien giang',
    age: 24
  }

  //JSX
  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        My name is {this.state.name}. I'm living in {this.state.address} and now I'm {this.state.age} years old.
      </>
    )
  }
}

export default MyComponent;