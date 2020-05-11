import React from 'react';
import 'sass/components/cards/memberCard/index.scss';

function MemberCard(props) {
  const {
    id, image,
    links, name, role,
  } = props;
  const BCP = 'memberCard';

  return (
    <div className={BCP} key={id}>
      <div className={`${BCP}_media`}>
        { links.length != 0 && (
          <div className={`${BCP}_media_action`}>
            <Button
              icon
              primary
              className={`${BCP}_link`}
              children="insert_link"
            />
          </div>
        )}
        <img
          className={`${BCP}_media_img`}
          src={image}
          alt={name}
        />
      </div>
      <div className={`${BCP}_info`}>
        <h1 className={`${BCP}_info_name`}>
          {name}
        </h1>
        <p className={`${BCP}_info_role`}>
          {role}
        </p>
      </div>
    </div>
  );
}


export default MemberCard;
