import React, { useState } from 'react';
import useQuery from 'apollo/query';
import Pagination from 'rc-pagination';
import flowRight from 'lodash/flowRight';
import withDialog from 'lib/hocs/dialog';
import gql from 'graphql-tag';
import cn from 'classnames';
import { format as formatTime } from 'timeago.js';
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
