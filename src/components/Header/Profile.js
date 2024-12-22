import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import YourInformation from './YourInformation';
import Password from './Password';
import History from './History';

const Profile = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false)
  };

  const handleSubmitProfileUser = () => {

  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static' // khi click ngoai no khong dong modal
        className='model-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage User Infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Your's info">
              <YourInformation />
            </Tab>
            <Tab eventKey="profile" title="Change Password">
              <Password />
            </Tab>
            <Tab eventKey="contact" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitProfileUser()}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile;