import React, { Component } from "react";
import DataTable from "../../main/datatable/Datatable";

class UsersTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = ['username', 'name', 'last_name', 'e-mail', 'status', 'action'];
    return (
      <DataTable url="usersmanagement/userscontrols/datatables" columns={columns} />
    );
  }
}

export default UsersTable;