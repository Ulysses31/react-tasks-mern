const State = require('./models/state');
const Priority = require('./models/priority');
const ComputeDuration = require('./models/computeDuration');
const Department = require('./models/department');
const UserRole = require('./models/userRole');
const User = require('./models/user');
const Project = require('./models/project');
const Task = require('./models/task');
const SubTask = require('./models/subTask');
const Comment = require('./models/comment');

const dropCollections = () => {
  State.collection.countDocuments().then((result) => {
    console.log(`State: ${result}`);
    if (result > 0) {
      State.collection.drop().then(() => seedStates());
    } else {
      seedStates();
    }
  });

  Priority.collection.countDocuments().then((result) => {
    console.log(`Priority: ${result}`);
    if (result > 0) {
      Priority.collection
        .drop()
        .then(() => seedPriorities());
    } else {
      seedPriorities();
    }
  });

  ComputeDuration.collection
    .countDocuments()
    .then((result) => {
      console.log(`ComputeDuration: ${result}`);
      if (result > 0) {
        ComputeDuration.collection
          .drop()
          .then(() => seedComputeDurations());
      } else {
        seedComputeDurations();
      }
    });

  Department.collection.countDocuments().then((result) => {
    console.log(`Department: ${result}`);
    if (result > 0) {
      Department.collection
        .drop()
        .then(() => seedDepartments());
    } else {
      seedDepartments();
    }
  });

  UserRole.collection.countDocuments().then((result) => {
    console.log(`UserRole: ${result}`);
    if (result > 0) {
      UserRole.collection
        .drop()
        .then(() => seedUserRoles());
    } else {
      seedUserRoles();
    }
  });

  User.collection.countDocuments().then((result) => {
    console.log(`User: ${result}`);
    if (result > 0) {
      User.collection.drop().then(() => seedUsers());
    } else {
      seedUsers();
    }
  });

  Comment.collection.countDocuments().then((result) => {
    console.log(`Comment: ${result}`);
    if (result > 0) {
      Comment.collection.drop().then(() => seedComments());
    } else {
      seedComments();
    }
  });

  SubTask.collection.countDocuments().then((result) => {
    console.log(`SubTask: ${result}`);
    if (result > 0) {
      SubTask.collection.drop().then(() => seedSubTasks());
    } else {
      seedSubTasks();
    }
  });

  Task.collection.countDocuments().then((result) => {
    console.log(`Task: ${result}`);
    if (result > 0) {
      Task.collection.drop().then(() => seedTasks());
    } else {
      seedTasks();
    }
  });

  Project.collection.countDocuments().then((result) => {
    console.log(`Project: ${result}`);
    if (result > 0) {
      Project.collection.drop().then(() => seedProjects());
    } else {
      seedProjects();
    }
  });
};

const seedStates = () => {
  const stTodo = new State({
    _id: '6110c318fddf9edf50e9b32d',
    sign: 'TD',
    stateName: 'ToDo',
    sort: 1,
    isEnabled: true,
    projects: [],
    tasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const stInProgress = new State({
    _id: '6110c318fddf9edf50e9b32c',
    sign: 'IP',
    stateName: 'In Progress',
    sort: 2,
    isEnabled: true,
    createdBy: 'Ιορδανίδης Χρήστος',
    updatedBy: null,
    updatedAt: null
  });

  const stTest = new State({
    _id: '6110c318fddf9edf50e9b32e',
    sign: 'TS',
    stateName: 'Test',
    sort: 3,
    isEnabled: true,
    createdBy: 'Ιορδανίδης Χρήστος',
    updatedBy: null,
    updatedAt: null
  });

  const stFreezed = new State({
    _id: '6110c318fddf9edf50e9b32a',
    sign: 'FR',
    stateName: 'Freezed',
    sort: 4,
    isEnabled: true,
    createdBy: 'Ιορδανίδης Χρήστος',
    updatedBy: null,
    updatedAt: null
  });

  const stDone = new State({
    _id: '6110c318fddf9edf50e9b32b',
    sign: 'DN',
    stateName: 'Done',
    sort: 5,
    isEnabled: true,
    createdBy: 'Ιορδανίδης Χρήστος',
    updatedBy: null,
    updatedAt: null
  });

  stTodo.save();
  stInProgress.save();
  stTest.save();
  stFreezed.save();
  stDone.save();
};

const seedPriorities = () => {
  const prHigh = new Priority({
    _id: '6110c3196a6dcc343cb60369',
    sign: 'H',
    name: 'High',
    sort: 1,
    isEnabled: true,
    projects: [],
    tasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const prLow = new Priority({
    _id: '6110c3196a6dcc343cb6036a',
    sign: 'L',
    name: 'Low',
    sort: 2,
    isEnabled: true,
    projects: [],
    tasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  prHigh.save();
  prLow.save();
};

const seedComputeDurations = () => {
  const durHour = new ComputeDuration({
    _id: '61121d2e3cd3f7eeb6047e32',
    code: 'Hour(s)',
    description: 'Hour',
    factor: 1.0,
    isDefault: false,
    isEnabled: true,
    projects: [],
    subtasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });
  const durDay = new ComputeDuration({
    _id: '61121d2e3cd3f7eeb6047e33',
    code: 'Day(s)',
    description: 'Day',
    factor: 8.0,
    isDefault: false,
    isEnabled: true,
    projects: [],
    subtasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });
  const durWeek = new ComputeDuration({
    _id: '61121d2e3cd3f7eeb6047e34',
    code: 'Week(s)',
    description: 'Week',
    factor: 40.0,
    isDefault: false,
    isEnabled: true,
    projects: [],
    subtasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });
  const durMonth = new ComputeDuration({
    _id: '61121d2e3cd3f7eeb6047e35',
    code: 'Month(s)',
    description: 'Month',
    factor: 160.0,
    isDefault: false,
    isEnabled: true,
    projects: [],
    subtasks: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  durHour.save();
  durDay.save();
  durWeek.save();
  durMonth.save();
};

const seedDepartments = () => {
  const depIt = new Department({
    _id: '6110c31950089cf902ef096e',
    name: 'Πληροφορική',
    description: 'Interlife IT Department',
    isEnabled: true,
    users: [
      '6110c317a6c48b70cee33202',
      '6110c317a6c48b70cee33204',
      '6110c317a6c48b70cee33203'
    ],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depSales = new Department({
    _id: '6110c31950089cf902ef0971',
    name: 'Πωλήσεις',
    description: 'Interlife Τμήμα Πωλήσεων',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depProduction = new Department({
    _id: '6110c31950089cf902ef0975',
    name: 'Παραγωγή',
    description: 'Interlife Τμήμα Παραγωγής',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depClaims = new Department({
    _id: '6110c31950089cf902ef0973',
    name: 'Αποζημιώσεις',
    description: 'Interlife Τμήμα Αποζημιώσεων',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depMoneyService = new Department({
    _id: '6110c31950089cf902ef0974',
    name: 'Οικονομικές Υπηρεσίες',
    description: 'Interlife Τμήμα Αποζημιώσεων',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depMarketing = new Department({
    _id: '6110c31950089cf902ef0968',
    name: 'Marketing',
    description: 'Interlife Τμήμα Marketing',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depLawyer = new Department({
    _id: '6110c31950089cf902ef096a',
    name: 'Νομικό',
    description: 'Interlife Νομικό Τμήμα',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depManServices = new Department({
    _id: '6110c31950089cf902ef0970',
    name: 'Διοικ. Υπηρεσίες',
    description: 'Interlife Διοικ. Υπηρεσίες',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depHR = new Department({
    _id: '6110c31950089cf902ef0976',
    name: 'Ανθρώπινο Δυναμικό',
    description:
      'Interlife Τμήμα Ανθρώπινου Δυναμικού (HR)',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depControl = new Department({
    _id: '6110c31950089cf902ef0967',
    name: 'Διαχείριση',
    description: 'Interlife Τμήμα Διαχείρισης',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depCommand = new Department({
    _id: '6110c31950089cf902ef096f',
    name: 'Διοίκηση',
    description: 'Interlife Τμήμα Διοίκησης',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depAccounting = new Department({
    _id: '6110c31950089cf902ef0972',
    name: 'Λογιστήριο',
    description: 'Interlife Τμήμα Λογιστηρίου',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depThigatrikes = new Department({
    _id: '6110c31950089cf902ef0969',
    name: 'Θυγατρικές',
    description: 'Interlife Θυγατρικές',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depDeparment = new Department({
    _id: '6110c31950089cf902ef096b',
    name: 'Υποκαταστήματα',
    description: 'Interlife Υποκαταστήματα',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depInterbrokers = new Department({
    _id: '6110c31950089cf902ef096d',
    name: 'Interbrokers',
    description: 'Interbrokers',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const depGnomon = new Department({
    _id: '6110c31950089cf902ef096c',
    name: 'Gnomon Experts',
    description: 'Gnomon Experts',
    isEnabled: true,
    users: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  depIt.save();
  depSales.save();
  depProduction.save();
  depClaims.save();
  depMoneyService.save();
  depMarketing.save();
  depLawyer.save();
  depManServices.save();
  depHR.save();
  depControl.save();
  depCommand.save();
  depAccounting.save();
  depThigatrikes.save();
  depDeparment.save();
  depInterbrokers.save();
  depGnomon.save();
};

const seedUserRoles = () => {
  const admin = new UserRole({
    _id: '6110c31730dcb7396def5288',
    sign: 'A',
    role: 'Administrator',
    isEnabled: true,
    users: ['6110c317a6c48b70cee33202'],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  const user = new UserRole({
    _id: '6110c31730dcb7396def5286',
    sign: 'U',
    role: 'User',
    isEnabled: true,
    users: ['6110c317a6c48b70cee33203'],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  const guest = new UserRole({
    _id: '6110c31730dcb7396def5287',
    sign: 'G',
    role: 'Guest',
    isEnabled: true,
    users: ['6110c317a6c48b70cee33204'],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  admin.save();
  user.save();
  guest.save();
};

const seedUsers = () => {
  const adminUsr = new User({
    _id: '6110c317a6c48b70cee33202',
    username: 'admin',
    password: '123',
    email: 'admin@datacenter.com',
    title: 'Administrator',
    position: 'Προγραμματιστής',
    isEnabled: true,
    role: '6110c31730dcb7396def5288',
    department: '6110c31950089cf902ef096e',
    tasks: [
      '6110c31c9423eea0f5280e1d',
      '6110c31c9423eea0f5280e1c',
      '61139693c3d575ed33bf6698',
      '61139693c3d575ed33bf6658'
    ],
    comments: [
      '6110c31cfb1179b59ab22512',
      '6110c31cfb1179b59ab11512',
      '6110c31cfb3379b59ab22512',
      '6110c31cfb1179b59ab55512'
    ],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  const guestUsr = new User({
    _id: '6110c317a6c48b70cee33204',
    username: 'guest',
    password: '123',
    email: 'guest@datacenter.com',
    title: 'Guest',
    position: 'Προγραμματιστής',
    isEnabled: true,
    role: '6110c31730dcb7396def5287',
    department: '6110c31950089cf902ef096e',
    tasks: [],
    comments: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  const userUsr = new User({
    _id: '6110c317a6c48b70cee33203',
    username: 'user',
    password: '123',
    email: 'user@datacenter.com',
    title: 'User',
    position: 'Προγραμματιστής',
    isEnabled: true,
    role: '6110c31730dcb7396def5286',
    department: '6110c31950089cf902ef096e',
    tasks: [],
    comments: [],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  adminUsr.save();
  guestUsr.save();
  userUsr.save();
};

const seedComments = () => {
  const cmt1 = new Comment({
    _id: '6110c31cfb1179b59ab22512',
    description: 'Administrator left a comment.',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1d',
    user: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const cmt2 = new Comment({
    _id: '6110c31cfb1179b59ab11512',
    description: 'Administrator left a comment.',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1c',
    user: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const cmt3 = new Comment({
    _id: '6110c31cfb3379b59ab22512',
    description: 'Administrator left a comment.',
    isEnabled: true,
    task: '61139693c3d575ed33bf6698',
    user: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const cmt4 = new Comment({
    _id: '6110c31cfb1179b59ab55512',
    description: 'Administrator left a comment.',
    isEnabled: true,
    task: '61139693c3d575ed33bf6658',
    user: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  cmt1.save();
  cmt2.save();
  cmt3.save();
  cmt4.save();
};

const seedSubTasks = () => {
  const sbt1 = new SubTask({
    _id: '6110c31ded6c3612459ef2f0',
    subTaskName: 'SubTask 1 of Task 1',
    description: 'this is the first sub task from admin',
    startDate: '2021-08-15T19:24:39.4191775',
    startTime: '2021-08-15T19:24:39.4191775',
    duration: 10.0,
    computedDuration: 10.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1d',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const sbt2 = new SubTask({
    _id: '6110c31ded6c3612459ef2f1',
    subTaskName: 'SubTask 2 of Task 1',
    description: 'this is the second sub task from admin',
    startDate: '2021-08-17T19:24:39.4191775',
    startTime: '2021-08-17T19:24:39.4191775',
    duration: 10.0,
    computedDuration: 10.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1d',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const sbt3 = new SubTask({
    _id: '6110c31ded6c3612459ef5f1',
    subTaskName: 'SubTask 1 of Task 2',
    description: 'this is the first sub task from admin',
    startDate: '2021-08-27T19:24:39.4191775',
    startTime: '2021-08-27T19:24:39.4191775',
    duration: 20.0,
    computedDuration: 20.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1c',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const sbt4 = new SubTask({
    _id: '6110c31ded6c3612459ef2f5',
    subTaskName: 'SubTask 2 of Task 2',
    description: 'this is the second sub task from admin',
    startDate: '2021-08-30T19:24:39.4191775',
    startTime: '2021-08-30T19:24:39.4191775',
    duration: 25.0,
    computedDuration: 25.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '6110c31c9423eea0f5280e1c',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const sbt5 = new SubTask({
    _id: '6110c31ded6c3612459ef2e5',
    subTaskName: 'SubTask 1 of Task 3',
    description: 'this is the first sub task from admin',
    startDate: '2021-08-31T19:24:39.4191775',
    startTime: '2021-08-31T19:24:39.4191775',
    duration: 45.0,
    computedDuration: 45.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '61139693c3d575ed33bf6698',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  const sbt6 = new SubTask({
    _id: '6110c31ded6c3612459ec1e5',
    subTaskName: 'SubTask 1 of Task 4',
    description: 'this is the first sub task from admin',
    startDate: '2021-08-31T19:24:39.4191775',
    startTime: '2021-08-31T19:24:39.4191775',
    duration: 45.0,
    computedDuration: 45.0,
    durationUnitId: '61121d2e3cd3f7eeb6047e32',
    isEnabled: true,
    task: '61139693c3d575ed33bf6658',
    createdBy: '6110c317a6c48b70cee33202',
    updatedBy: null,
    updatedAt: null
  });

  sbt1.save();
  sbt2.save();
  sbt3.save();
  sbt4.save();
  sbt5.save();
  sbt6.save();
};

const seedTasks = () => {
  const task1 = new Task({
    _id: '6110c31c9423eea0f5280e1d',
    taskName: 'Task 1 for Test Project A',
    description: 'This is the first task.',
    startDate: '2021-08-10T19:24:39.2611093',
    duration: 50.0,
    isEnabled: true,
    priorityId: '60fd8e5bd15d4b1f6c4da779',
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    comments: ['6110c31cfb1179b59ab22512'],
    subtasks: [
      '6110c31ded6c3612459ef2f0',
      '6110c31ded6c3612459ef2f1'
    ],
    assignedTo: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const task2 = new Task({
    _id: '6110c31c9423eea0f5280e1c',
    taskName: 'Task 2 for Test Project A',
    description: 'This is the second task.',
    startDate: '2021-08-15T19:24:39.2611093',
    duration: 20.0,
    isEnabled: true,
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    comments: ['6110c31cfb1179b59ab11512'],
    subtasks: [
      '6110c31ded6c3612459ef2f1',
      '6110c31ded6c3612459ef2f5'
    ],
    assignedTo: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const task3 = new Task({
    _id: '61139693c3d575ed33bf6698',
    taskName: 'Task 3 for Test Project A',
    description: 'This is the third task.',
    startDate: '2021-08-22T19:24:39.2611093',
    duration: 20.0,
    isEnabled: true,
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    comments: ['6110c31cfb3379b59ab22512'],
    subtasks: ['6110c31ded6c3612459ef2e5'],
    assignedTo: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  const task4 = new Task({
    _id: '61139693c3d575ed33bf6658',
    taskName: 'Task 1 for Test Project B',
    description: 'This is the first task.',
    startDate: '2021-08-29T19:24:39.2611093',
    duration: 40.0,
    isEnabled: true,
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    comments: ['6110c31cfb1179b59ab55512'],
    subtasks: ['6110c31ded6c3612459ec1e5'],
    assignedTo: '6110c317a6c48b70cee33202',
    createdBy: '6110c317a6c48b70cee33202',
    updateBy: null,
    updatedAt: null
  });

  task1.save();
  task2.save();
  task3.save();
  task4.save();
};

const seedProjects = () => {
  const prj1 = new Project({
    _id: '6114206850c8e4f38ee1b96e',
    projectName: 'Test Project A',
    description: 'Seeded project A',
    duration: 15,
    computedDuration: 15,
    durationUnit: '61121d2e3cd3f7eeb6047e32',
    deadline: new Date('2021-08-31'),
    isEnabled: true,
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    tasks: [
      '6110c31c9423eea0f5280e1d',
      '6110c31c9423eea0f5280e1c',
      '61139693c3d575ed33bf6698'
    ],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  const prj2 = new Project({
    _id: '6114206850c8e4f38ee1b19b',
    projectName: 'Test Project B',
    description: 'Seeded project B',
    duration: 30,
    computedDuration: 30,
    durationUnit: '61121d2e3cd3f7eeb6047e32',
    deadline: new Date('2021-09-15'),
    isEnabled: true,
    state: '6110c318fddf9edf50e9b32c',
    priority: '6110c3196a6dcc343cb60369',
    tasks: ['61139693c3d575ed33bf6658'],
    createdBy: '6110c317a6c48b70cee33202',
    updatedAt: null,
    updatedBy: null
  });

  prj1.save();
  prj2.save();
};

module.exports = {
  dropCollections
};
