import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "sonner";
import { FaSave } from "react-icons/fa";

const ReservationFormModal = ({ show, handleClose, handleSave, editing, initialData }) => {
  const [reservation, setReservation] = useState({
    tanggal: "",
    tipe: "",
    biaya: "",
    tujuan: "",
  });

  useEffect(() => {
    if (editing) {
      setReservation(initialData);
    } else {
      setReservation({
        tanggal: "",
        tipe: "",
        biaya: "",
        tujuan: "",
      });
    }
  }, [editing, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSaveClick = () => {
    if (!reservation.tanggal || !reservation.tipe || !reservation.biaya || !reservation.tujuan) {
      toast.error("Semua form harus diisi!");
      return;
    }

    const roomName = reservation.tipe;

    handleSave(reservation);
    handleClose();

    if (editing) {
      toast.success(`Berhasil Update Data ${roomName}!`);
    } else {
      toast.success(`Berhasil Tambah Data ${roomName}!`);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered style={{ height: '90%', width: '90%', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

      <Modal.Header closeButton>
        <Modal.Title>{editing ? "Edit Reservasi" : "Buat Reservasi Baru"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTanggal">
            <Form.Label>Tanggal Pemesanan</Form.Label>
            <Form.Control type="date" placeholder="dd/mm/yyyy" name="tanggal" value={reservation.tanggal} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTipe">
            <Form.Label>Ruang Yang Dipesan</Form.Label>
            <Form.Select as="select" name="tipe" value={reservation.tipe} onChange={handleChange}>
              <option value="">Pilih Tipe</option>
              <option value="Ruang Rapat">Ruang Rapat</option>
              <option value="Ruang Seminar">Ruang Seminar</option>
              <option value="Ruang Diskusi">Ruang Diskusi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBiaya">
            <Form.Label>Biaya Pemesanan</Form.Label>
            <Form.Control type="text"  name="biaya" value={reservation.biaya} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTujuan">
            <Form.Label>Tujuan Penggunaan</Form.Label>
            <Form.Control as="textarea" rows={3} name="tujuan" value={reservation.tujuan} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
        <FaSave /> {editing ? "Simpan" : "Simpan"} 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationFormModal;
