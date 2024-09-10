import React, { useState } from "react";

// class AddUserInfo extends React.Component {

//   state = {
//     name: '',
//     address: 'kien giang',
//     age: ''
//   }

//   handleClick = (event) => {
//     const random = Math.floor(Math.random() * 100 + 1);
//     console.log('Clicked me !:', event.target);
//     console.log('random: ', random);

//     this.setState({
//       name: 'dat lu',
//       age: random
//     })
//   }

//   handleOnChangeInput = (e) => {
//     this.setState({
//       name: e.target.value
//     })
//   }

//   handleOnChangeAge = (e) => {
//     this.setState({
//       age: e.target.value
//     })
//   }

//   handleOnSubmit = (e) => {
//     e.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1),
//       name: this.state.name,
//       age: this.state.age
//     })
//   }

//   render() {
//     return (
//       <>
//         My name is {this.state.name}. I'm living in {this.state.address} and now I'm {this.state.age} years old.
//         {/* <button onClick={this.handleClick}>Click me!</button>
//         <button onClick={(e) => this.handleClick(e)}>Click me 2!</button> */}
//         <form onSubmit={(e) => this.handleOnSubmit(e)}>
//           <label>Name: </label>
//           <input
//             type="text"
//             value={this.state.name}
//             onChange={(e) => this.handleOnChangeInput(e)}
//           />

//           <label>Age: </label>
//           <input
//             type="text"
//             value={this.state.age}
//             onChange={(e) => this.handleOnChangeAge(e)}
//           />
//           <button>Submit</button>
//         </form>
//       </>
//     )
//   }
// }

const AddUserInfo = (props) => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('Kien giang')
  const [age, setAge] = useState('')

  const handleClick = (event) => {
    const random = Math.floor(Math.random() * 100 + 1);
    console.log('Clicked me !:', event.target);
    console.log('random: ', random);

    setName('dat lu')
    setAge(random)
  }

  const handleOnChangeInput = (e) => {
    setName(e.target.value)
  }

  const handleOnChangeAge = (e) => {
    setAge(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1),
      name: name,
      age: age
    })
  }

  return (
    <>
      My name is {name}. I'm living in {address} and now I'm {age} years old.
      {/* <button onClick={handleClick}>Click me!</button>
        <button onClick={(e) => handleClick(e)}>Click me 2!</button> */}
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleOnChangeInput(e)}
        />

        <label>Age: </label>
        <input
          type="text"
          value={age}
          onChange={(e) => handleOnChangeAge(e)}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default AddUserInfo;