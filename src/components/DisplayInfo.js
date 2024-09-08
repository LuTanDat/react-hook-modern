import React from "react";

class DisplayInfo extends React.Component {

  render() {
    console.log(this.props)
    const { listUsers } = this.props//object
    return (
      <>
        {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
          return (
            <div key={item.id} className={item.age > 18 ? 'green' : 'red'}>
              <div>My name is {item.name}.</div>
              <div>Now I'm {item.age} years old.</div>
              <br />
            </div>
          )
        })}
      </>
    )
  }
}

export default DisplayInfo;