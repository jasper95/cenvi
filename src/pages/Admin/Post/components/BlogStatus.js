import React from 'react';

function BlogStatus(props) {
  const { row } = props;
  const { status } = row;
  return (
    <div className={`statusPill statusPill-${status}`}>{status}</div>
  );
}
export default BlogStatus;
