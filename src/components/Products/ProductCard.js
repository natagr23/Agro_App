import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import { PersonalInfoContext } from '../../Context/ProductLocationContext';

// import { ShopContext } from '../../Context/ShopContext';

export default function ProductCard(props) {
  // const click_handler = (event) => {
  //   props.OnSelectProduct(props.id);
  // };

  // const fincas = useContext(PersonalInfoContext);
  // const ctx = useContext(ShopContext);
  return (
    <Card
      // onClick={click_handler}
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // image={props.image_url}
          image="https://source.unsplash.com/1600x900/?vegetable"
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
            {props.place}
          </Typography>
          {/* {ctx.products.map((finca, index) => (
            <Typography
              key={index}
              id={finca.id}
              variant="body2"
              color="text.secondary"
            >
              <strong>Nombre {finca.name}</strong>
            </Typography>
          ))} */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
