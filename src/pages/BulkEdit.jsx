import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { bulkEdit } from '../redux/invoicesSlice';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { BiSolidPencil } from 'react-icons/bi';
import ItemsEditModal from '../components/ItemsEditModal';
export default function BulkEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const invoices = location.state;
    const [checkedInvoices, setCheckedInvoices] = useState(invoices);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    console.log(checkedInvoices);


    const handleChange = (id, key, value) => {
        setCheckedInvoices(checkedInvoices.map((invoice, invoiceId) => {
            if (id === invoiceId) {
                return handleCalculateTotal({
                    ...invoice,
                    [key]: value,
                });
            }
            return invoice;
        }))
    }
    const handleItems = (id, key, value) => {
        setItems(prevItems => prevItems.map((item, itemId) => {
            if (id === itemId) {
                return handleCalculateTotal({
                    ...item,
                    [key]: value,
                });
            }
            return item;
        }));
        console.log(items);
    }
    

    const handleCalculateTotal = (invoice) => {
        let subTotal = 0;
        subTotal = invoice.items?.map(item => parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity))
        .reduce((acc, curr) => acc + curr, 0);

        const taxAmount = parseFloat(subTotal * (invoice.taxRate / 100)).toFixed(2);
        const discountAmount = parseFloat(subTotal * (invoice.discountRate / 100)).toFixed(2);

        const total = (subTotal - parseFloat(discountAmount) + parseFloat(taxAmount)).toFixed(2);

        return {
            ...invoice,
            subTotal: parseFloat(subTotal).toFixed(2),
            taxAmount,
            discountAmount,
            total,
        };
    }

    const handleSaveItem = (id) => {
        setCheckedInvoices(checkedInvoices.map((item) => {
            if (item.id === id) {
                return handleCalculateTotal({
                    ...item,
                    items,
                })
            }
            return item;
        }));
        setOpen(false);
        setItems([]);
    };


    const handleDeleteItem = (id) => {
        let item = [...items];

        item.splice(id, 1);
        setItems(item);
    };

    const handleSubmit = () => {
        dispatch(bulkEdit(checkedInvoices));
        navigate("/");
    }
    return (
        <Row>
            <Col className="mx-auto" xs={12} md={12} lg={12}>
                <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
                    <div className="d-flex flex-column">
                        <h3 className="fw-bold pb-2 pb-md-4">Bulk Edit</h3>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className=" text-center">Invoice Number</th>
                                    <th className=" text-center">Due Date</th>
                                    <th className=" text-center">Bill To</th>
                                    <th className=" text-center">Bill To Email Address</th>
                                    <th className=" text-center">Bill To Billing Address</th>
                                    <th className=" text-center">Bill From</th>
                                    <th className=" text-center">Bill From Email Address</th>
                                    <th className=" text-center">Bill From Billing Address</th>
                                    <th className=" text-center">Items</th>
                                    <th className=" text-center">Notes</th>
                                    <th className=" text-center">Currency</th>
                                    <th className=" text-center">Tax Rate</th>
                                    <th className=" text-center">Discount Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkedInvoices.map((invoice, id) => {
                                    return (
                                        <tr key={invoice.id}>

                                            <td className="fw-normal">
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.invoiceNumber}
                                                    name='invoiceNumber'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>

                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    type='date'
                                                    value={invoice.dateOfIssue}
                                                    name='dateOfIssue'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.billTo}
                                                    name='billTo'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    type='email'
                                                    value={invoice.billToEmail}
                                                    name='billToEmail'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.billToAddress}
                                                    name='billToAddress'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.billFrom}
                                                    name='billFrom'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    type='email'
                                                    value={invoice.billFromEmail}
                                                    name='billFromEmail'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.billFromAddress}
                                                    name='billFromAddress'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td className="d-flex align-items-center ">
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.items.length}
                                                    name='items'
                                                    required
                                                >

                                                </Form.Control>
                                                <Button
                                                    className='border border-dark mx-2'
                                                    onClick={() => {
                                                        setItems(invoice.items);
                                                        setOpen(true);
                                                    }}>
                                                    <BiSolidPencil />
                                                </Button>
                                                <ItemsEditModal
                                                open={open}
                                                onClose={() => setOpen(false)}
                                                onSaveItem={() => handleSaveItem(invoice.id)}
                                                items={items}
                                                handleItems={handleItems}
                                                handleDeleteItem={handleDeleteItem}
                                              />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    value={invoice.notes}
                                                    name='notes'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <Form.Select
                                                    className=" text-center bg-white border border-dark"
                                                    name="currency"
                                                    value={invoice.currency}
                                                    onChange={(e) =>
                                                        handleChange(id, e.target.name, e.target.value)
                                                    }
                                                    aria-label="Change Currency"
                                                >
                                                    <option value="$">USD (United States Dollar)</option>
                                                    <option value="£">GBP (British Pound Sterling)</option>
                                                    <option value="¥">JPY (Japanese Yen)</option>
                                                    <option value="$">CAD (Canadian Dollar)</option>
                                                    <option value="$">AUD (Australian Dollar)</option>
                                                    <option value="$">SGD (Singapore Dollar)</option>
                                                    <option value="¥">CNY (Chinese Renminbi)</option>
                                                    <option value="₿">BTC (Bitcoin)</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    type="number"
                                                    value={invoice.taxRate}
                                                    name='taxRate'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                    min={0.00}
                                                    max={100.00}
                                                    step={0.01}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    className=" text-center bg-white border border-dark"
                                                    type="number"
                                                    value={invoice.discountRate}
                                                    name='discountRate'
                                                    onChange={(e) => handleChange(id, e.target.name, e.target.value)}
                                                    required
                                                    min={0.00}
                                                    max={100.00}
                                                    step={0.01}
                                                />
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                        <Button
                            variant="primary mb-2 mb-md-4"
                            className=" px-4"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}
