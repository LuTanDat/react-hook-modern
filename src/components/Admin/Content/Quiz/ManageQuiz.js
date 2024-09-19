import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select'; // tao the select dep
import { FcPlus } from "react-icons/fc";
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';


const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('EASY');
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState('');

  const handleChangeImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) { // co chon file de upload
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }

  const handleSubmitCreateQuiz = async () => {
    // validate
    if (!name || !description) {
      toast.error('Name/Description is required');
      return;
    }


    let res = await postCreateNewQuiz(description, name, type?.value, image)
    if (res && res.EC === 0) {
      toast.success(res.EM)
      setName('')
      setDescription('')
      // setType('EASY')
      setImage(null)
      setPreviewImg('')
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <div className="quiz-container">
      <div className="title">
        Manage Quizzes
      </div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your's name Quiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label >Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label >Description</label>
          </div>
          <div className='my-3'>
            <Select
              defaultValue={type}
              onChange={setType}
              options={options}
              placeholder={'Quiz type....'}
            />
          </div>
          <div className='more-actions form-group'>
            <label htmlFor='labelUpload' className="form-label label-upload">
              <FcPlus /> Upload Image
            </label>
            <input
              id='labelUpload' type='file' className='form-control' hidden
              onChange={(e) => handleChangeImage(e)}
            />
          </div>
          <div className='img-preview'>
            {previewImg ?
              <img src={previewImg} alt="img" /> :
              <div>Preview Image</div>
            }
          </div>
          <div className='mt-3'>
            <button
              className='btn btn-warning'
              onClick={() => handleSubmitCreateQuiz()}
            >Save</button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">
        table
      </div>
    </div>
  )
}

export default ManageQuiz;