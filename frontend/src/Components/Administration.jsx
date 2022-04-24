import React from "react";
import { Button, Form, Table } from "react-bootstrap";

const Administration = () => {
    const [admin, setAdmin] = useState(false);
    const token = localStorage.getItem('token');
    if (token) {
        axios("http://" + config.host + "/isAdmin?token=" + token, {
            method: "POST",
        }).then(
            res => {
                if (res.data.message == "Пользователь администратор") {
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
        axios("http://" + config.host + "/unblockUser?id=" + id + "&token=" + token, {
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
                <h1>Администратор</h1>
                <h2>Разюлокировать пользователя</h2>
                <Form onSubmit={handleUnblockUser}>
                    <Form.Label text="Введите id пользователя" />
                    <Form.Control type="text" id="id" />
                    <Button size="lg" variant="primary" type="submit" />
                </Form>
            </div>
        }
    </div>
}

export default Administration;