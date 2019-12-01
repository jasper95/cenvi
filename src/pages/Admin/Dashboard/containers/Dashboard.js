import React from 'react';
import CustomLineChart from 'shared/components/Charts/LineChart';
import CustomBarChart from 'shared/components/Charts/BarChart';
import CustomAreaChart from 'shared/components/Charts/AreaChart';
import OneLevelPieChart from 'shared/components/Charts/OneLevelPieChart';
import Paper from 'react-md/lib/Papers/Paper';

function Dashboard() {
  return (
    <>
      <div className="row row-header dashboardHeader">
        <h1 className="dashboardHeader_title">
          Hi Sample User
        </h1>
      </div>
      <div className="row row-pies">
        <Paper 
          className="col col-md-4-guttered col-form"
          style={{height: 400}}
        >
          <OneLevelPieChart />
        </Paper>
        <Paper 
          className="col col-md-4-guttered col-form"
          style={{height: 400}}
        >
          <OneLevelPieChart />
        </Paper>
        <Paper 
          className="col col-md-4-guttered col-form"
          style={{height: 400}}
        >
          <OneLevelPieChart />
        </Paper>
      </div>
      <div className="row row-content">
        <Paper 
          className="col col-md-8-guttered col-form"
          style={{height: 250}}
        >
          <CustomLineChart />
        </Paper>
        <Paper 
          className="col col-md-4-guttered col-form"
          style={{height: 250}}
        >
          <CustomBarChart />
        </Paper>
      </div>

      <div className="row row-content-2">
        <Paper 
          className="col col-md-12-guttered col-form"
          style={{height: 500}}
        >
          <CustomAreaChart />
        </Paper>
      </div>
    </>
  );
}

export default Dashboard;
