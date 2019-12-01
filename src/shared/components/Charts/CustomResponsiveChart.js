import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ReactResizeDetector from 'react-resize-detector';
import cn from 'classnames';
import 'sass/components/charts/index.scss';

function CustomResponsiveChart(props) {
  const {
    type,
    children,
    chartClassName = ''
  } = props

  return (
    <div className={cn(`${chartClassName} customChart`,{
      [`customChart-${type}`] : type,
    })}>
      <ReactResizeDetector handleWidth handleHeight >
        {({ width, height }) => (
          <ResponsiveContainer width={width} height={height}>
            {children}
          </ResponsiveContainer>
        )}
      </ReactResizeDetector>
    </div>
	)
}

export default CustomResponsiveChart