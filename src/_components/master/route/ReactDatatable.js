import React, { Component } from "react";
import DataTable from "../../main/datatable/Datatable";

export default class ReactDataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = ['id', 'method', 'url', 'route', 'guard', 'type', 'middleware', 'permission'];
    return (
      <DataTable url="route/permissions" columns={columns} />
    );
  }
}