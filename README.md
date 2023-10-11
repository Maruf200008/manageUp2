# some features

### User authentication and registration functionalities

### Users should be able to signup, login, and log out.

### Allow users to create tasks with a title, description, due date, and priority level.

### Allow users to Edit tasks with a title, description, due date, and priority level.

### Allow users to delete tasks.

### - Implement a way to mark tasks as completed or in progress.

### - End Deadliner Feature

#### Add filtering by status

##### N.B : In this application I used json server as server. And used redux rtk query to manage state. As we know json server generate id for us automatically. But here, since I have updated the optimistic cache using redux rtk query, even if the task is created, it does not get the ID immediately due to updating the cache. Due to which, if a new task is added, the page needs to be reloaded if it needs to be edited or deleted.

##### Live Link : https://bucolic-tapioca-5d2eaa.netlify.app
