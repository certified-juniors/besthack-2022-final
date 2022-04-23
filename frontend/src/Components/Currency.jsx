import React from 'react';
import {Card} from "react-bootstrap";
import {useState} from "react";
import CurrencyList from "./CurrencyList";
import axios from "axios";

const myaxios = axios.create({
  baseURL: 'http://127.0.0.1:2001',
  method: "POST",
});

const Currency = () => {

  const [myCurrency, setMyCards] = useState([
    {
      title: 'Currency num.1',
      img: ' ',
      text: 'exchange rate 1',
    },
    {
      title: 'Currency num.2',
      img: ' ',
      text: 'exchange rate 2',
    },
    {
      title: 'Currency num.3',
      img: ' ',
      text: 'exchange rate 3',
    },
    {
      title: 'Currency num.4',
      img: ' ',
      text: 'exchange rate 4',
    },
    {
      title: 'Currency num.5',
      img: ' ',
      text: 'exchange rate 5',
    },
    {
      title: 'Currency num.6',
      img: ' ',
      text: 'exchange rate 6'
    }
  ])
  myaxios("last-exchange-rates", {method: "POST"}).then(
    res => {
      setMyCards(res.data);
    }
  )
  const currency_list = myCurrency.map((card) =>

    <Card>
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.text>{card.text}</Card.text>
      </Card.Body>

    </Card>
  )


  return (
    <div>
      <CurrencyList myCurrency={myCurrency}/>
    </div>
  )
}

export default Currency;
