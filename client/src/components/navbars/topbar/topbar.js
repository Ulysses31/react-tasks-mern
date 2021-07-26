import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  resetValidatedUserInfo
} from '../../../shared/shared';
import {
  changeSidebarState,
  resetUserByLogin
} from '../../../state/actions/general-action';
import './topbar.css';

export default function Topbar() {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.generalState.sideBar);
  const stateLogin = useSelector((state) => state.generalState.login);
  const history = useHistory();

  useEffect(() => {
  }, []);

  const handleSideBarState = () => {
    dispatch(changeSidebarState(sideBar === '' ? 'active' : ''));
  };

  const handleSignOutUser = () => {
    resetValidatedUserInfo();
    dispatch(resetUserByLogin());
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-info shadow-sm"
          onClick={handleSideBarState}
        >
          <i className="bi bi-text-left"></i>&nbsp;
          <span>Menu</span>
        </button>
        <button
          className="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-justify"></i>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              {stateLogin
                ? <a href="#"
                  onClick={handleSignOutUser}>
                  Signout <b>{stateLogin.title}</b>
                </a>
                : <Link to='/login'>
                  <b>
                    <i
                      className="bi bi-person-circle"
                    ></i>&nbsp;
                    <span>Sign In</span>
                  </b>
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
