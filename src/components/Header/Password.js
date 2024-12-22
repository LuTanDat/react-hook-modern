import { useState } from "react";
import { postChangePassword } from "../../services/apiServices";
import { toast } from 'react-toastify';

const Password = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conFirm, setConFirm] = useState('');

  const handleUpdatePassword = async () => {
    // validate password
    if (newPassword.length === 0) {
      toast.warning('New Password is required');
      return;
    }
    if (newPassword.length < 6) {
      toast.warning('New Password must be at least 6 characters long');
      return;
    }
    if (newPassword === currentPassword) {
      toast.warning('New Password must be different from Current password');
      return;
    }
    if (newPassword !== conFirm) {
      toast.warning(`Confirm Password isn't matches with the New Password`);
      return;
    }

    // call API to update password
    let res = await postChangePassword(currentPassword, newPassword);
    // console.log('>>> check: ', res.DT)
    if (res.EC === 0) {
      toast.success(res.EM)
      setCurrentPassword('');
      setNewPassword('');
      setConFirm('');
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Confirm</label>
          <input
            type="password"
            className="form-control"
            value={conFirm}
            onChange={(e) => setConFirm(e.target.value)}
          />
        </div>
      </form>
      <button
        className="btn btn-warning mt-3"
        onClick={() => handleUpdatePassword()}
      >
        Update
      </button>
    </>
  )
}

export default Password;