// class component
// function component

import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

  //JSX
  render() {
    const myInfo = ['agdf', 'daf', 'd']
    return (
      <>
        <h1>Hello, world!</h1>
        <hr />
        <UserInfo />
        <hr />
        <DisplayInfo name={'tan dat'} age={24} myInfo={myInfo} />
      </>
    )
  }
}

export default MyComponent;