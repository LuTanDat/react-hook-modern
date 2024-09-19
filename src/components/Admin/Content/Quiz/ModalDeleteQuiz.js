import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiServices';

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchListQuiz } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);
    console.log('>>> check res component: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      fetchListQuiz()
      // // await fetchListUsers()
      // props.setCurrentPage(1);
      // await props.fetchListUsersWithPaginate(1);
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
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this Quiz, name =
          <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;