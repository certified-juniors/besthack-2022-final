import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import {useState} from "react";
import CurrencyList from "./CurrencyList";
import axios from "axios";
import config from "../config";

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

  // setTimeout( () => {
  // myaxios("last-exchange-rates", {method: "POST"}).then(
  //   res => {
  //     setMyCards(res.data);
  //     console.log(res)
  //     // console.log(myCurrency)
  //   }
  // )}, 20000)

  // const currency_list = myCurrency.map((card) =>
  //
  //   <Card>
  //     <Card.Body>
  //       <Card.Title>{card.title}</Card.Title>
  //       <Card.text>{card.text}</Card.text>
  //     </Card.Body>
  //
  //   </Card>
  // )

  useEffect(() => {
    const url = 'http://' + config.host + '/last-exchange-rates';
    axios.post(url).then((resp) => {
      console.log(resp.data)
      resp.data.map(data  => (
        data.text = 1 / data.text,
          data.text = data.text.toFixed(4)
      )
    )

      setMyCards(resp.data)
    })
  }, [setMyCards])

  return (
    <div>
      <CurrencyList myCurrency={myCurrency}/>
    </div>
  )
}

export default Currency;
