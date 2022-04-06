import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//@ts-ignore next-line
import { getCharacterList } from "../../services/index.ts";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const CharacterList = () => {
  const { t } = useTranslation();
  const [characterList, setCharacterList] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [error, setError] = useState("");
  const getList = async () => {
    try {
      const response = await getCharacterList().then((res) => res.json());
      setCharacterList(response);
    } catch (err) {
      setError("Something has happening, let us check again");
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      {" "}
      <span>{t("title")}</span>
      {loading ? (
        <Spinner
          data-testid="spinner"
          animation="border"
          style={{ display: "block", margin: "20% auto" }}
        />
      ) : (
        <Row xs={1} md={4} className="g-4">
          {characterList.map((character, index) => (
            <Col key={index}>
              {" "}
              <Card
                key={character.char_id}
                style={{
                  width: "200px",
                  minHeight: "250px",
                  textAlign: "center",
                }}
              >
                <Card.Header as="h5">{character.name}</Card.Header>
                <Link
                  style={{ textDecoration: "none" }}
                  key={character.char_id}
                  to={`/detail/${character.char_id}`}
                >
                  <Card.Img
                    variant="top"
                    style={{
                      maxWidth: "60px",
                      margin: "0 auto",
                      display: "block",
                    }}
                    src={character?.img}
                  />
                  <Card.Text>
                    {t("status")} {character.status}
                  </Card.Text>
                  <Card.Text>{t("category")}</Card.Text>
                  <Card.Text>{character.category}</Card.Text>
                </Link>{" "}
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {error && (
        <span style={{ display: "block", marginTop: "20px" }}>{error}</span>
      )}
    </>
  );
};

export default CharacterList;
