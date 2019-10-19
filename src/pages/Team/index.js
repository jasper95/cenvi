import React, { useEffect } from 'react';
import SectionHeader from 'shared/components/Section';
import teamMembers from 'shared/constants/team';
import MemberCard from './components/MemberCard';

function TeamPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <section class="teamSection section">
      <SectionHeader
        withContainer
        headerLabel="TEAM"
        header="Meet the Team"
      />
      <div className="container">
        <div className="row">
          {teamMembers.map(member => (
            <div className="col col-lg-3 col-md-4 col-sm-6">
              <MemberCard {...member}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
