import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { getValidatedUserInfo } from '../../../shared/shared';
import {
  deleteComputeDuration,
  fetchComputeDurations,
  setSelectedComputeDuration,
  setUserBySession
} from '../../../state/actions/general-action';
import ErrorCmp from '../../error/error';
import './duration.css';

const override = css`
  display: inline-block;
  margin-left: 15px;
  border-color: red;
  width: 44px;
  float: right;
`;

export default function DurationList() {
  const currentPage = 1;
  const dispatch = useDispatch();
  const error = useSelector(
    (state) => state.generalState.error
  );
  const role = useSelector(
    (state) => state.generalState.login?.role
  );
  const durations = useSelector(
    (state) => state.generalState.computeDurations
  );
  const isLoading = useSelector(
    (state) => state.projectState.isLoading
  );
  const history = useHistory();

  useEffect(() => {
    // user validation
    const userInfo = getValidatedUserInfo();
    if (userInfo.id === 0) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));
      // fetch computed durations
      dispatch(fetchComputeDurations());
    }
  }, []);

  const handleEditBtn = (dur) => {
    dispatch(setSelectedComputeDuration(dur));
    history.push('/settings/computeduration/add');
  };

  const handleDeleteBtn = (id) => {
    if (confirm('Are you sure you want to delete it?')) {
      dispatch(deleteComputeDuration(id));
    }
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-clock'></i> Computed Durations
        </h5>
        <div className='card-body overflow-auto'>
          <Link
            to='/settings/computeduration/add'
            className={`btn btn-sm btn-primary shadow-sm ${
              role !== 'Administrator' && 'disabled'
            }`}
            style={{ marginBottom: '10px' }}
          >
            <i className='bi bi-plus-lg'></i> New Unit
          </Link>
          <ScaleLoader
            color={'#86C02E'}
            loading={isLoading}
            css={override}
            size={150}
          />
          <br />
          <div className='table-responsive-sm'>
            <table className='table table-sm table-hover table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Code</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Factor</th>
                  <th nowrap='true'></th>
                </tr>
              </thead>
              <tbody>
                {durations &&
                  durations.map((item, cnt) => (
                    <tr key={item._id}>
                      <td nowrap='true'>
                        {' '}
                        <b>
                          {currentPage === 1
                            ? cnt + 1
                            : pageSize * (currentPage - 1) +
                              cnt +
                              1}
                        </b>
                      </td>
                      <td nowrap='true'>{item.code}</td>
                      <td nowrap='true'>
                        {item.description}
                      </td>
                      <td nowrap='true' align='right'>
                        <b>
                          {Number.parseFloat(
                            item.factor
                          ).toFixed(2)}
                        </b>
                      </td>
                      <td nowrap='true' align='center'>
                        <button
                          className='btn btn-sm btn-primary shadow-sm'
                          onClick={() =>
                            handleEditBtn(item)
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
                            handleDeleteBtn(item._id)
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
          </div>
        </div>
      </div>
    </>
  );
}
