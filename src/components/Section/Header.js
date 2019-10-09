import React from 'react';

function SectionHeader(props) {
  const {
    desc,
    header,
    headerLabel,
    position='center'
  } = props

  return (
    <div className={`section_headerRow row row-header row-${position}`}>
      { headerLabel && (
        <h5 className="section_headerLabel">
          {headerLabel}
        </h5>
      )}
      { header && (
        <h1 className="section_header">
          {header}
        </h1>
      )}
      { desc && (
        <p className="section_desc">
          {desc}
        </p>
      )}
    </div>
  )
}

export default SectionHeader;
