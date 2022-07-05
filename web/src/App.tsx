import React from 'react';
import axios from 'axios';
import './App.css';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      repos: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/repos').then((res) => {
      this.setState({ repos: res.data });
    });
  }

  buttons = [
    {
      name: 'TypeScript',
      value: 'TypeScript'
    },
    {
      name: 'PHP',
      value: 'PHP'
    },
    {
      name: 'English',
      value: 'English'
    },
    {
      name: 'French',
      value: 'French'
    }
  ]

  filteredRepository(value: string){
    let repoLanguageSelect = value;
    axios.get('http://localhost:4000/repos')
    .then((res) => {
      this.setState({
        repos: res.data.filter((l: { language: string; }) => l.language == repoLanguageSelect)
      })
    })
  }

  public render() {
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
          {this.state.repos.map(
            (repo: {
              id: number;
              name: string;
              description: string;
              language: string;
              forks_count: number;
            }) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td>{repo.language}</td>
                <td>{repo.forks_count}</td>
              </tr>
            )
          )}
        </table>
        {this.buttons && 
          this.buttons.map((language, index) => (
            <>
              <button key={index} value={language.value} onClick={() => this.filteredRepository(language.value)} >
                {language.name}
              </button>
            </>
          ))
        }
      </div>
    );
  }
}
