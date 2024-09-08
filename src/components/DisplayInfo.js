import React from "react";

class DisplayInfo extends React.Component {

  state = {
    isShowAllUser: true
  }

  handleShowHide = () => {
    this.setState({
      isShowAllUser: !this.state.isShowAllUser
    })
  }

  render() {
    console.log(this.props)
    const { listUsers } = this.props//object
    return (
      <div>
        <div>
          <span style={{ cursor: "pointer" }} onClick={() => { this.handleShowHide() }}>
            {this.state.isShowAllUser ? "Hide all users" : "Show all users"}
          </span>
          <hr />
        </div>

        {this.state.isShowAllUser &&
          <div>
            {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
              return (
                <div key={item.id} className={item.age > 18 ? 'green' : 'red'}>
                  <div>My name is {item.name}.</div>
                  <div>Now I'm {item.age} years old.</div>
                  <br />
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

export default DisplayInfo;