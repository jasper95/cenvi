import React, { useEffect } from 'react';
import SubProjects from 'components/SubProjects/SubProjects';


function SubProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const projects = [
    {
      header: 'Mango monitoring using microcontroller-based sensor systems',
      img: {
        src:'static/img/sub-projects/mango.png',
        alt: 'mango'
      },
      objectives: [
        `Develop affordable microcontroller-based sensor systems 
        (pole/UAV) for high-throughput monitoring and 
        early warning against infestation and disease 
        in mango tree plantations in Bohol, 
        Bantayan, Siquijor, and Guimaras.`,
        `Develop a spectral signature database of
        mango plant diseases and infestation.`,
        `Spatial distribution map and analyses of
        mango pests and diseases in Cebu.`
      ]
    },
    {
      header: 'Cebu biodiversity spatial information study',
      img: {
        src:'static/img/sub-projects/tree.png',
        alt: 'tree'
      },
      objectives: [
        `Inventory the native trees including the
        centennial mango trees in Cebu Island.`,
        `Assess the environmental risk profiles
        of the native trees including the
        centennial mango trees in Cebu Island.`,
        `Propose measures for the protection and
        conservation of native trees and
        centennial mango trees.`
      ]
    },
    {
      header: 'Cebu water source mapping and assessment',
      img: {
        src:'static/img/sub-projects/droplet.png',
        alt: 'droplet'
      },
      objectives: [
        `Generate maps of potential water sources in Cebu.`,
        `Characterize discharge/recharge profile of major river basins.`
      ]
    },
  ]

  return (
    <section className="section">
      <div className="row row-header row-center">
        <div className="container">
          <h1 className="header-1">
            SUB-PROJECTS
          </h1>
          <p id="description">
            The field of environmental informatics uses analytical
            and ICT-based methods to monitor, assess, and protect
            natural resources. UP Cebu's Center for Environmental
            Informatic intends to contribute in strengthening the
            leadership of Central Visayas in the ICT industry,
            particularly in the emerging fields of data science,
            remote sensing, and artificial intelligence by
            contributing to environmental conservation, research,
            and development. Under CENVI are these sub-projects:
          </p>
        </div>
      </div>
      <div className="row row-content">
        <div className="container">
          {projects.map((item) => (
            <div className="row project">
              <h1 className="project_header">{item.header}</h1>
              <div className="project_content row">
                <div className="project_content_img col col-md-2">
                  <img { ...item.img }/>
                </div>
                <div className="project_content_info col col-md-10">
                  <h1 className="project_content_label">Project Objectives:</h1>
                  <ul className="project_content_list">
                    {item.objectives.map( obj => (
                      <li className="project_content_list_item">
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default SubProjectsPage;
