import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { Check2Circle } from "react-bootstrap-icons";
import './EditPost.css'
import './style.css'

import Alert from 'react-bootstrap/Alert';

function EditPost()
{
    const [postData, setPostData] = useState(null);
    const { Formik } = formik;
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

    const [show, setShow] = useState(false);

    useEffect(() => {
            const fetchData = async () => await axios.get(`http://localhost:8080/posts/prod/${id}`)
            .then(function (response) {
                // handle success
                setPostData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            fetchData()
            .catch(console.error);
    }, [])

    function formSubmit(data)
    {
        if(postData.cat == "Pizza") {
            var fdata = {
                id: uuidv4(),
                title: data.title,
                desc: data.desc,
                var: [
                    {
                        name: "Regular",
                        price: data.rprice
                    },
                    {
                        name: "Large",
                        price: data.lprice
                    },
                    {
                        name: "Party",
                        price: data.pprice
                    }
                ],
                price: data.rprice,
                img: data.file
            }
        }
        else if (postData.cat != "Pizza")
        {
            var fdata = {
                id: uuidv4(),
                title: data.title,
                desc: data.desc,
                var: [
                    {
                        name: "Regular",
                        price: data.rprice
                    },
                    {
                        name: "Large",
                        price: data.lprice
                    },
                    {
                        name: "Party",
                        price: data.pprice
                    }
                ],
                price: data.price,
                img: data.file
            }
        }
        axios.post(`http://localhost:8080/posts/edit/${id}`, fdata)
            .then(function (response) {
                // handle success
                setShow(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [show]);

    const schema = yup.object().shape({
        title: yup.string().required(),
        desc: yup.string().required(),
        // price: yup.string().required(),
        // rprice: yup.string().required(),
        // lprice: yup.string().required(),
        // pprice: yup.string().required(),
        file: yup.string().required(),
    });

    return(
        <>
        <div className="col-lg-9 p-4">
            <Alert show={show} variant="success" className='d-flex gap-3 rounded-5 justify-content-center align-items-center position-fixed prodAlert'>
                <Check2Circle size={30}></Check2Circle>
                <h5 className='m-0'>Pizza Updated!</h5>
            </Alert>
            <div className="bg-white rounded-4 p-5 rightSec">
                <h3>Edit Pizza</h3>
            {postData ?
            <Formik
                validationSchema={schema}
                onSubmit={(data) => {
                    console.log(data);
                    //setFormData(data);
                    formSubmit(data);
                }}
                initialValues={{
                    title: postData.title,
                    desc: postData.desc,
                    price: postData.price,
                    rprice: postData.var[0].price,
                    lprice: postData.var[1].price,
                    pprice: postData.var[2].price,
                    file: postData.img,
                }}
                >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik101"
                        className="position-relative"
                        >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            isValid={touched.firstName && !errors.firstName}
                        />
                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik102"
                        className="position-relative"
                        >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="desc"
                            value={values.desc}
                            onChange={handleChange}
                            isValid={touched.desc && !errors.desc}
                        />

                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {postData.cat == "Pizza" ? <>

                    <Row>
                        <h4 className="m-4">Pizza Variants</h4>
                    </Row>
                    <div className="w-50 ms-auto me-auto">
                    <Row className="mb-3">
                        <Col md="6" className="align-items-center"> <h5>Regular</h5></Col>
                        <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik104"
                        className="position-relative"
                        >
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            name="rprice"
                            value={values.rprice}
                            onChange={handleChange}
                            isInvalid={!!errors.rprice}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.rprice}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationFormik105"
                        className="position-relative"
                        >
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6" className="align-items-center"> <h5>Large</h5></Col>
                        <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik104"
                        className="position-relative"
                        >
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            name="lprice"
                            value={values.lprice}
                            onChange={handleChange}
                            isInvalid={!!errors.lprice}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.lprice}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationFormik105"
                        className="position-relative"
                        >
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Col md="6" className="align-items-center"> <h5>Party</h5></Col>
                        <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik104"
                        className="position-relative"
                        >

                        <Form.Control
                            type="text"
                            placeholder="Price"
                            name="pprice"
                            value={values.pprice}
                            onChange={handleChange}
                            isInvalid={!!errors.pprice}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.pprice}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationFormik105"
                        className="position-relative"
                        >
                        </Form.Group>
                    </Row>

                    </div>

                    </> :

                    <Form.Group className="position-relative mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Price"
                        required
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                        {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    }

                    <Form.Group className="position-relative mb-3">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Picture URL"
                        required
                        name="file"
                        value={values.file}
                        onChange={handleChange}
                        isInvalid={!!errors.file}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit">Update</Button>
                    </Form>
                )}
            </Formik>
            : <p>Loading...</p>}
            </div>
            </div>
        </>
    );
}
export default EditPost