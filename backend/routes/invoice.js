const express = require("express");
const invoice = require("../controllers/invoice");
const router = express.Router();

router.post("/", invoice.createInvoice);

router.get("/", invoice.getAllInvoices);

router.get("/:id", invoice.getInvoice);

router.delete("/:id", invoice.deleteInvoice);

router.put("/:id", invoice.updateInvoice);

module.exports = router;