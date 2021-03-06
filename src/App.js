import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // Create
    const response = await api.post('repositories', {
      title: 'Frontend ReactJS',
      url: 'https://github.com/sellhat/',
      techs: ['ReactJS', 'NodeJS', 'React Native'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    
    //também pode ser feito da forma abaixo
    //setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // Delete
    await api.delete(`repositories/${id}`);

    const updatedRepository = repositories.filter(repo => repo.id !== id);

    setRepositories(updatedRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
