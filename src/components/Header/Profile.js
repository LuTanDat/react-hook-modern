import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
            <Tab eventKey="home" title="Main info">
              Your's infomation
            </Tab>
            <Tab eventKey="profile" title="Password">
              Change password
            </Tab>
            <Tab eventKey="contact" title="History">
              History
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitProfileUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile;