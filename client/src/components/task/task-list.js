import React, { useEffect, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Pagination from '../../shared/pagination/Pagination';
import {
  fixDate, getPageSize, getValidatedUserInfo
} from '../../shared/shared';
import {
  fetchPriorities,
  fetchStates,
  setUserBySession
} from '../../state/actions/general-action';
import {
  fetchTaskByUser,
  setTaskFilters
} from '../../state/actions/task-action';
import {
  fetchUsers
} from '../../state/actions/user-action';
import ErrorCmp from '../error/error';
import './task.css';

const override = css`
  display: inline-block;
  margin-left: 15px;
  border-color: red;
  width: 44px;
  float: right;
`;

export default function TaskList() {
  const pageSize = getPageSize();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.taskState.filters);
  const tasks = useSelector((state) => state.taskState.tasks.filter((item) => {
    return (
      (filters.project.toLowerCase() === '' || item.project.projectName.toLowerCase().includes(filters.project.toLowerCase())) &&
      (filters.name.toLowerCase() === '' || item.taskName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.description.toLowerCase() === '' || item.description.toLowerCase().includes(filters.description.toLowerCase())) &&
      (Number.parseInt(filters.priorityId) === 0 || Number.parseInt(item.priorityId) === Number.parseInt(filters.priorityId)) &&
      (Number.parseInt(filters.stateId) === 0 || Number.parseInt(item.stateId) === Number.parseInt(filters.stateId)) &&
      (Number.parseInt(filters.duration) === 0 || Number.parseInt(item.duration) === Number.parseInt(filters.duration)) &&
      (
        (filters.startDate === '' || fixDate(filters.startDate) === fixDate(item.startDate)) &&
        (filters.endDate === '' || new Date(filters.endDate) === new Date(item.endDate))
      )
    );
  }));
  const priorities = useSelector((state) => state.generalState.priorities);
  const states = useSelector((state) => state.generalState.states);
  const users = useSelector((state) => state.userState.users);
  const error = useSelector((state) => state.taskState.error);
  const isLoading = useSelector((state) => state.taskState.isLoading);
  const stateLogin = useSelector((state) => state.generalState.login);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    console.log(userInfo);
    if (userInfo.id === 0) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      dispatch(fetchTaskByUser(filters.selectedUser === 0 ? userInfo.id : filters.selectedUser))
        .then(() => dispatch(fetchStates())
          .then(() => dispatch(fetchPriorities())
            .then(() => dispatch(fetchUsers()))));

      if (filters.selectedUser === 0) {
        dispatch(setTaskFilters({
          ...filters,
          selectedUser: userInfo.id
        }));
      }
    };
  }, []);

  const handleResetFilters = () => {
    dispatch(setTaskFilters({
      project: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      duration: 0,
      priorityId: 0,
      stateId: 0,
      selectedUser: filters.selectedUser
    }));
  };

  const handleFiltersOnChacge = (e) => {
    // go from page 1
    setCurrentPage(1);

    dispatch(setTaskFilters({
      ...filters,
      [e.target.name]: e.target.name === 'duration'
        ? e.target.value === ''
          ? '0'
          : e.target.value
        : e.target.value
    }));
  };

  const handleFiltersStartDateOnChacge = (date) => {
    dispatch(setTaskFilters({
      ...filters,
      startDate: date === null ? '' : date
    }));
  };

  const handleFiltersEndDateOnChacge = (date) => {
    dispatch(setTaskFilters({
      ...filters,
      endDate: date === null ? '' : date
    }));
  };

  const handleUserOnChange = (e) => {
    dispatch(setTaskFilters({
      ...filters,
      selectedUser: e.target.value
    }));

    dispatch(fetchTaskByUser(e.target.value));
  };

  // -- pagination table data -----------------------------
  const tasksTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tasks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tasks, filters]);
  // -- pagination table data -----------------------------

  const TaskTemplate = ({ task, cnt }) => {
    // console.log(task);
    return (
      <>
        <tr>
          <td ><b>{
            currentPage === 1 ? (cnt + 1) : ((pageSize * (currentPage - 1)) + cnt) + 1
          }</b></td>
          <td ><b>{task.project.projectName}</b></td>
          <td >{task.taskName}</td>
          <td >{task.description}</td>
          <td >
            <i className="bi bi-calendar3"></i> &nbsp;
            {
              fixDate(new Date(task.startDate))
            }</td>
          <td >
            <i className="bi bi-calendar3"></i> &nbsp;
            {
              task.endDate !== null
                ? fixDate(new Date(task.endDate))
                : '---'
            }</td>
          <td className="text-center">
            <span className="badge badge-primary badge-pill">
              {task.duration}
            </span>
          </td>
          <td >
            <span className="badge bg-warning text-dark">
              <b>{task.priority.name}</b>
            </span>
          </td>
          <td >
            <span className="badge bg-warning text-dark">
              <b>{task.state.stateName}</b>
            </span>
          </td>
          <td align="center">
            <Link className="btn btn-sm btn-primary shadow-sm"
              to={`/tasks/details/${task.id}`}
            >
              <i className="bi bi-clipboard"></i> Details
            </Link>
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
          <i className='bi bi-list-task'></i> Tasks
        </h5>
        <div className='card-body overflow-auto'>
          <Link
            to='/tasks/add'
            className="btn btn-sm btn-primary shadow-sm"
            style={{ marginBottom: '10px' }}>
            <i className="bi bi-plus-lg"></i> New Task
          </Link>
          <ScaleLoader
            color={'#86C02E'}
            loading={isLoading}
            css={override}
            size={150}
          />
          <hr />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="projectId">By User</label>
              {stateLogin &&
                <select
                  id="userSelect"
                  name="userSelect"
                  className="form-control form-control-sm"
                  onChange={handleUserOnChange}
                  value={filters.selectedUser}
                >
                  {users && users.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >{item.title}</option>
                  ))}
                </select>
              }
            </div>
          </div>
          <br />
          <div className="table-responsive-sm">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Project</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">StartDate</th>
                  <th scope="col">EndDate</th>
                  <th scope="col">Duration</th>
                  {/* <th  scope="col">AssignedTo</th> */}
                  <th scope="col">Priority</th>
                  <th scope="col">State</th>
                  <th></th>
                </tr>
                <tr>
                  <th>
                    <button
                      className="btn btn-default btn-sm shadow-sm"
                      onClick={handleResetFilters}
                    >X</button>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="project"
                        name="project"
                        value={filters.project}
                        onChange={handleFiltersOnChacge}
                        className="fomr-control form-control-sm"
                        aria-describedby="basic-addon1"
                        style={{
                          border: '1px solid #e4e4e4',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={filters.name}
                        onChange={handleFiltersOnChacge}
                        className="fomr-control form-control-sm"
                        aria-describedby="basic-addon2"
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={filters.description}
                        onChange={handleFiltersOnChacge}
                        className="fomr-control form-control-sm"
                        aria-describedby="basic-addon3"
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon4">
                          <i className="bi bi-calendar3"></i>
                        </span>
                      </div>
                      <DatePicker
                        id="startDate"
                        name="startDate"
                        className="form-control form-control-sm"
                        key="startDate"
                        dateFormat='dd/MM/yyyy'
                        selected={filters.startDate}
                        value={filters.startDate}
                        onChange={(date) => handleFiltersStartDateOnChacge(date)}
                        aria-describedby="basic-addon4"
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon5">
                          <i className="bi bi-calendar3"></i>
                        </span>
                      </div>
                      <DatePicker
                        id="endDate"
                        name="endDate"
                        className="form-control form-control-sm"
                        key="endDate"
                        dateFormat='dd/MM/yyyy'
                        selected={filters.endDate}
                        value={filters.endDate}
                        onChange={(date) => handleFiltersEndDateOnChacge(date)}
                        aria-describedby="basic-addon5"
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon4">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={filters.duration}
                        onChange={handleFiltersOnChacge}
                        className="fomr-control form-control-sm"
                        min="0"
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon7">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <select
                        className="form-control form-control-sm"
                        id="priorityId"
                        name="priorityId"
                        value={filters.priorityId}
                        onChange={handleFiltersOnChacge}
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      >
                        <option key={'all'} value="0" defaultValue>---</option>
                        {
                          priorities && priorities.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </th>
                  <th>
                    <div className="input-group input-group-sm flex-nowrap">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon7">
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <select
                        className="form-control form-control-sm"
                        id="stateId"
                        name="stateId"
                        value={filters.stateId}
                        onChange={handleFiltersOnChacge}
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      >
                        <option key={'all'} value="0" defaultValue>---</option>
                        {
                          states && states.map((item) => (
                            <option key={item.id} value={item.id}>{item.stateName}</option>
                          ))
                        }
                      </select>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasksTableData.length > 0 &&
                  tasksTableData.map((task, i) => (
                    <TaskTemplate key={task.id} task={task} cnt={i} />
                  ))}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={tasks.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

TaskList.propTypes = {
  task: PropTypes.object,
  cnt: PropTypes.number
};
