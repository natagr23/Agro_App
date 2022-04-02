import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
// import SearchBar from './components/SearchBar/SearchBar';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import SearchIcon from '@mui/icons-material/Search';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';

export default function Api() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=food'
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
        pb: 1,
      }}
    >
      <Input
        placeholder="buscar"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        inputProps={{
          'aria-label': 'weight',
        }}
      />

      <Button
        sx={{ margin: 2 }}
        variant="contained"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </Button>

      <List>
        {data.hits.map((item) => (
          <ListItem key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
