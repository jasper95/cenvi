import React from 'react';
import CustomLineChart from 'shared/components/Charts/LineChart';

function Dashboard() {

  return (
    <div>
      <h1>DASHBOARD !</h1>
      <div style={{width: '70%', height: 500 }}>
        <CustomLineChart />
      </div>
    </div>
  );
}

export default Dashboard;
