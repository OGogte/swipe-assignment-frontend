import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function BulkEditModal(props) {
    const navigate = useNavigate()
    const checkedInvoiceList = props.invoiceList.map((invoice) => {
        return { ...invoice, checked: false };
    })
    const [selectedInvoices, setSelectedInvoices] = useState(checkedInvoiceList);
    const [isMasterChecked, setIsMasterChecked] = useState(false);
    useEffect(() => {
        const allChecked = selectedInvoices.every((invoice) => invoice.checked);
        setIsMasterChecked(allChecked);
    }, [selectedInvoices]);
    const handleCheckboxMaster = (checked) => {
        setIsMasterChecked(checked);
        setSelectedInvoices(
            selectedInvoices.map((invoice) => {
                invoice.checked = checked;
                return invoice;
            })
        )
    };

    const handleCheckbox = (id, checked) => {
        setSelectedInvoices(
            selectedInvoices.map((invoice) => {
                if (invoice.id === id) {
                    invoice.checked = checked;
                }
                return invoice;
            })
        )
    };
    const handleClick = () => {
        const checkedInvoices = selectedInvoices.filter((invoice) => invoice.checked === true);
        navigate('/bulk', {
            state: checkedInvoices,
        })
    }
    return (
        <div>
            <Modal
                show={props.open}
                onHide={props.handleCLose}
                size="lg"
                centered
            >
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="px-2"><input
                                type="checkbox"
                                className="form-check-input"
                                checked={isMasterChecked}
                                onChange={(e) => handleCheckboxMaster(e.target.checked)}
                            /></th>
                            <th>Invoice No.</th>
                            <th>Bill To</th>
                            <th>Due Date</th>
                            <th>Total Amt.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedInvoices.map((invoice) => (
                            <InvoiceRow
                                key={invoice.id}
                                invoice={invoice}
                                handleCheckbox={handleCheckbox}
                            />
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" className="mx-auto d-block mb-2 mb-md-4" onClick={handleClick}>Continue</Button>
            </Modal>
        </div>
    )
}

const InvoiceRow = ({ invoice, handleCheckbox }) => {
    return (
        <tr>
            <td className="px-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={invoice.checked}
                    id={invoice.id}
                    onChange={(e) => handleCheckbox(invoice.id, e.target.checked)}

                />
            </td>
            <td className="fw-normal">{invoice.invoiceNumber}</td>
            <td className="fw-normal">{invoice.billTo}</td>
            <td className="fw-normal">{invoice.dateOfIssue}</td>
            <td className="fw-normal">
                {invoice.currency}
                {invoice.total}
            </td>
        </tr>
    );
}