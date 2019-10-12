import React, { useEffect } from 'react';
import SectionHeader from 'shared/components/Section';
import teamMembers from 'shared/constants/team';
import MemberCard from './components/MemberCard';

function TeamPage(props) {
  return (
    <section>
      <SectionHeader
        withContainer
        headerLabel="TEAM"
        header="Get to know the CENVI Team"
      />
      <div className="container">
        <div className="row">
          {teamMembers.map(member => (
            <div className="col col-md-3">
              <MemberCard {...member}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
