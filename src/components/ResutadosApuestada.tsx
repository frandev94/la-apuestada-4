import { type FormEvent, useState } from "react";
import { Badge, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { type UserVote, useVotesStore, type Vote } from "../store/votes";
import combats from "../assets/combats.json";
import { isEven } from "../util";

type Winner = string;

function ResutadosApuestada() {
  const votes = useVotesStore((s) => s.votes);
  const [matchWinners, setMatchWinners] = useState<Vote>();
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
        {combats.map(({ name, teams }) => (
          <CombatWinnerInputs key={name} name={name} teams={teams} />
        ))}
      </div>
      <Button type="submit">Ver Resultados de los apostadores</Button>
    </Form>
  );
}

function CombatWinnerInputs({
  name,
  teams,
}: {
  name: string;
  teams: { name: string }[];
}) {
  return (
    <>
      <Row sm={2} key={name} className="mb-3">
        <Col className="text-start fw-bold fs-5" xs={5} sm={4}>
          <div>{name.toLocaleUpperCase()}</div>
        </Col>
        <Col xs={7} sm={8}>
          <Form.Group as={Row} xs={1} sm={2} className="">
            {teams.map((team, idx) => (
              <Col key={team.name}>
                <Form.Check
                  name={name}
                  value={team.name}
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
  );
}

function UsersStadistics({
  matchWinners,
  userVotes,
}: {
  userVotes: UserVote[];
  matchWinners: Vote;
}) {
  return (
    <div>
      <h2 className="my-4">Estadisticas de los colegones</h2>
      <div>
        {userVotes.map(({ user, vote }) => (
          <UserStats
            key={user}
            name={user}
            vote={vote}
            winners={matchWinners}
          />
        ))}
      </div>
    </div>
  );
}
function UserStats({
  name,
  vote,
  winners,
}: {
  name: string;
  vote: Vote;
  winners: Vote;
}) {
  const points = calculatePoints(vote, winners);
  const winRate = (points * 100) / Object.keys(winners).length;
  return (
    <div key={name} className="mb-3">
      <h3 className="my-3 rainbow fw-bold">{name.toUpperCase()}</h3>
      <Row>
        <Col sm={12} className="text-start">
          <Row>
            {Object.entries(winners).map(([key, winner]) => (
              <Col
                sm={6}
                key={key}
                className="p-3 mb-3 text-center border border-2 border-primary"
              >
                <h6>{key.toUpperCase()}</h6>
                <div>
                  <span>Respuesta: </span>
                  <Badge bg={vote[key] === winner ? "success" : "danger"}>
                    {vote[key]}
                  </Badge>
                  <Badge bg="info">
                    {vote[key] === winner ? "+ 1" : "+ 0"}
                  </Badge>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className="mb-5">
          <div>POINTS: {points}</div>
          <div>
            <ProgressBar
              variant={
                winRate < 33 ? "danger" : winRate < 66 ? "warning" : "success"
              }
              now={winRate}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

function calculatePoints(vote: Vote, Winner: Vote): number {
  let points = 0;
  Object.entries(vote).forEach(([key]) => {
    points += vote[key] === Winner[key] ? 1 : 0;
  });
  return points;
}
