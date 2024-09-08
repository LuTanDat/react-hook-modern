import React from "react";

class DisplayInfo extends React.Component {

  render() {
    console.log(this.props)
    const { name, age, myInfo } = this.props//object
    return (
      <>
        My name is {name}.
        Now I'm {age} years old.
      </>
    )
  }
}

export default DisplayInfo;