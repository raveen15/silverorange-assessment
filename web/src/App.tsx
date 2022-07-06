import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      repos: [],
      selectedRepo: [],
      readme: '',
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
      value: 'TypeScript',
    },
    {
      name: 'PHP',
      value: 'PHP',
    },
    {
      name: 'English',
      value: 'English',
    },
    {
      name: 'French',
      value: 'French',
    },
  ];

  filteredRepository(value: string) {
    const repoLanguageSelect = value;
    axios.get('http://localhost:4000/repos').then((res) => {
      this.setState({
        repos: res.data.filter(
          (l: { language: string }) => l.language === repoLanguageSelect
        ),
      });
    });
  }

  repositoryInfo(value: any) {
    this.setState({selectedRepo: value});
    let readmePath = `https://raw.githubusercontent.com/${this.state.selectedRepo.full_name}/master/README.md`;
    fetch(readmePath)
    .then((res) => {
      return res.text()
    })
    .then(text => {
      this.setState({ readme: text})
    })
  }

  public render() {
    const { readme } = this.state;
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
          {this.state.repos.sort((a: any, b: any) => b.created_at > a.created_at ? 1 : -1)
          .map(
            (repo: {
              id: number;
              name: string;
              description: string;
              language: string;
              forks_count: number;
            }) => (
              <tr key={repo.id} onClick={() => this.repositoryInfo(repo)} >
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
              <button
                key={index}
                value={language.value}
                onClick={() => this.filteredRepository(language.value)}
              >
                {language.name}
              </button>
            </>
          ))}
          <h2>Selected Repo</h2>
          <p>Recent commit date: {this.state.selectedRepo.updated_at}</p>
          <p>Author: {this.state.selectedRepo.updated_at}</p>
          <p>Message: {this.state.selectedRepo.updated_at}</p>
          <ReactMarkdown>{this.state.readme}</ReactMarkdown>
      </div>
    );
  }
}
