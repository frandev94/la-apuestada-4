import { type FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { type UserVote, useVotesStore } from "../store/votes";
import combats from "../assets/combats.json";
import { isEven } from "../util";

type Winner = string;

interface IWinners {
  [combat: string]: Winner;
}

function ResutadosApuestada() {
  const votes = useVotesStore((s) => s.votes);
  const [matchWinners, setMatchWinners] = useState<IWinners>();
  const setWinner = (match: string, winner: string) => {
    if (!combats.some((c) => c.name === match)) {
      throw new Error(`No existe la apuesta ${match}`);
    }
    setMatchWinners((s) => ({ ...s, [match]: winner }));
  };

  return (
    <div>
      {!matchWinners ? (
        <MatchWinners {...{ setWinner }} />
      ) : (
        <UsersStadistics matchWinners={matchWinners} userVotes={votes} />
      )}
    </div>
  );
}

export default ResutadosApuestada;

function MatchWinners({
  setWinner,
}: {
  setWinner: (match: string, winner: string) => void;
}) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    for (const [match, winner] of data.entries()) {
      setWinner(match as string, winner as Winner);
    }
  };

  return (
    <Form className="my-4" onSubmit={onSubmit}>
      <h2 className="my-4">Ganadores de los combates</h2>
      <div className="px-2">
        {combats.map((combat) => (
          <>
            <Row sm={2} key={combat.name} className="mb-3">
              <Col className="text-start fw-bold fs-5" xs={5} sm={4}>
                <div>{combat.name.toLocaleUpperCase()}</div>
              </Col>
              <Col xs={7} sm={8}>
                <Form.Group as={Row} xs={1} sm={2} className="">
                  {combat.teams.map((team, idx) => (
                    <Col key={team.name}>
                      <Form.Check
                        name={combat.name}
                        required
                        className={isEven(idx) ? "text-end" : "text-start"}
                        type="radio"
                        label={team.name.toUpperCase()}
                        reverse={isEven(idx)}
                      />
                    </Col>
                  ))}
                </Form.Group>
              </Col>
            </Row>
            <hr />
          </>
        ))}
      </div>
      <Button type="submit">Ver Resultados de los apostadores</Button>
    </Form>
  );
}

function UsersStadistics({
  matchWinners,
  userVotes,
}: {
  userVotes: UserVote[];
  matchWinners: IWinners;
}) {
  return (
    <>
      <h2 className="my-4">Estadisticas de los colegones</h2>
      <div>
        {JSON.stringify(matchWinners)}
        <br />
        {JSON.stringify(userVotes)}
      </div>
      {userVotes.map((userVote) => (
        <div key={userVote.user}>
          <div>{userVote.user}</div>
          <div>{JSON.stringify(userVote.vote)}</div>
        </div>
      ))}
    </>
  );
}
