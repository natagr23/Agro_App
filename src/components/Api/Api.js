import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
// import SearchBar from './components/SearchBar/SearchBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function Api() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('food');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux'
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      setData(result.data);
    };

    fetchData();
  }, [url]);

  return (
    <Box
      sx={{
        p: 9,
        pb: 0,
      }}
    >
      <Input
        // placeholder='buscar'
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <Button
        variant="outlined"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </Button>

      <List>
        {data.hits.map((item) => (
          <ListItem disablePadding key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
