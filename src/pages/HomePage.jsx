import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";

import imgHotel1 from "../assets/images/hotel1.jpg";
import imgHotel2 from "../assets/images/hotel2.jpg";
import imgHotel3 from "../assets/images/hotel3.jpg";
import imgFeaturette1 from "../assets/images/featurette-1.jpeg";
import imgFeaturette2 from "../assets/images/featurette-2.jpeg";

const images = [
  {
    img: imgHotel1,
    title: "First Slide Label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: imgHotel2,
    title: "Second Slide Label",
    description: "Lorem ipsum dolor sit amet, consectetur adipicsing elit.",
  },
  {
    img: imgHotel3,
    title: "Third Slide Label",
    description:
      "Prasent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
];

const HomePage = () => {
  return (
    <>
      <ImageCarousel images={images} />
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <h2 className="fw-normal">
              Hotel pertama dan satu-satunya <strong>yang fiksional</strong>
            </h2>
            <p className="lead">
              Diciptakan oleh <strong>Intan Setyo Ari Dewi</strong>,
              Mahasiswa Universitas Atma Jaya Yogyakarta dari program studi
              Informatika.
            </p>
            <p className="lead">
              Nomor Pokok Mahasiswa : <strong>210711129</strong>
            </p>
          </Col>
          <Col md={5}>
            <img
              src={imgFeaturette1}
              aria-label="Gambar Featurette 1"
              className="img-fluid mx-auto rounded shadow"
              role="img"
            />
          </Col>
        </Row>
        <hr className="mt-5 mb-5" />
        <Row>
          <Col md={7} className="order-md-2">
            <h2 className="fw-normal">
              Your comfort is key,
              <strong> experience of the Heartbeat of our Hotel</strong>
            </h2>
            <p className="lead">
              Our moder, sophisticated guest room are designed to exceed
              expectations with premium comfort, technology where you need it,
              and thoughtful attention to detail.
            </p>
          </Col>
          <Col md={5}>
            <img
              src={imgFeaturette2}
              aria-label="Gambar Featurette 2"
              className="img-fluid mx-auto rounded shadow"
              role="img"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
