import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SideBar from '../../components/navbars/sidebar/sidebar';
import TopBar from '../../components/navbars/topbar/topbar';
import ProjectForm from '../../components/project/project-form';
import ProjectList from '../../components/project/project-list';
import CommentForm from '../../components/task/comment/comment-form';
import SubTaskForm from '../../components/task/subtask/subtask-form';
import TaskDetails from '../../components/task/task-details';
import TaskForm from '../../components/task/task-form';
import TaskList from '../../components/task/task-list';
import UserForm from '../../components/user/user-form';
import UserList from '../../components/user/user-list';
import DepartmentForm from '../departments/department-form';
import DepartmentList from '../departments/department-list';
import Login from '../login/login';
import './content.css';

export default function Content() {
  const sideBarState = useSelector((state) => state.generalState.sideBar);

  useEffect(() => {
  }, [sideBarState]);

  return (
    <div className='wrapper'>
      <SideBar />
      <div id="content" className={(sideBarState === '' ? 'active' : '')}>
        <TopBar />
        <div className='row'>
          <div className='col-lg-12'>
            <Switch>
              <Route path='/login' exact>
                <Login />
              </Route>
              <Route path='/tasks' exact>
                <TaskList />
              </Route>
              <Route path='/tasks/add'>
                <TaskForm />
              </Route>
              <Route path='/tasks/comments/add'>
                <CommentForm />
              </Route>
              <Route path='/tasks/subtasks/add'>
                <SubTaskForm />
              </Route>
              <Route path='/tasks/details/:id'>
                <TaskDetails />
              </Route>
              <Route path='/' exact>
                <ProjectList />
              </Route>
              <Route path='/add'>
                <ProjectForm />
              </Route>
              <Route path='/users' exact>
                <UserList />
              </Route>
              <Route path='/users/add'>
                <UserForm />
              </Route>
              <Route path='/departments' exact>
                <DepartmentList />
              </Route>
              <Route path='/departments/add'>
                <DepartmentForm />
              </Route>
              <Route path='*'>
                <img
                  id="notfound"
                  src="/images/404-Error.gif"
                  alt="404-page-not-found" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
