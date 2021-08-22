import React, { useEffect, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import el from 'date-fns/locale/el'; // the locale you want
import DatePicker, {
  registerLocale
} from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Pagination from '../../shared/pagination/Pagination';
import {
  prepareFilterDateAndSend,
  fixDate,
  getPageSize,
  getValidatedUserInfo
} from '../../shared/shared';
import {
  fetchComputeDurations,
  fetchPriorities,
  fetchStates,
  setUserBySession
} from '../../state/actions/general-action';
import {
  fetchProjectsByUser,
  setProjectFilters,
  setSelectedProject,
  deleteProject
} from '../../state/actions/project-action';
import { fetchUsers } from '../../state/actions/user-action';
import './project.css';
import ErrorCmp from '../error/error';

const override = css`
  display: inline-block;
  margin-left: 15px;
  border-color: red;
  width: 44px;
  float: right;
`;

export default function ProjectList() {
  registerLocale('el', el); // register it with the name you want
  const pageSize = getPageSize();
  const dispatch = useDispatch();
  const filters = useSelector(
    (state) => state.projectState.filters
  );
  const projects = useSelector((state) =>
    state.projectState.projects.filter((item) => {
      return (
        (filters.name.toLowerCase() === '' ||
          item.projectName
            .toLowerCase()
            .includes(filters.name.toLowerCase())) &&
        (filters.description.toLowerCase() === '' ||
          item.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())) &&
        (Number.parseInt(filters.duration) === 0 ||
          Number.parseInt(item.duration) ===
            Number.parseInt(filters.duration)) &&
        (Number.parseInt(filters.priorityId) === 0 ||
          Number.parseInt(item.priorityId) ===
            Number.parseInt(filters.priorityId)) &&
        (Number.parseInt(filters.stateId) === 0 ||
          Number.parseInt(item.stateId) ===
            Number.parseInt(filters.stateId)) &&
        (filters.createdFrom === '' ||
          new Date(filters.createdFrom) <=
            new Date(item.createdOnTicks)) &&
        (filters.createdTo === '' ||
          new Date(filters.createdTo) >=
            new Date(item.createdOnTicks)) &&
        (filters.deadlineFrom === '' ||
          new Date(filters.deadlineFrom) <=
            new Date(item.deadline)) &&
        (filters.deadlineTo === '' ||
          new Date(filters.deadlineTo) >=
            new Date(item.deadline))
      );
    })
  );
  const users = useSelector(
    (state) => state.userState.users
  );
  const priorities = useSelector(
    (state) => state.generalState.priorities
  );
  const states = useSelector(
    (state) => state.generalState.states
  );
  const role = useSelector(
    (state) =>
      state.generalState.login &&
      state.generalState.login.role
  );
  const error = useSelector(
    (state) => state.projectState.error
  );
  const computeDurationUnits = useSelector(
    (state) => state.generalState.computeDurations
  );
  const isLoading = useSelector(
    (state) => state.projectState.isLoading
  );
  // const stateLogin = useSelector((state) => state.generalState.login);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // user validation
    const userInfo = getValidatedUserInfo();
    if (userInfo.id === 0) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      var curSelectedMonthFrom = `${
        new Date().getMonth() + 1
      }|${new Date().getFullYear()}`;
      var curSelectedMonthTo = `${
        new Date().getMonth() + 1
      }|${new Date().getFullYear()}`;

      // fetch helpers
      dispatch(fetchComputeDurations()).then(() =>
        dispatch(fetchPriorities()).then(() =>
          dispatch(fetchStates()).then(() =>
            dispatch(fetchUsers())
              .then(() =>
                dispatch(
                  // fetch projects
                  fetchProjectsByUser(
                    filters.selectedUser === 0
                      ? userInfo.id
                      : filters.selectedUser,
                    filters.selectedMonthFrom === 0
                      ? curSelectedMonthFrom
                      : prepareFilterDateAndSend(
                          filters.selectedMonthFrom
                        ),
                    filters.selectedMonthTo === 0
                      ? curSelectedMonthTo
                      : prepareFilterDateAndSend(
                          filters.selectedMonthTo
                        )
                  )
                )
              )
              // set project filters
              .then(() =>
                dispatch(
                  setProjectFilters({
                    ...filters,
                    selectedUser:
                      filters.selectedUser === 0
                        ? userInfo.id
                        : filters.selectedUser,
                    selectedMonthFrom:
                      filters.selectedMonthFrom === 0
                        ? new Date()
                        : filters.selectedMonthFrom,
                    selectedMonthTo:
                      filters.selectedMonthTo === 0
                        ? new Date()
                        : filters.selectedMonthTo
                  })
                )
              )
          )
        )
      );
    }
  }, []);

  useEffect(() => {
    // go from page 1
    setCurrentPage(1);
  }, [filters]);

  const handleEditBtn = (project) => {
    dispatch(setSelectedProject(project));
    history.push('/add');
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      dispatch(deleteProject(id));
    }
  };

  const handleUserOnChange = (e) => {
    dispatch(
      setProjectFilters({
        ...filters,
        selectedUser: e.target.value
      })
    );

    dispatch(
      fetchProjectsByUser(
        e.target.value,
        prepareFilterDateAndSend(filters.selectedMonthFrom),
        prepareFilterDateAndSend(filters.selectedMonthTo)
      )
    );
  };

  const handleMonthFromOnChange = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        selectedMonthFrom: date
      })
    );

    dispatch(
      fetchProjectsByUser(
        filters.selectedUser,
        prepareFilterDateAndSend(date),
        prepareFilterDateAndSend(filters.selectedMonthTo)
      )
    );
  };

  const handleMonthToOnChange = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        selectedMonthTo: date
      })
    );

    dispatch(
      fetchProjectsByUser(
        filters.selectedUser,
        prepareFilterDateAndSend(filters.selectedMonthFrom),
        prepareFilterDateAndSend(date)
      )
    );
  };

  const handleResetFilters = () => {
    dispatch(
      setProjectFilters({
        createdFrom: '',
        createdTo: '',
        name: '',
        description: '',
        duration: 0,
        deadlineFrom: '',
        deadlineTo: '',
        priorityId: 0,
        stateId: 0,
        selectedUser: filters.selectedUser,
        selectedMonthFrom: filters.selectedMonthFrom,
        selectedMonthTo: filters.selectedMonthTo
      })
    );
  };

  const handleFiltersOnChacge = (e) => {
    dispatch(
      setProjectFilters({
        ...filters,
        [e.target.name]:
          e.target.name === 'duration'
            ? e.target.value === ''
              ? '0'
              : e.target.value
            : e.target.value
      })
    );
  };

  const handleFiltersCreatedFromOnChacge = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        createdFrom: date === null ? '' : date
      })
    );
  };

  const handleFiltersCreatedToOnChacge = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        createdTo: date === null ? '' : date
      })
    );
  };

  const handleFiltersDeadlineFromOnChacge = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        deadlineFrom: date === null ? '' : date
      })
    );
  };

  const handleFiltersDeadlineToOnChacge = (date) => {
    dispatch(
      setProjectFilters({
        ...filters,
        deadlineTo: date === null ? '' : date
      })
    );
  };

  // -- pagination table data -----------------------------
  const projectsTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projects, filters]);
  // -- pagination table data -----------------------------

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-briefcase'></i> Projects
        </h5>
        <div className='card-body'>
          <Link
            to='/add'
            className={`btn btn-sm btn-primary shadow-sm ${
              role !== 'Administrator' && 'disabled'
            }`}
            style={{ marginBottom: '10px' }}
          >
            <i className='bi bi-plus-lg'></i> New Project
          </Link>
          <ScaleLoader
            color={'#86C02E'}
            loading={isLoading}
            css={override}
            size={150}
          />
          <hr />
          <div className='form-row'>
            <div className='form-group col-md-2'>
              <label htmlFor='projectId'>By User</label>
              <select
                id='userSelect'
                name='userSelect'
                className='form-control form-control-sm'
                onChange={handleUserOnChange}
                value={filters.selectedUser}
              >
                <option key='all' value='0'>
                  Όλα
                </option>
                {users &&
                  users.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title} ({item.department.name})
                    </option>
                  ))}
              </select>
            </div>
            <div className='form-group col-lg-2'>
              <label htmlFor='selectedMonthFrom'>
                From Month
              </label>
              <DatePicker
                id='selectedMonthFrom'
                name='selectedMonthFrom'
                className='form-control form-control-sm'
                key='startDate'
                value={
                  filters.selectedMonthFrom === 0
                    ? new Date()
                    : filters.selectedMonthFrom
                }
                selected={
                  filters.selectedMonthFrom === 0
                    ? new Date()
                    : filters.selectedMonthFrom
                }
                onChange={(date) =>
                  handleMonthFromOnChange(date)
                }
                dateFormat='MM/yyyy'
                showMonthYearPicker
              />
            </div>
            <div className='form-group col-lg-2'>
              <label htmlFor='selectedMonthTo'>
                To Month
              </label>
              <DatePicker
                id='selectedMonthTo'
                name='selectedMonthTo'
                className='form-control form-control-sm'
                key='startDate'
                minDate={filters.selectedMonthFrom}
                value={
                  filters.selectedMonthTo === 0
                    ? new Date()
                    : filters.selectedMonthTo
                }
                selected={
                  filters.selectedMonthTo === 0
                    ? new Date()
                    : filters.selectedMonthTo
                }
                onChange={(date) =>
                  handleMonthToOnChange(date)
                }
                dateFormat='MM/yyyy'
                showMonthYearPicker
              />
            </div>
          </div>
          <br />
          <div className='table-responsive-sm'>
            <table className='table table-sm table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col' colSpan='2'>
                    Created
                  </th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Duration</th>
                  <th scope='col' colSpan='2'>
                    Deadline
                  </th>
                  <th scope='col'>Priority</th>
                  <th scope='col'>State</th>
                  <th nowrap='true'></th>
                </tr>
                <tr>
                  <th>
                    <button
                      className='btn btn-default btn-sm shadow-sm'
                      onClick={handleResetFilters}
                    >
                      X
                    </button>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon1'
                        >
                          <i className='bi bi-calendar3'></i>
                        </span>
                      </div>
                      <DatePicker
                        id='createdFrom'
                        name='createdFrom'
                        className='form-control form-control-sm'
                        key='createdFrom'
                        locale='el'
                        dateFormat='dd/MM/yyyy'
                        selected={filters.createdFrom}
                        value={filters.createdFrom}
                        aria-describedby='basic-addon1'
                        onChange={(date) =>
                          handleFiltersCreatedFromOnChacge(
                            date
                          )
                        }
                        style={{
                          border: '1px solid #e4e4e4',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon2'
                        >
                          <i className='bi bi-calendar3'></i>
                        </span>
                      </div>
                      <DatePicker
                        id='createdTo'
                        name='createdTo'
                        className='form-control form-control-sm'
                        key='createdTo'
                        locale='el'
                        dateFormat='dd/MM/yyyy'
                        minDate={filters.createdFrom}
                        selected={filters.createdTo}
                        value={filters.createdTo}
                        aria-describedby='basic-addon2'
                        onChange={(date) =>
                          handleFiltersCreatedToOnChacge(
                            date
                          )
                        }
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon4'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        id='name'
                        name='name'
                        value={filters.name}
                        onChange={handleFiltersOnChacge}
                        type='text'
                        className='fomr-control form-control-sm'
                        aria-describedby='basic-addon4'
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon3'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        type='text'
                        id='description'
                        name='description'
                        value={filters.description}
                        onChange={handleFiltersOnChacge}
                        className='fomr-control form-control-sm'
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon4'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        type='number'
                        id='duration'
                        name='duration'
                        value={filters.duration}
                        onChange={handleFiltersOnChacge}
                        className='fomr-control form-control-sm'
                        min='0'
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon6'
                        >
                          <i className='bi bi-calendar3'></i>
                        </span>
                      </div>
                      <DatePicker
                        id='deadlineFrom'
                        name='deadlineFrom'
                        className='form-control form-control-sm'
                        key='deadlineFrom'
                        locale='el'
                        dateFormat='dd/MM/yyyy'
                        selected={filters.deadlineFrom}
                        value={filters.deadlineFrom}
                        onChange={(date) =>
                          handleFiltersDeadlineFromOnChacge(
                            date
                          )
                        }
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon7'
                        >
                          <i className='bi bi-calendar3'></i>
                        </span>
                      </div>
                      <DatePicker
                        id='deadlineTo'
                        name='deadlineTo'
                        className='form-control form-control-sm'
                        key='deadlineTo'
                        locale='el'
                        dateFormat='dd/MM/yyyy'
                        minDate={filters.deadlineFrom}
                        selected={filters.deadlineTo}
                        value={filters.deadlineTo}
                        onChange={(date) =>
                          handleFiltersDeadlineToOnChacge(
                            date
                          )
                        }
                      />
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon7'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <select
                        className='form-control form-control-sm'
                        id='priorityId'
                        name='priorityId'
                        value={filters.priorityId}
                        onChange={handleFiltersOnChacge}
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      >
                        <option
                          key={'all'}
                          value='0'
                          defaultValue
                        >
                          ---
                        </option>
                        {priorities &&
                          priorities.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon7'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <select
                        className='form-control form-control-sm'
                        id='stateId'
                        name='stateId'
                        value={filters.stateId}
                        onChange={handleFiltersOnChacge}
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                      >
                        <option
                          key={'all'}
                          value='0'
                          defaultValue
                        >
                          ---
                        </option>
                        {states &&
                          states.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                            >
                              {item.stateName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </th>
                  <th nowrap='true'></th>
                </tr>
              </thead>
              <tbody>
                {projectsTableData.length > 0 &&
                  projectsTableData.map((project, cnt) => (
                    <tr key={project._id}>
                      <td>
                        <b>
                          {currentPage === 1
                            ? cnt + 1
                            : pageSize * (currentPage - 1) +
                              cnt +
                              1}
                        </b>
                      </td>
                      <td colSpan='2'>
                        <i className='bi bi-calendar3'></i>{' '}
                        &nbsp;
                        {fixDate(project.createdAt)}
                      </td>
                      <td>
                        <b>{project.projectName}</b>
                      </td>
                      <td>{project.description}</td>
                      <td className='text-center'>
                        {Number.parseFloat(
                          project.duration
                        ).toFixed(2)}{' '}
                        {computeDurationUnits &&
                          computeDurationUnits.find(
                            (item) => {
                              return (
                                project.durationUnit ===
                                item._id
                              );
                            }
                          ).code}
                      </td>
                      <td colSpan='2'>
                        <i className='bi bi-calendar3'></i>{' '}
                        &nbsp;
                        {fixDate(project.deadline)}
                      </td>
                      <td>
                        <span className='badge bg-warning text-dark shadow-sm'>
                          <b>
                            {
                              priorities.find(
                                (item) =>
                                  item._id ===
                                  project.priority
                              ).name
                            }
                          </b>
                        </span>
                      </td>
                      <td>
                        <span className='badge bg-warning text-dark shadow-sm'>
                          <b>
                            {
                              states.find(
                                (item) =>
                                  item._id === project.state
                              ).stateName
                            }
                          </b>
                        </span>
                      </td>
                      <td nowrap='true' align='center'>
                        <button
                          className='btn btn-sm btn-primary shadow-sm'
                          onClick={() =>
                            handleEditBtn(project)
                          }
                          disabled={
                            role !== 'Administrator'
                          }
                        >
                          <i className='bi bi-pencil'></i>
                        </button>{' '}
                        <button
                          className='btn btn-sm btn-danger shadow-sm'
                          onClick={() =>
                            handleDeleteBtn(project._id)
                          }
                          disabled={
                            role !== 'Administrator'
                          }
                        >
                          <i className='bi bi-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              className='pagination-bar'
              currentPage={currentPage}
              totalCount={projects.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
