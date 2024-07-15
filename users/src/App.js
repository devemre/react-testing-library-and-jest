import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
};

export default App;
