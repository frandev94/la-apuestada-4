import { useState } from "react";
import { Col, Form, Row, Image, Button } from "react-bootstrap";

import combats from "../assets/combats.json";

export default function FormularioApuestada() {
  return (
    <Form className="m-5">
        <h2>Apuestador</h2>
      <Form.Group as={Row} className="my-3 ">
        <Form.Label column sm="2">
          Nombre
        </Form.Label>
        <Col sm="10">
          <Form.Control defaultValue="gonpardo" />
        </Col>
      </Form.Group>
      <h2>Combates</h2>
      
      {combats.map((combat, combatIdx) => (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column className="fs-3" sm="5">
            <Image src={combat.banner} alt={combat.name} width={200} />
          </Form.Label>
          <Col>
            <Form.Group className="mt-3">
              {combat.teams.map((team, teamIdx) => (
                <Form.Check required
                  type="radio"
                  name={"combat-" + combatIdx}
                  label={team.join(" & ").toLocaleUpperCase()}
                  value={teamIdx}
                />
              ))}
            </Form.Group>
          </Col>
          <hr className="my-3" />
        </Form.Group>
      ))}
      <Button className='w-100' type="submit">Enviar</Button>
    </Form>
  );
}
