import React from "react";
import './scss/DisplayInfo.scss'
import logo from '../logo.svg'

// ảnh ko đc để trong folder Public vì giảm hiệu năng ứng dụng => ảnh nên để thư mục khác or lưu ở phía Backend
// do khi ứng dụng chạy nó sẽ bỏ qua folder Public, 
// mà đọc qua src trước => quăng nội dung trong src vào folder Public
// Khi cần ứng dụng mới mò lại trong folder Public, gây giảm hiệu năng ứng dụng
class DisplayInfo extends React.Component {

  // cách chuẩn OOP
  constructor(props) {
    console.log('>>> check constructor: ')
    super(props)
    // babel compiler
    this.state = {
      isShowAllUser: true
    }
  }

  // cách ngắn gọn
  // state = {
  //   isShowAllUser: true
  // }

  componentDidMount = () => {
    console.log('>>> check component did mount: ')
    setTimeout(() => {
      document.title = 'lu dat'
    }, 3000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('>>> check component did update: ', this.props, prevProps)
    if (this.props.listUsers !== prevProps.listUsers) {
      if (this.props.listUsers.length >= 5) {
        alert('You are reached 5 user')
      }
    }
  }

  handleShowHide = () => {
    this.setState({
      isShowAllUser: !this.state.isShowAllUser
    })
  }

  render() {
    console.log('>>> check render: ')
    // console.log(this.props)
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