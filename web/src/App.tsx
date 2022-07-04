import React from 'react';
import axios from 'axios';
import './App.css';

export default class App extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      repos: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/repos')
    .then((res) => {
      this.setState({ repos: res.data });
    })
  }

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
          {this.state.repos.map((repo: {
            id: number;
            name: string;
            description: string;
            language: string;
            forks_count: number;
          }) => 
            <tr>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>{repo.language}</td>
              <td>{repo.forks_count}</td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}
