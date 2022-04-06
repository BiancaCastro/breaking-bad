import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
//@ts-ignore next-line
import { getUniqueCharacter, getRandomQuote } from "../../services/index.ts";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const Detail = () => {
  interface ICharacterDetail {
    name: string;
    img: string;
    portrayed: string;
    nickname: string;
    occupation: Array<string>;
    birthday: string;
  }
  const { t } = useTranslation();
  const [detail, setDetail] = useState<ICharacterDetail>();
  const [nameCharacter, setNameCharacter] = useState("");
  const [quote, setQuote] = useState();
  const [loading, setIsloading] = useState(true);
  const [errorDetail, setErrorDetail] = useState("");
  const [errorQuote, setErrorQuote] = useState("");
  const { char_id } = useParams();
  const errorQuoteText =
    "Opps! I don't have a quote or I am having problems to retrieve it";
  const fetchQuote = async () => {
    const formattedName = nameCharacter.replace(" ", "+");
    try {
      const response = await getRandomQuote(formattedName).then((res) =>
        res.json()
      );
      setQuote(response[0].quote);
    } catch (err) {
      setErrorQuote(errorQuoteText);
    }
  };

  useEffect(() => {
    if (nameCharacter) {
      fetchQuote();
    }
  }, [nameCharacter]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getUniqueCharacter(char_id).then((res) =>
          res.json()
        );
        setDetail(response[0]);
        setNameCharacter(response[0].name);
      } catch (err) {
        setErrorDetail("Something has happening, let us check again");
      } finally {
        setIsloading(false);
      }
    };
    fetchDetail();
  }, [char_id]);
  if (loading) {
    return (
      <Spinner
        data-testid="spinner"
        animation="border"
        style={{ display: "block", margin: "20% auto" }}
      />
    );
  }
  return (
    <>
      {detail && (
        <Card style={{ width: "18rem", margin: "0 auto" }}>
          <Card.Body>
            {" "}
            <Card.Img
              variant="top"
              style={{ maxWidth: "60px" }}
              src={detail.img}
            />
            <Card.Title>
              {detail.portrayed} {t("as")}{" "}
              <Card.Text style={{ color: "#ff9627" }}>{detail?.name}</Card.Text>
            </Card.Title>
            <Card.Text>
              {t("aka")} {detail.nickname}
            </Card.Text>
            <Card.Text>
              {t("birthday")} {detail.birthday}
            </Card.Text>
            <Card.Text>
              {t("occupation")}{" "}
              {detail?.occupation?.map((occupation) => (
                <Card.Text>{occupation} </Card.Text>
              ))}
            </Card.Text>
            <Button disabled={!quote} variant="primary" onClick={fetchQuote}>
              {t("random_quote")}
            </Button>
            {quote ? (
              <blockquote className="blockquote mb-0">
                <p>
                  <i>{quote}</i>
                </p>
              </blockquote>
            ) : (
              errorQuoteText || errorQuote
            )}
          </Card.Body>{" "}
        </Card>
      )}
      {errorDetail && errorDetail}
    </>
  );
};
export default Detail;
