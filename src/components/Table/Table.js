
  import React from 'react';
  import './table.css'
function Table({tracks}) {
 

    return (
      <div className="App">
        <table>
          <tr className='header-table'>
            <th>Tittle</th>
            <th>Artist</th>
            <th>Tags</th>
            <th>Duration</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
          {tracks.map((val, key) => {
            return (
              <tr key={key}>
                <td><img  className='logo' src={val.thumbnailImage} alt='img'/> <span  style={{marginLeft:'10px'}}>{val.title}</span></td>
                <td>{val.artist}</td>
                <td>{val.tags}</td>
                <td>{val.artist}</td>
                <td>{val.createdAt}</td>
                <td>{val.artist}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
    
  export default Table;