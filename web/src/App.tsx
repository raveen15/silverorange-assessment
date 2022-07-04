import React from 'react';

import './App.css';

export default class App extends React.Component<any, any>{
  
  render(): React.ReactNode {
    return (
      <div className="App">
        <h1>Repositories</h1>
        <table style={{ width: '100%' }}>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Fork Count</th>
          </tr>
        </table>
      </div>
    );
  }
}
