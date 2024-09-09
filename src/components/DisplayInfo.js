import React from "react";
import './scss/DisplayInfo.scss'
import logo from '../logo.svg'
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
      <div className="display-info-container">
        {/* <img src={logo} /> */}
        <div>
          <span style={{ cursor: "pointer" }} onClick={() => { this.handleShowHide() }}>
            {this.state.isShowAllUser ? "Hide all users" : "Show all users"}
          </span>
          <hr />
        </div>

        {this.state.isShowAllUser &&
          <>
            {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
              return (
                <div key={item.id} className={item.age > 18 ? 'green' : 'red'}>
                  <div>
                    <div>My name is {item.name}.</div>
                    <div>Now I'm {item.age} years old.</div>
                  </div>
                  <div>
                    <button onClick={() => { this.props.handleDeleteUser(item.id) }}>Delete</button>
                  </div>
                  <br />
                </div>
              )
            })}
          </>
        }
      </div>
    )
  }
}

export default DisplayInfo;