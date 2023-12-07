
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import ReservationFormModal from "../components/ReservationFormModal";

import imgRuangRapat from "../assets/images/Ruang Rapat.jpeg";
import imgRuangDiskusi from "../assets/images/Ruang Diskusi.jpg";
import imgRuangSeminar from "../assets/images/Ruang Seminar.jpeg";
import { FaEdit, FaTrash, FaPlusSquare } from "react-icons/fa";

import { toast } from "sonner";


const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const handleShowModal = () => {
    setEditingReservation(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReservation(null);
  };

  const handleSaveReservation = (reservation) => {
    if (editingReservation) {
      const updatedReservations = reservations.map((r) => (r === editingReservation ? reservation : r));
      setReservations(updatedReservations);
    } else {
      setReservations([...reservations, reservation]);
    }
  };

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setShowModal(true);
  };

  const handleDeleteReservation = (reservation) => {
    const updatedReservations = reservations.filter((r) => r !== reservation);
    setReservations(updatedReservations);
    toast.success(`Berhasil Menghapus Data ${reservation.tipe}! `);
  };

  const getRoomImage = (roomType) => {
    switch (roomType) {
      case "Ruang Rapat":
        return imgRuangRapat;
      case "Ruang Diskusi":
        return imgRuangDiskusi;
      case "Ruang Seminar":
        return imgRuangSeminar;
      default:
        return null;
    }
  };

  const CreateModal = () => (
    <ReservationFormModal
      show={showModal}
      handleClose={handleCloseModal}
      handleSave={handleSaveReservation}
      editing={false}
      initialData={null}
    />
  );

  const EditModal = () => (
    <ReservationFormModal
      show={showModal}
      handleClose={handleCloseModal}
      handleSave={handleSaveReservation}
      editing={!!editingReservation}
      initialData={editingReservation || null}
    />
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
      <Row className="mb-4">
        <Col md={10}>
          <Card className="h-100 justify-content-center">
            <Card.Body>
              <h4>Selamat Datang,</h4>
              <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
              <p className="mb-0">Kamu sudah login sejak</p>
              <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="h-100 justify-content-center">
            <Card.Body>
                <p>Bukti Sedang ngantor: </p>
                <img src="https://via.placeholder.com/150" alt="Tidak Ada Gambar" className="img-fluid rounded" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h1 className="mb-3 border-bottom fw-bold">Daftar Reservasi Ruangan</h1>
      <p>Saat ini terdapat <strong>{reservations.length}</strong> Reservasi yang akan datang</p>

      <Button variant="success" onClick={handleShowModal} className="d-flex align-items-center">
        <FaPlusSquare className="me-2" /> Tambah Ruangan
      </Button>

      <Row className="mt-3">
        <Col md={12}>
          <Card.Body>
            {reservations.map((reservation, index) => (
              <Card key={index} className="mt-3">
                <Row>
                <Col md={4} className="d-flex align-items-center">
                  <Card.Img
                    variant="top"
                    src={getRoomImage(reservation.tipe)}
                    alt={`Gambar ${reservation.tipe}`}
                    style={{ borderRadius: '10px', maxHeight: '200px', objectFit: 'cover', marginLeft: '15px' }}
                  />
                </Col>
                
                  <Col md={8}>
                    <Card.Body>
                      <h4>{reservation.tipe}</h4>
                      <p className="Large mb-1" >Untuk Keperluan:</p>
                      <p className="small mb-0"> {reservation.tujuan}</p>
                      <hr />
                      <p className="Large mb-3" > Tanggal Penggunaan: <strong>{reservation.tanggal}</strong>  ·  Harga: <strong>{reservation.biaya}</strong>
                      </p>
                       
                      <Button variant="danger" onClick={() => handleDeleteReservation(reservation)} className="me-2">
                        <FaTrash className="me-2" /> Hapus Ruangan
                      </Button>
                      <Button variant="primary" onClick={() => handleEditReservation(reservation)}>
                        <FaEdit className="me-2" /> Edit Ruangan
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card.Body>
        </Col>
      </Row>

      {editingReservation ? <EditModal /> : <CreateModal />}
    </Container>
  );
};

export default DashboardPage;
