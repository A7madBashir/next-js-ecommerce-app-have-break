"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";

export default function paymentModal({
  close,
  open = false,
  totalAmount,
}: {
  close: () => void;
  open: boolean;
  totalAmount: string;
}) {
  async function submitOrder() {
    // send pay request and close modal
    document.location.href = "/cart?success=1"
    close();
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className=""
      
    >
      <Box sx={{ ...style, width: 400 }}>
        <Card className="">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <p className="mb-0">Total Amount: ${totalAmount}</p>
            </Typography>
          </CardContent>

          <CardContent>
            <form className="" onSubmit={submitOrder}>
              <p className="mb-4">Your payment details</p>
              <div className="mb-3">
                <TextField
                  id="cardNumber"
                  type="text"
                  label="Card Number"
                  name="cardNum"
                  required
                  variant="outlined"
                  placeholder="1234 5678 1234 5678"
                  className="mb-3"
                />
              </div>
              <div className="mb-3">
                <TextField
                  id="expire"
                  type="password"
                  name="expire"
                  required
                  label="Expire"
                  variant="outlined"
                  placeholder="MM/YYYY"
                  className="mb-3"
                />
              </div>
              <div className="mb-3">
                <TextField
                  id="cvv"
                  type="password"
                  label="CVV"
                  variant="outlined"
                  name="cvv"
                  required
                  placeholder="CVV"
                  className="mb-3"
                />
              </div>
              <div className="my-2 mx-auto text-center">
                <Button type="submit" variant="outlined" color="info">
                  Order now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
