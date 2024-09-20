// combine react-bootstap with bootstrap 5

import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiServices';
import _ from 'lodash'; // check array, object, variable

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, fetchQuiz, setDataUpdate } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const fileInputRef = useRef(null); // Thêm useRef để tạo một tham chiếu trực tiếp đến input file, để đảm bảo rằng sự kiện luôn được bắt và xử lý chính xác, bất kể môi trường render phức tạp như thế nào.
  const handleLabelClick = () => {
    console.log('Label clicked');
    fileInputRef.current.click();
  }

  useEffect(() => {
    console.log('dataUpdate changed:', dataUpdate);
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name)
      setDescription(dataUpdate.description)
      setType(dataUpdate.difficulty)
      setImage('')
      if (dataUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`) // convert tu base64 image nguoc lai image binh thuong
      }
    }
  }, [dataUpdate])

  const handleClose = () => {
    setShow(false)
    setName('')
    setDescription('')
    setType('')
    setImage('')
    setPreviewImg('')
    setDataUpdate({})
  };

  const handleUploadImage = (e) => {
    console.log('handleUploadImage called', e);
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }

  const handleSubmitUpdateQuiz = async () => {
    if (!name) {
      toast.error('Invalid name')
      return;
    }

    if (!description) {
      toast.error('Invalid description')
      return;
    }

    let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);
    console.log('>>> check res component: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      fetchQuiz()

      // await fetchListUsers()
      // await props.fetchListUsersWithPaginate(props.currentPage);
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
        size='xl'
        backdrop='static' // khi click ngoai no khong dong modal
        className='model-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Quiz type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='EASY'>EASY</option>
                <option value='MEDIUM'>MEDIUM</option>
                <option value='HARD'>HARD</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label
                className="form-label label-upload"
                onClick={handleLabelClick}
              >
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                ref={fileInputRef} // tao tham chieu
                onChange={handleUploadImage}
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImg ?
                <img src={previewImg} alt="img" /> :
                <div>Preview Image</div>
              }
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuiz;