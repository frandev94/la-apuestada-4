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
        <Form.Group as={Row} className="mb-3" key={combatIdx}>
          <Col sm="12">
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              {/*Imagenes de los combatientes*/}
              <Image src={combat.photos[0]} alt={combat.teams[0].join(" & ")} width={100} className="m-2" />
              <Image src={combat.banner} alt={combat.name} width={200} className="m-2" />
              <Image src={combat.photos[1]} alt={combat.teams[1].join(" & ")} width={100} className="m-2" />
            </div>
          </Col>
          <Col sm="12">
            {/*Flex y justify content pa centrar las votaciones*/}
            <Form.Group className="mt-3 px-3 d-flex justify-content-center align-items-center flex-wrap">
              {combat.teams.map((team, teamIdx) => (
                <Form.Check
                  key={teamIdx}
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
      <Button className="w-100" type="submit">
        Enviar
      </Button>
    </Form>
  );
}