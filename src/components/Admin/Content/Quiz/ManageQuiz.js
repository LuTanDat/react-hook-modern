import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select'; // tao the select dep
import { FcPlus } from "react-icons/fc";
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState('');

  const [isCreatedNewQuiz, setIsCreatedNewQuiz] = useState(false);

  const handleChangeFile = (e) => {
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
      setType({})
      setImage(null)
      setPreviewImg('')
      setIsCreatedNewQuiz(true);
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <div className="quiz-container">

      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-2"
        justify
      >
        <Tab eventKey="home" title="Manage Quizzes">
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
                  value={type}
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
                  onChange={(e) => handleChangeFile(e)}
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
          <hr />
          <div className="list-detail mt-2">
            <TableQuiz
              isCreatedNewQuiz={isCreatedNewQuiz}
              setIsCreatedNewQuiz={setIsCreatedNewQuiz}
            />
          </div>
        </Tab>
        <Tab eventKey="profile" title="Update Q/A Quizzes">
          <QuizQA />
        </Tab>
        <Tab eventKey="contact" title="Assign Quiz to User">
          <AssignQuiz />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ManageQuiz;