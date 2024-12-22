import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiServices";
import moment from 'moment';
import _ from 'lodash'; // check array, object, variable

const History = () => {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, [])

  const fetchHistory = async () => {
    let res = await getHistory();
    // console.log('>>> check: ', res.DT.data)
    if (res.EC === 0) {
      // sort history by updatedAt in descending
      let data = _.cloneDeep(res.DT.data);
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      setHistory(data);
    }
  }

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Quiz Name</th>
            <th scope="col">Total Question</th>
            <th scope="col">Total Correct</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {history && history.length > 0 && history.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.quiz_id}</td>
                <td>{item.quizHistory.description}</td>
                <td>{item.total_questions}</td>
                <td>{item.total_correct}</td>
                <td>{moment(item.updatedAt).add(7, 'hours').format("DD-MM-YYYY HH:mm:ss")}</td>
              </tr>
            )
          })}
          {history && history.length === 0 &&
            <tr>
              <td colSpan={'5'} className="text-center">Not found user</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default History;