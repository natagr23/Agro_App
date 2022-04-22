import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PersonalInfoContext } from '../Context/ProductLocationContext';

export default function ProductCard(props) {
  const click_handler = (event) => {
    props.OnSelectProduct(props.id);
  };
  const fincas = useContext(PersonalInfoContext);
  return (
    <Card onClick={click_handler} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image_url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fincas.provider1.map((finca, index) => (
              <h3 key={index}>My name is {finca.name}</h3>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}