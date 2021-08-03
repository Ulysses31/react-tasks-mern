import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Pagination from '../../shared/pagination/Pagination';
import {
  fixDate,
  getValidatedUserInfo,
  getPageSize
} from '../../shared/shared';
import {
  fetchDepartments,
  deleteDepartment,
  setSelectedDepartment
} from '../../state/actions/department-action';
import { setUserBySession } from '../../state/actions/general-action';
import ErrorCmp from '../error/error';
import './department.css';

export default function DepartmentList() {
  const pageSize = getPageSize();
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(
    (state) => state.userState.error
  );
  const departments = useSelector(
    (state) => state.departmentState.departments
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // user validation
    const userInfo = getValidatedUserInfo();
    if (userInfo.id === 0) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      dispatch(fetchDepartments());
    }
  }, []);

  const handleEditBtn = (dprt) => {
    dispatch(setSelectedDepartment(dprt));
    history.push('/departments/add');
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      dispatch(deleteDepartment(id));
    }
  };

  const DepartmentTemplate = ({ dprt, cnt }) => {
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
          <td nowrap='true'>{dprt.id}</td>
          <td nowrap='true'>
            <i className='bi bi-person-check-fill'></i>{' '}
            &nbsp;
            <b>{dprt.name}</b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-laptop'></i> &nbsp;
            <b>{dprt.description}</b>
          </td>
          <td nowrap='true'>
            <i className='bi bi-calendar3'></i> &nbsp;
            {fixDate(dprt.createdAt)}
          </td>
          <td nowrap='true' align='center'>
            <button
              className='btn btn-sm btn-primary shadow-sm'
              onClick={() => handleEditBtn(dprt)}
            >
              <i className='bi bi-pencil'></i>
            </button>{' '}
            <button
              className='btn btn-sm btn-danger shadow-sm'
              onClick={() => handleDeleteBtn(dprt.id)}
            >
              <i className='bi bi-trash'></i>
            </button>
          </td>
        </tr>
      </>
    );
  };

  // -- pagination table data -----------------------------
  const projectsTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return departments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, departments]);
  // -- pagination table data -----------------------------

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-person-check-fill'></i>{' '}
          Departments
        </h5>
        <div className='card-body overflow-auto'>
          <Link
            to='/departments/add'
            className='btn btn-sm btn-primary shadow-sm'
            style={{ marginBottom: '10px' }}
          >
            <i className='bi bi-plus-lg'></i> New Department
          </Link>
          {projectsTableData.length > 0 && (
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
                      Id
                    </th>
                    <th nowrap='true' scope='col'>
                      Name
                    </th>
                    <th nowrap='true' scope='col'>
                      Description
                    </th>
                    <th nowrap='true' scope='col'>
                      Created
                    </th>
                    <th nowrap='true' scope='col'></th>
                  </tr>
                  <tr>
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
                          id='startDate'
                          name='startDate'
                          className='form-control form-control-sm'
                          key='startDate'
                          dateFormat='dd/MM/yyyy'
                          selected={''}
                          value={''}
                          onChange={() => {}}
                          style={{
                            border: '1px solid #cdcdcd',
                            width: '100%'
                          }}
                          disabled
                        />
                      </div>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projectsTableData.map((dprt, i) => (
                    <DepartmentTemplate
                      key={dprt.id}
                      dprt={dprt}
                      cnt={i}
                    />
                  ))}
                </tbody>
              </table>
              <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={departments.length}
                pageSize={pageSize}
                onPageChange={(page) =>
                  setCurrentPage(page)
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

DepartmentList.propTypes = {
  dprt: PropTypes.object,
  cnt: PropTypes.number
};
