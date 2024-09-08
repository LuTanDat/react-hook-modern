import React from "react";

class UserInfo extends React.Component {

  state = {
    name: 'lu dat',
    address: 'kien giang',
    age: 24
  }

  handleClick = (event) => {
    const random = Math.floor(Math.random() * 100 + 1);
    console.log('Clicked me !:', event.target);
    console.log('random: ', random);


    this.setState({
      name: 'dat lu',
      age: random
    })
  }

  handleOnChangeInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    // alert('me')
    console.log(this.state);
  }

  render() {
    return (
      <>
        My name is {this.state.name}. I'm living in {this.state.address} and now I'm {this.state.age} years old.
        {/* <button onClick={this.handleClick}>Click me!</button>
        <button onClick={(e) => this.handleClick(e)}>Click me 2!</button> */}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.handleOnChangeInput(e)}
          />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default UserInfo;