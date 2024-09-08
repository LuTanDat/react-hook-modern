import React from "react";

class AddUserInfo extends React.Component {

  state = {
    name: '',
    address: 'kien giang',
    age: ''
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

  handleOnChangeAge = (e) => {
    this.setState({
      age: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1),
      name: this.state.name,
      age: this.state.age
    })
  }

  render() {
    return (
      <>
        My name is {this.state.name}. I'm living in {this.state.address} and now I'm {this.state.age} years old.
        {/* <button onClick={this.handleClick}>Click me!</button>
        <button onClick={(e) => this.handleClick(e)}>Click me 2!</button> */}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label>Name: </label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.handleOnChangeInput(e)}
          />

          <label>Age: </label>
          <input
            type="text"
            value={this.state.age}
            onChange={(e) => this.handleOnChangeAge(e)}
          />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default AddUserInfo;