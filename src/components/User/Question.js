import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { IoClose } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Question = (props) => {
  const { data, isFinished, isShowAnswers } = props;

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const handleHandCheckbox = (e, aId, qId) => {
    // console.log(e.target.checked, id)
    props.handleCheckbox(aId, qId)
  }



  if (_.isEmpty(data)) {
    return (<></>)
  }
  return (
    <>
      {data.image ?
        <div className='q-image'>
          <img
            style={{ cursor: 'pointer' }}
            src={`data:image/jpeg;base64, ${data.image}`}
            alt=''
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage === true &&
            <Lightbox
              image={`data:image/jpeg;base64, ${data.image}`}
              title={'Question Image'}
              onClose={() => setIsPreviewImage(false)}
            >
            </Lightbox>
          }
        </div> :
        <div className='q-image'>
        </div>
      }
      <div className='question'>Question {props.currentQuestionIndex}: {data?.questionDescription} ?</div>
      <div className='answers'>
        {data.answers && data.answers.length > 0 && data.answers.map((a, index) => {
          return (
            <div key={`answers ${index}`} className='a-child'>
              <div className="form-check">
                <input
                  id={`flexCheckDefault ${index}`}
                  className="form-check-input"
                  type="checkbox"
                  checked={a.isSelected}
                  onChange={(e) => handleHandCheckbox(e, a.id, data.questionId)}
                  disabled={isFinished}
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault ${index}`}
                  disabled={isFinished}
                >
                  {a.description}
                </label>
                {isShowAnswers &&
                  <>
                    {a.isSelected === true && a.isCorrect === false &&
                      <IoClose className='incorrect' />
                    }
                    {a.isCorrect === true &&
                      <IoCheckmarkDoneSharp className='correct' />
                    }
                  </>
                }
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Question;