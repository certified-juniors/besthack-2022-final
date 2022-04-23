import React from 'react';
import {Button, Card, Container, Row} from "react-bootstrap";
import {useState} from "react";
import CurrencyList from "./CurrencyList";



const Currency = () =>
{
  const [myCurrency, setMyCards] = useState( [
    {
      title: 'Currency num.1',
      img : ' ',
      text: 'exchange rate 1',
    },
    {
      title: 'Currency num.2',
      img : ' ',
      text: 'exchange rate 2',
    },
    {
      title : 'Currency num.3',
      img : ' ',
      text: 'exchange rate 3',
    },
    {
      title : 'Currency num.4',
      img : ' ',
      text: 'exchange rate 4',
    },
    {
      title : 'Currency num.5',
      img : ' ',
      text: 'exchange rate 5',
    },
    {
      title : 'Currency num.6',
      img : ' ',
      text: 'exchange rate 6'
    }
  ])

  const currency_list = myCurrency.map( (card) =>

     <Card>
       <Card.Body>
         <Card.Title>{card.img}{card.title}</Card.Title>
         <Card.text>{card.text}</Card.text>
       </Card.Body>

     </Card>

  )



  return (
    <div>
      <CurrencyList myCurrency = {myCurrency}/>
    </div>
  )
}

export default Currency;
