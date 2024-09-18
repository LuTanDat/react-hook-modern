import _ from 'lodash'

const Question = (props) => {
  const { data } = props;

  console.log('data detailQuiz: ', data);


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
          <img src={`data:image/jpeg;base64, ${data.image}`} alt='' />
        </div> :
        <div className='q-image'>
        </div>
      }
      <div className='question'>Question {data?.questionId}: {data?.questionDescription} ?</div>
      <div className='answers'>
        {data.answers && data.answers.length > 0 && data.answers.map((a, index) => {
          return (
            <div key={`answers ${index}`} className='a-child'>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`flexCheckDefault ${index}`}
                  onClick={(e) => handleHandCheckbox(e, a.id, data.questionId)}
                  checked={a.isSelected}
                />
                <label className="form-check-label" htmlFor={`flexCheckDefault ${index}`}>
                  {a.description}
                </label>
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default Question;