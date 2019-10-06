import React, { useState } from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/dialog';
import 'sass/components/notification/index.scss';


function Notifications(props) {
  return (
    <div className="hellow">hello world</div>
  );
}


const Dialog = flowRight(
  withDialog(),
)(Notifications);

Dialog.defaultProps = {
  dialogActionsRenderer: () => null,
};

export default Dialog;
