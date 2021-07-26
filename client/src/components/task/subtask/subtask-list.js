import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../../shared/pagination/Pagination';
import {
  getDateTimeFromTicks,
  fixDate
} from '../../../shared/shared';
import {
  deactivateSubTask,
  fetchTaskById,
  setSelectedSubTask
} from '../../../state/actions/task-action';
import './subtask.css';

export default function SubTasksTemplate({ subtasks }) {
  const pageSize = 5;
  const dispatch = useDispatch();
  const param = useParams().id;

  const [currentPage, setCurrentPage] = useState(1);

  const handleEditBtn = (sbt) => {
    dispatch(setSelectedSubTask(sbt));
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      // delete comment and refresh task details state (taskById)
      dispatch(deactivateSubTask(id))
        .then(() => dispatch(fetchTaskById(param)));
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
    <div className="col-lg-6 col-md-12">
      <table className="table table-striped shadow-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Created</th>
            <th scope="col">Start At</th>
            <th scope="col">SubTask</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col" className="text-center">
              <Link to="/tasks/subtasks/add" title="New Daily Task">
                <i className="bi bi-plus-lg my-icon-form-size"></i>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            subTasksTableData.map((item, i) => (
              <tr key={item.id}>
                <td><b>{
                  currentPage === 1 ? (i + 1) : ((pageSize * (currentPage - 1)) + i) + 1
                }</b></td>
                <td>{item.id}</td>
                <td>
                  {
                    fixDate(
                      new Date(getDateTimeFromTicks(item.createdOnTicks))
                    )
                  } - {item.creator.title}
                </td>
                <td>{fixDate(item.startDate)}</td>
                <td>{item.subTaskName}</td>
                <td>{item.description}</td>
                <td className="text-center">
                  <span className="badge badge-primary badge-pill">
                    {item.duration}
                  </span>
                </td>
                <td nowrap="true" align="center">
                  <Link
                    to="/tasks/subtasks/add"
                    onClick={() => handleEditBtn(item)}
                    title="Edit Daily Task">
                    <i className="bi bi-pencil my-icon-form-size"></i>
                  </Link>{' | '}
                  <Link
                    to="#"
                    onClick={() => handleDeleteBtn(item.id)}
                    title="Delete Daily Task">
                    <i className="bi bi-trash my-icon-form-size"></i>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={subtasks.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

SubTasksTemplate.propTypes = {
  subtasks: PropTypes.array
};
