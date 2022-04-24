import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import config from "../config";
import axios from 'axios';
import { useState } from "react";


const Administration = () => {
    const [admin, setAdmin] = useState(false);
    const token = localStorage.getItem('token');
    if (token) {
        axios("http://" + config.host + "/isAdmin?token=" + token, {
            method: "POST",
        }).then(
            res => {
                if (res.data.message === "Пользователь администратор") {
                    setAdmin(true)
                } else {
                    window.location.href = '/';
                }
            }
        );
    } else {
        window.location.href = '/';
    }

    const handleUnblockUser = (e) => {
        e.preventDefault();
        axios("http://" + config.host + "/unblockUser?id=" + e.target.id + "&token=" + token, {
            method: "POST",
        }).then(
            res => {
                window.location.reload();
            }
        );
    }
    return <div>
        {!admin ? <h1>Пожалуйста, подождите</h1> :
            <div className="container">
                <div className = "vstack gap-2 col-md-5 mx-auto">
                    <div className="col-auto">
                        <h2>Администратор</h2>
                        <h4>Разблокировать пользователя</h4>
                        <Form onSubmit={handleUnblockUser}>
                            <Form.Control type="text" id="id" placeholder="Введите логин разблокируемого"/>
                            <Button style = {{marginTop: "10px"}} size="mg" variant="primary" type="submit">Разблокировать</ Button>
                        </Form>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default Administration;