import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import _ from 'lodash'; // check array, object, variable
import { toast } from 'react-toastify';
import { postUpdateProfile } from "../../services/apiServices";
import { updateProfile } from "../../redux/action/userAction";

const YourInformation = () => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.user.account);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (!_.isEmpty(account)) {
      // update state
      setEmail(account.email)
      setUsername(account.username)
      setRole(account.role)
      // setImage('') // mình cần gửi đi image file object, backend return base64 image should not set state
      if (account.image) {
        setPreviewImg(`data:image/jpeg;base64,${account.image}`) // convert tu base64 image nguoc lai image binh thuong
      }
    }
  }, [account])

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) { // co chon file de upload
      setPreviewImg(URL.createObjectURL(e.target.files[0])) // show tren trinh duyet
      setImage(e.target.files[0]) // luu dang file, duoi backend convert sang base64
    }
  }

  const handleSubmitUpdateUser = async () => {
    // validate user
    if (username === account.username && !image) {
      toast.warning('You have not changed any information!');
      return;
    }

    let data = await postUpdateProfile(username, image);
    // console.log('>>> check res update profile: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)

      // convert file-object to base64-image && update state to Redux
      // change Redux lead React rerender component
      if (image) {
        getBase64(image, function (base64Data) {
          let base64Img = base64Data?.split(',')[1];
          dispatch(updateProfile(username, base64Img));
        });
      } else {
        dispatch(updateProfile(username, ''));// image no change
      }
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            disabled
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
      <button
        className="btn btn-warning mt-3"
        onClick={() => handleSubmitUpdateUser()}>
        Update
      </button>
    </>
  )
}

export default YourInformation;