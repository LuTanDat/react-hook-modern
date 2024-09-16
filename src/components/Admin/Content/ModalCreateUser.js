// combine react-bootstap with bootstrap 5

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imagePreview from '../../../assets/bg2.jpg';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postAddNewUsers } from '../../../services/apiServices';

const ModalCreateUser = (props) => {
  const { show, setShow, fetchListUsers } = props;

  const handleClose = () => {
    setShow(false)
    setEmail('')
    setPassword('')
    setUsername('')
    setRole('USER')
    setImage('')
    setPreviewImg('')
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) { // co chon file de upload
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateNewUser = async () => {
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('invalid email')
      return;
    }
    if (!password) {
      toast.error('invalid password')
      return;
    }

    let data = await postAddNewUsers(email, password, username, role, image);
    console.log('>>> check res component: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      // await fetchListUsers()
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor='labelUpload' className="form-label label-upload">
                <FcPlus /> Upload File Image
              </label>
              <input type="file" id='labelUpload' hidden
                onChange={(e) => handleUploadFile(e)} // click vao se chay ham nay
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
          <Button variant="primary" onClick={() => handleSubmitCreateNewUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;