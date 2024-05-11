const invoiceModel = require("./../models/invoice");

exports.createInvoice = async (req, res) => {
    try {
        const invoices = await new invoiceModel(req.body).save();
        res.status(201).json(invoices);
    } catch (err) {
        res.status(400).json({ err });
    }
}

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceModel.find();
        res.json(invoices)
    } catch (err) {
        res.json()
    }
}

exports.getInvoice = async (req, res) => {
    try {
        const invoices = await invoiceModel.find({ id: req.params.id });
        res.json(invoices);
    } catch (err) {
        res.json({ err });
    }
}

exports.deleteInvoice = (req, res) => {
    invoiceModel.findOneAndDelete({ id: req.params.id }, (err, data) => {
        if (err) {
            res.json({ err });
        } else {
            res.json(data);
        }
    });
}

exports.updateInvoice = (req, res) => {
    invoiceModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            res.json({ err })
        } else {
            res.json(data);
        }
    })
}