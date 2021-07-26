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
  fetchTaskById,
  setSelectedComment,
  deactivateComment
} from '../../../state/actions/task-action';
import './comment.css';

export default function CommentsTemplate({ comments }) {
  const pageSize = 5;
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.taskState.error);
  const param = useParams().id;

  const [currentPage, setCurrentPage] = useState(1);

  const handleEditBtn = (comment) => {
    dispatch(setSelectedComment(comment));
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      // delete comment and refresh task details state (taskById)
      dispatch(deactivateComment(id))
        .then(() => dispatch(fetchTaskById(param)));
    }
  };

  // -- pagination table data -----------------------------
  const commentsTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return comments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, comments]);
  // -- pagination table data -----------------------------

  return (
    <div className="col-lg-6 col-md-12">
      <table className="table table-striped shadow-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Created</th>
            <th scope="col">Comment</th>
            <th scope="col" className="text-center">
              <Link to="/tasks/comments/add" title="New Task Comment">
                <i className="bi bi-plus-lg my-icon-form-size"></i>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            commentsTableData.map((cm, i) => (
              <tr key={cm.id}>
                <td><b>{
                  currentPage === 1 ? (i + 1) : ((pageSize * (currentPage - 1)) + i) + 1
                }</b></td>
                <td>{cm.id}</td>
                <td>
                  {
                    fixDate(
                      new Date(getDateTimeFromTicks(cm.createdOnTicks))
                    )
                  } - {cm.creator.title}
                </td>
                <td>{cm.description}</td>
                <td nowrap="true" align="center">
                  <Link
                    to='/tasks/comments/add'
                    onClick={() => handleEditBtn(cm)}
                    title="Edit Task Comment">
                    <i className="bi bi-pencil my-icon-form-size"></i>
                  </Link>{' | '}
                  <Link
                    to="#"
                    onClick={() => handleDeleteBtn(cm.id)}
                    title="Delete Task Comment">
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
        totalCount={comments.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

CommentsTemplate.propTypes = {
  comments: PropTypes.array
};
