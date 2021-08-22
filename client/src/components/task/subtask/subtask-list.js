import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../../shared/pagination/Pagination';
import { fixDate, fixTime } from '../../../shared/shared';
import { fetchComputeDurations } from '../../../state/actions/general-action';
import {
  deactivateSubTask,
  fetchTaskById,
  setSelectedSubTask
} from '../../../state/actions/task-action';
import './subtask.css';
import { fetchUsers } from '../../../state/actions/user-action';

export default function SubTasksTemplate({ subtasks }) {
  const pageSize = 5;
  const dispatch = useDispatch();
  const param = useParams().id;
  const users = useSelector(
    (state) => state.userState.users
  );
  const computeDurationUnits = useSelector(
    (state) => state.generalState.computeDurations
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch helpers
    dispatch(fetchUsers()).then(() =>
      dispatch(fetchComputeDurations())
    );
  }, []);

  const handleEditBtn = (sbt) => {
    dispatch(setSelectedSubTask(sbt));
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      // delete comment and refresh task details state (taskById)
      dispatch(deactivateSubTask(id)).then(() =>
        dispatch(fetchTaskById(param))
      );
    }
  };

  // -- pagination table data -----------------------------
  const subTasksTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return subtasks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, subtasks]);
  // -- pagination table data -----------------------------

  return (
    <div className='col-lg-6 col-md-12'>
      <table className='table table-striped shadow-sm'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Created</th>
            <th scope='col'>StartAt</th>
            <th scope='col'>StartTime</th>
            <th scope='col'>SubTask</th>
            <th scope='col'>Description</th>
            <th scope='col'>Duration</th>
            <th scope='col' className='text-center'>
              <Link
                to='/tasks/subtasks/add'
                title='New Daily Task'
              >
                <i className='bi bi-plus-lg my-icon-form-size'></i>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {subTasksTableData.map((item, i) => (
            <tr key={item._id}>
              <td>
                <b>
                  {currentPage === 1
                    ? i + 1
                    : pageSize * (currentPage - 1) + i + 1}
                </b>
              </td>
              {/* <td>{item.id}</td> */}
              <td>
                {fixDate(item.createdAt)} -{' '}
                {users &&
                  users.find((item) => {
                    return item._id === item.createdBy;
                  }).title}
              </td>
              <td>{fixDate(item.startDate)}</td>
              <td>
                {item.startTime !== null
                  ? fixTime(new Date(item.startTime))
                  : '---'}
              </td>
              <td>{item.subTaskName}</td>
              <td>{item.description}</td>
              <td className='text-center' nowrap='true'>
                {Number.parseFloat(item.duration).toFixed(
                  2
                )}{' '}
                {computeDurationUnits &&
                  computeDurationUnits.find((data) => {
                    return item.durationUnit === data._id;
                  }).code}
              </td>
              <td nowrap='true' align='center'>
                <Link
                  to='/tasks/subtasks/add'
                  onClick={() => handleEditBtn(item)}
                  title='Edit Daily Task'
                >
                  <i className='bi bi-pencil my-icon-form-size'></i>
                </Link>
                {' | '}
                <Link
                  to='#'
                  onClick={() => handleDeleteBtn(item.id)}
                  title='Delete Daily Task'
                >
                  <i className='bi bi-trash my-icon-form-size'></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={subtasks.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

SubTasksTemplate.propTypes = {
  subtasks: PropTypes.array
};
