import React, { useEffect, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Pagination from '../../shared/pagination/Pagination';
import {
  fixDate,
  getPageSize,
  getValidatedUserInfo
} from '../../shared/shared';
import { fetchDepartments } from '../../state/actions/department-action';
import { setUserBySession } from '../../state/actions/general-action';
import {
  fetchUsers,
  deleteUser,
  setSelectedUser,
  fetchRoles,
  setUserFilters
} from '../../state/actions/user-action';
import ErrorCmp from '../error/error';
import './user.css';

const override = css`
  display: inline-block;
  margin-left: 15px;
  border-color: red;
  width: 44px;
  float: right;
`;

export default function UserList() {
  const pageSize = getPageSize();
  const dispatch = useDispatch();
  const error = useSelector(
    (state) => state.userState.error
  );
  const filters = useSelector(
    (state) => state.userState.filters
  );
  const users = useSelector((state) =>
    state.userState.users.filter((item) => {
      return (
        (filters.title.toLowerCase() === '' ||
          item.title
            .toLowerCase()
            .includes(filters.title.toLowerCase())) &&
        (filters.position.toLowerCase() === '' ||
          item.position
            .toLowerCase()
            .includes(filters.position.toLowerCase())) &&
        (Number.parseInt(filters.department) === 0 ||
          Number.parseInt(item.departmentId) ===
            Number.parseInt(filters.department)) &&
        (Number.parseInt(filters.roleId) === 0 ||
          Number.parseInt(item.userRoleId) ===
            Number.parseInt(filters.roleId))
      );
    })
  );
  const departments = useSelector(
    (state) => state.departmentState.departments
  );
  const isLoading = useSelector(
    (state) => state.userState.isLoading
  );
  const roles = useSelector(
    (state) => state.userState.roles
  );
  // const stateLogin = useSelector((state) => state.generalState.login);
  const role = useSelector(
    (state) => state.generalState.login?.role
  );
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // user validation
    const userInfo = getValidatedUserInfo();
    if (userInfo.id === 0) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));
      dispatch(fetchUsers()).then(() =>
        dispatch(fetchRoles()).then(() =>
          dispatch(fetchDepartments())
        )
      );
    }
  }, []);

  const handleResetFilters = () => {
    dispatch(
      setUserFilters({
        title: '',
        position: '',
        department: 0,
        roleId: 0
      })
    );
  };

  const handleFiltersOnChacge = (e) => {
    // go from page 1
    setCurrentPage(1);

    dispatch(
      setUserFilters({
        ...filters,
        [e.target.name]: e.target.value
      })
    );
  };

  const handleEditBtn = (usr) => {
    dispatch(setSelectedUser(usr));
    history.push('/users/add');
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      dispatch(deleteUser(id));
    }
  };

  // -- pagination table data -----------------------------
  const usersTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);
  // -- pagination table data -----------------------------

  const UserTemplate = ({ user, cnt }) => {
    return (
      <>
        <tr>
          <td nowrap='true'>
            <b>
              {currentPage === 1
                ? cnt + 1
                : pageSize * (currentPage - 1) + cnt + 1}
            </b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-person-check-fill'></i>{' '}
            &nbsp;
            <b>{user.title}</b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-laptop'></i> &nbsp;
            <b>{user.position}</b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-tools'></i> &nbsp;
            <b>{user.department.name}</b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-envelope'></i> &nbsp;
            <a href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </td>
          <td nowrap='true'>
            <i className='bi bi-telephone'></i> &nbsp;
            {user.telephone === null ||
            user.telephone === ''
              ? '---'
              : user.telephone}
          </td>
          <td nowrap='true'>
            <i className='bi bi-phone'></i> &nbsp;
            {user.mobile === null || user.mobile === ''
              ? '---'
              : user.mobile}
          </td>
          <td nowrap='true'>
            <i className='bi bi-phone-vibrate'></i> &nbsp;
            {user.internalPhone === null ||
            user.internalPhone === ''
              ? '---'
              : user.internalPhone}
          </td>
          <td nowrap='true'>
            <i className='bi bi-key-fill'></i> &nbsp;
            <span className='badge badge-primary badge-pill'>
              {user.role.role}
            </span>
          </td>
          <td nowrap='true'>
            <i className='bi bi-calendar3'></i> &nbsp;
            {fixDate(user.createdAt)}
          </td>
          <td nowrap='true' align='center'>
            <button
              className='btn btn-sm btn-primary shadow-sm'
              onClick={() => handleEditBtn(user)}
              disabled={role !== 'Administrator'}
            >
              <i className='bi bi-pencil'></i>
            </button>{' '}
            <button
              className='btn btn-sm btn-danger shadow-sm'
              onClick={() => handleDeleteBtn(user.id)}
              disabled={role !== ''}
            >
              <i className='bi bi-trash'></i>
            </button>
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
          <i className='bi bi-people'></i> Users
        </h5>
        <div className='card-body overflow-auto'>
          <Link
            to='/users/add'
            className={`btn btn-sm btn-primary shadow-sm ${
              role !== 'Administrator' && 'disabled'
            }`}
            style={{ marginBottom: '10px' }}
          >
            <i className='bi bi-plus-lg'></i> New User
          </Link>
          <ScaleLoader
            color={'#86C02E'}
            loading={isLoading}
            css={override}
            size={150}
          />
          <div className='table-responsive'>
            <table
              border='0'
              className='table table-sm table-hover'
            >
              <thead>
                <tr>
                  <th nowrap='true' scope='col'>
                    #
                  </th>
                  <th nowrap='true' scope='col'>
                    Title
                  </th>
                  <th nowrap='true' scope='col'>
                    Position
                  </th>
                  <th nowrap='true' scope='col'>
                    Department
                  </th>
                  <th nowrap='true' scope='col'>
                    Email
                  </th>
                  <th nowrap='true' scope='col'>
                    Telephone
                  </th>
                  <th nowrap='true' scope='col'>
                    Mobile
                  </th>
                  <th nowrap='true' scope='col'>
                    InternalPhone
                  </th>
                  <th nowrap='true' scope='col'>
                    Role
                  </th>
                  <th nowrap='true' scope='col'>
                    Created
                  </th>
                  <th nowrap='true' scope='col'></th>
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
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        type='text'
                        className='fomr-control form-control-sm'
                        id='title'
                        name='title'
                        value={filters.title}
                        onChange={handleFiltersOnChacge}
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
                          id='basic-addon1'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        type='text'
                        className='fomr-control form-control-sm'
                        id='position'
                        name='position'
                        value={filters.position}
                        onChange={handleFiltersOnChacge}
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
                          id='basic-addon1'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <select
                        className='form-control form-control-sm'
                        id='department'
                        name='department'
                        value={filters.department}
                        onChange={handleFiltersOnChacge}
                      >
                        <option
                          key='pj'
                          value='0'
                          defaultValue
                        >
                          ---
                        </option>
                        {departments &&
                          departments.map((dprt) => (
                            <option
                              key={dprt._id}
                              value={dprt._id}
                            >
                              {dprt.name}
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
                          id='basic-addon1'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <input
                        type='text'
                        className='fomr-control form-control-sm'
                        style={{
                          border: '1px solid #cdcdcd',
                          width: '100%'
                        }}
                        disabled
                      />
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <div className='input-group input-group-sm flex-nowrap'>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          id='basic-addon1'
                        >
                          <i className='bi bi-search'></i>
                        </span>
                      </div>
                      <select
                        className='form-control form-control-sm'
                        id='roleId'
                        name='roleId'
                        value={filters.roleId}
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
                        {roles &&
                          roles.map((role) => (
                            <option
                              key={role._id}
                              value={role._id}
                            >
                              {role.role}
                            </option>
                          ))}
                      </select>
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersTableData.length > 0 &&
                  usersTableData.map((user, i) => (
                    <UserTemplate
                      key={user._id}
                      user={user}
                      cnt={i}
                    />
                  ))}
              </tbody>
            </table>
            <Pagination
              className='pagination-bar'
              currentPage={currentPage}
              totalCount={users.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

UserList.propTypes = {
  user: PropTypes.object,
  cnt: PropTypes.number
};
