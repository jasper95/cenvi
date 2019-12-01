import React from 'react';
import CustomLineChart from 'shared/components/Charts/LineChart';
import CustomBarChart from 'shared/components/Charts/BarChart';
import Paper from 'react-md/lib/Papers/Paper';

function Dashboard() {
  return (
    <>
      <div className="row row-header dashboardHeader">
        <h1 className="dashboardHeader_title">
          Hi Sample User
        </h1>
      </div>
      <div className="row row-content">
        <Paper 
          className="col col-md-8-guttered col-form"
          style={{height: 500}}
        >
          <CustomLineChart />
        </Paper>
        <Paper 
          className="col col-md-4-guttered col-form"
          style={{height: 500}}
        >
          <CustomBarChart />
        </Paper>
      </div>
    </>
  );
}

export default Dashboard;
