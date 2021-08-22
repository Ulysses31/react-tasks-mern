import React, { useEffect } from 'react';
// import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import ScaleLoader from 'react-spinners/ScaleLoader';
import { fixDate } from '../../shared/shared';
import {
  fetchTaskById,
  setSelectedTask,
  deactivateTask
} from '../../state/actions/task-action';
import ErrorCmp from '../error/error';
import CommentsTemplate from './comment/comment-list';
import SubTasksTemplate from './subtask/subtask-list';
import './task.css';

// const override = css`
//   display: inline-block;
//   margin-left: 15px;
//   border-color: red;
//   width: 44px;
//   float: right;
// `;

export default function TaskList() {
  const dispatch = useDispatch();
  const task = useSelector(
    (state) => state.taskState.taskById
  );
  const error = useSelector(
    (state) => state.taskState.error
  );
  // const isLoading = useSelector((state) => state.taskState.isLoading);
  const role = useSelector(
    (state) => state.generalState.login?.role
  );
  const history = useHistory();
  const param = useParams().id;

  useEffect(() => {
    dispatch(fetchTaskById(param));
  }, []);

  const handleEditBtn = (task) => {
    dispatch(setSelectedTask(task));
    history.push('/tasks/add');
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      dispatch(deactivateTask(history, id));
    }
  };

  const TaskTemplate = ({ task }) => {
    return (
      <>
        <tr>
          {/* <td nowrap='true'>
            <b>{task.id}</b>
          </td> */}
          {/* <td nowrap="true">{task.project.projectName}</td> */}
          <td nowrap='true'>{task?.taskName}</td>
          <td nowrap='true'>{task?.description}</td>
          <td nowrap='true'>
            {fixDate(new Date(task.startDate))}
          </td>
          <td nowrap='true'>
            {task.endDate !== null
              ? new Date(task.endDate).toLocaleDateString(
                  'el'
                )
              : '---'}
          </td>
          <td nowrap='true' className='text-center'>
            {task.duration !== null
              ? Number.parseFloat(task.duration).toFixed(2)
              : 0}{' '}
            Hours
          </td>
          <td nowrap='true'>
            {task.assignedTo.title} (
            {task.assignedTo.position})
          </td>
          <td nowrap='true'>
            <span className='badge bg-warning text-dark shadow-sm'>
              <b>{task.priority.name}</b>
            </span>
          </td>
          <td nowrap='true'>
            <span className='badge bg-warning text-dark shadow-sm'>
              <b>{task.state.stateName}</b>
            </span>
          </td>
          <td nowrap='true' align='center'>
            <button
              className='btn btn-sm btn-primary shadow-sm'
              onClick={() => handleEditBtn(task)}
              disabled={role !== 'Administrator'}
            >
              <i className='bi bi-pencil'></i>
            </button>{' '}
            <button
              className='btn btn-sm btn-danger shadow-sm'
              onClick={() => handleDeleteBtn(task?.id)}
              disabled={role !== 'Administrator'}
            >
              <i className='bi bi-trash'></i>
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan='10' style={{ padding: '15px' }}>
            <div className='row'>
              <SubTasksTemplate subtasks={task.subtasks} />
              <CommentsTemplate comments={task.comments} />
            </div>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-clipboard'></i> Task Details
          <div className='float-right'>
            &nbsp;&nbsp;{' '}
            <span className='text-muted'>Project:</span>
            &nbsp;{task?.project?.projectName}
            &nbsp;&nbsp;{' '}
            <span className='text-muted'>Task ID:</span>
            &nbsp;{task?._id}
          </div>
        </h5>
        <div className='card-body overflow-auto'>
          {/* <ScaleLoader
            color={'#86C02E'}
            loading={isLoading}
            css={override}
            size={150}
          /> */}
          <div className='table-responsive'>
            <table border='0' className='table table-sm'>
              <thead>
                <tr>
                  {/* <th nowrap='true' scope='col'>
                    ID
                  </th> */}
                  {/* <th nowrap="true" scope="col">Project</th> */}
                  <th nowrap='true' scope='col'>
                    Name
                  </th>
                  <th nowrap='true' scope='col'>
                    Description
                  </th>
                  <th nowrap='true' scope='col'>
                    StartDate
                  </th>
                  <th nowrap='true' scope='col'>
                    EndDate
                  </th>
                  <th nowrap='true' scope='col'>
                    Duration
                  </th>
                  <th nowrap='true' scope='col'>
                    AssignedTo
                  </th>
                  <th nowrap='true' scope='col'>
                    Priority
                  </th>
                  <th nowrap='true' scope='col'>
                    State
                  </th>
                  <th nowrap='true'></th>
                </tr>
              </thead>
              <tbody>
                {task && <TaskTemplate task={task} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

TaskList.propTypes = {
  task: PropTypes.object,
  comments: PropTypes.array,
  subtasks: PropTypes.array,
  cnt: PropTypes.number
};
