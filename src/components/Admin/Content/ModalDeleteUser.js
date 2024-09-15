import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUsers } from '../../../services/apiServices';

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, fetchListUsers } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUsers(dataDelete.id);
    console.log('>>> check res component: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      await fetchListUsers()
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static' // khi click ngoai no khong dong modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user, email=
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;