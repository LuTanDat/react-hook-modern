// class component
// function component

import React from "react";

class MyComponent extends React.Component {

  //JSX
  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        {Math.random()}
      </>
    )
  }
}

export default MyComponent;