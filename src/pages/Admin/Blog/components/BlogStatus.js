import React from 'react';

function BlogStatus(props) {
  const { row } = props;
  const { status } = row;
  return (
    <div className="status">{status}</div>
  );
}
export default BlogStatus;
