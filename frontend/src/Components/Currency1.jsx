import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import {useState} from "react";
import CurrencyList from "./CurrencyList";
import axios from "axios";
import config from "../config";

import China from '../flags/China.jpg'
import EU from '../flags/EU.jpg'
import GB from '../flags/GB.jpg'
import Rus from '../flags/Rus.jpg'
import Switzerland from '../flags/Switzerland.jpg'
import US from '../flags/US.jpg'
import Vladimir20 from "../Vladimir20.svg";
import CurrencyList1 from "./CurrencyList1";





const Currency1 = () => {

  const [myCurrency, setMyCards] = useState([
    {


      title: 'Currency num.1',
      img: Rus,
      text: 'exchange rate 1',
    },
    {
      title: 'Currency num.2',
      img: US,
      text: 'exchange rate 2',
    },
    {
      title: 'Currency num.3',
      img: EU,
      text: 'exchange rate 3',
    },
    {
      title: 'Currency num.4',
      img: China,
      text: 'exchange rate 4',
    },
    {
      title: 'Currency num.5',
      img: Switzerland,
      text: 'exchange rate 5',
    },
    {
      title: 'Currency num.6',
      img: GB,
      text: 'exchange rate 6'
    }
  ])

  useEffect(() => {
    const url = 'http://' + config.host + '/last-exchange-rates';
    axios.post(url).then((resp) => {

      resp.data.map((data, i)  => {
          data.text = 1 / data.text
          data.text = data.text.toFixed(4)
          data.img = myCurrency[i].img
        }
      )

      setMyCards(resp.data)
    })
  }, [setMyCards])

  useEffect(() => {
    const url = 'http://' + config.host + '/last-exchange-rates';
    axios.post(url).then((resp) => {

      resp.data.map((data, i)  => {
        data.text = 1 / data.text
        data.text = data.text.toFixed(4)
        data.img = myCurrency[i].img
      }
    )
      setTimeout(() => setMyCards({...resp.data, }), 600000);

    })
  }, [setMyCards])

  return (
    <div>
      <CurrencyList1 myCurrency={myCurrency}/>
    </div>
  )
}

export default Currency1;
