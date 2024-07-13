import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";

import combats from "../assets/combats.json";
import { classNames } from "../util";
import { useVotesStore, type Vote } from "../store/votes";
import { type FormEvent, useState } from "react";

export default function FormularioApuestada() {
  const [error, setError] = useState<Error>();
  const addVote = useVotesStore((d) => d.addVote);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Array.from(new FormData(e.currentTarget));
    const userName = String(data[0][1]);
    const voteMatchArray = data.slice(1);
    try {
      console.log(userName, voteMatchArray);
      const vote: Vote = voteMatchArray.reduce<Vote>(
        (pre, [match, team]) => ({ ...pre, [match]: team as string }),
        {}
      );
      console.log(vote);
      addVote(userName, vote);
    } catch (error) {
      if (error instanceof Error) setError(error);
      else setError(new Error("Error desconocido"));
    }
    e.currentTarget.reset();
  };
  if (error) {
    return (
      <Alert variant="danger" dismissible onClose={() => setError(undefined)}>
        <Alert.Heading>Error</Alert.Heading>
        <div>{error.message}</div>
      </Alert>
    );
  }

  return (
    <Form className="my-5" onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3 text-start">
        <Form.Label className="fs-2 mb-3" column sm="6">
          Nombre de colegón:
        </Form.Label>
        <Col sm="6" className="mb-3">
          <Form.Control
            name="user"
            className="fs-2"
            placeholder="gonpardo"
            required
            minLength={4}
            maxLength={20}
          />
        </Col>
      </Form.Group>
      <section>
        <h2>Combates</h2>
        <Form.Group className="m-3 rounded">
          {combats.map((combat, combatIdx) => (
            <Combat key={combat.name} {...{ combatIdx, combat }} />
          ))}
        </Form.Group>
      </section>
      <Button className="w-100" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

type CombatProps = {
  combat: {
    name: string;
    teams: {
      name: string;
      photo?: string;
    }[];
    banner: string;
  };
};

function Combat({ combat }: CombatProps) {
  return (
    <Form.Group as={Row} className="mb-3 border-top border-1 border-primary">
      <Col sm="12" className="combat p-5">
        <Row className="justify-content-md-center p-3">
          <Image src={combat.banner} alt={combat.name} />
        </Row>
        <Row className="d-flex align-items-center">
          {combat.teams.map(
            (team, teamIdx) =>
              team.photo && (
                <Col key={`${teamIdx}-${team.name}`} xs={6}>
                  <Image
                    src={team.photo}
                    height={200}
                    alt={team.name}
                    style={{
                      maskImage: "linear-gradient(black 90%, transparent 100%)",
                    }}
                  />
                </Col>
              )
          )}
        </Row>
      </Col>
      <Col sm="12">
        {/*Flex y justify content pa centrar las votaciones*/}
        <Form.Group
          as={Row}
          style={{ maxWidth: "40em" }}
          className="m-3 d-flex justify-content-center flex-wrap mx-auto"
        >
          {combat.teams.map((team, teamIdx) => (
            <Col xs={6} md={6} key={teamIdx}>
              <TeamCheckBox
                {...{
                  combatName: combat.name,
                  team,
                  reverse: teamIdx % 2 !== 0,
                }}
              />
            </Col>
          ))}
        </Form.Group>
      </Col>
    </Form.Group>
  );
}

interface TeamCheckBoxProps {
  reverse: boolean;
  combatName: string;
  team: { name: string; photo?: string };
}

function TeamCheckBox({ combatName, team, reverse = true }: TeamCheckBoxProps) {
  return (
    <Form.Check
      className={classNames("text-center", "me-auto")}
      reverse={reverse}
      type="radio"
      name={combatName}
      label={team.name.toUpperCase()}
      value={team.name}
      required
    />
  );
}
