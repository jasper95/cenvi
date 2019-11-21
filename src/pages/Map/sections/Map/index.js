import React  from 'react';
import { default as Map } from '../../components/Map'; 
import './style.scss';

export default function MapSection() {
  return (
    <section className="section-map section">
      <div className="col-sidebar">
      </div>
      <div className="col-map">
        <Map />
      </div>           
    </section>
  )
}

