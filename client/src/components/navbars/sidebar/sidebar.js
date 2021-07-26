import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export default function SideBar() {
  const location = useLocation();
  const sideBarState = useSelector(
    (state) => state.generalState.sideBar
  );
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );
  const [sdb, setSdb] = useState(sideBarState);

  useEffect(() => {
    setSdb(sideBarState);
  }, [sideBarState]);

  return (
    <nav
      id='sidebar'
      className={sdb === '' ? 'active' : ''}
    >
      <div className='sidebar-header shadow-sm'>
        <span id='logo'>React Tasks</span>
      </div>
      <div id='userAvatar'>
        <img
          src='/images/avatar_transp.gif'
          alt='userAvatar'
          id='avatar'
        />
        {stateLogin ? (
          <span>
            Welcome <br /> {stateLogin.title}
          </span>
        ) : (
          <span>Welcome User</span>
        )}
      </div>
      <ul className='list-unstyled components'>
        <li className='active'>
          <a
            href='#'
            data-toggle='collapse'
            aria-expanded='true'
            className='dropdown-toggle'
          >
            Main
          </a>
          <ul className='list-unstyled' id='homeSubmenu'>
            <li>
              <Link
                to='/'
                className={
                  'sideBarLink ' +
                  (location.pathname === '/' ||
                  location.pathname === '/add'
                    ? 'active'
                    : '')
                }
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h6 className='mb-1'>
                    <i className='bi bi-briefcase'></i>{' '}
                    &nbsp; Projects
                  </h6>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to='/tasks'
                className={
                  'sideBarLink ' +
                  (location.pathname === '/tasks' ||
                  location.pathname === '/tasks/add' ||
                  location.pathname.includes(
                    '/tasks/details/'
                  ) ||
                  location.pathname.includes(
                    '/tasks/subtasks/add'
                  ) ||
                  location.pathname.includes(
                    '/tasks/comments/add'
                  )
                    ? 'active'
                    : '')
                }
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h6 className='mb-1'>
                    <i className='bi bi-list-task'></i>{' '}
                    &nbsp; Tasks
                  </h6>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to='/users'
                className={
                  'sideBarLink ' +
                  (location.pathname === '/users' ||
                  location.pathname === '/users/add'
                    ? 'active'
                    : '')
                }
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h6 className='mb-1'>
                    <i className='bi bi-people'></i> &nbsp;
                    Users
                  </h6>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to='/departments'
                className={
                  'sideBarLink ' +
                  (location.pathname === '/departments' ||
                  location.pathname === '/departments/add'
                    ? 'active'
                    : '')
                }
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h6 className='mb-1'>
                    <i className='bi bi-person-check-fill'></i>{' '}
                    &nbsp; Departments
                  </h6>
                </div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
