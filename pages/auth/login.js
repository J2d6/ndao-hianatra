import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "@/styles/Home.module.css"
import {useFormik } from "formik";
import * as Yup from "yup";
import { loginValidation, passwordValidation } from "@/lib/signupLib";
import { useState } from "react";


export default function loginPage ( params ) {

    const [loginIsValid, setLoginIsValid] = useState(false) // state for login input styling despite of it's validation
    const [passwordIsValid, setPasswordIsValid] = useState(false) // state for password input styling despite of it's validation
    
    const formik = useFormik({
        validate : values => {
            const errors = {};
            let loginErrors = loginValidation(values.login);
            let passwordErors = passwordValidation(values.password);

            if (loginErrors) {
                errors.login = loginErrors;
                setLoginIsValid(true)
            }

            if (passwordErors) {
                errors.password = passwordErors;
                setPasswordIsValid(true)
            }

            return errors;
        },
        onSubmit :  values  => {
            alert(JSON.stringify(values))
        },
        initialValues : {
            login : "",
            password : ""
        }

    })
    return (
        <> 
            <Head>
                <title> NH - Login </title>
            </Head>
            <main className={styles.main}>
                <Container>
                    <h1 className="text-center"> Hiditra </h1>
                    <Row>
                        <Col lg = {3} md = {2} sm = {1}></Col>
                        <Col lg = {6} md = {8} sm = {10}>
                                <form 
                                    onSubmit={formik.handleSubmit}
                                >
                                    <fieldset>
                                        <div>
                                            <label className = "form-label"
                                                htmlFor="login"
                                            >
                                                Login
                                            </label>
                                            <input
                                                type="text"
                                                name = "login"
                                                id="login"
                                                className={`form-control ${ loginIsValid && "is-invalid" }`}
                                                {...formik.getFieldProps("login")}
                                            />
                                            {
                                                formik.errors.login ? 
                                                (<div className="form-text text-danger"> {formik.errors.login} </div>) : null
                                            }
                                        </div>
                                        <div>
                                            <label className="form-label" 
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name = "password"
                                                id="password"
                                                className = {`form-control ${ passwordIsValid && "is-invalid" }`}
                                                {...formik.getFieldProps("password")}
                                            />
                                            {
                                                formik.errors.password ? 
                                                (<div className="form-text text-danger"> {formik.errors.password} </div> ) : null
                                            }
                                        </div>
                                    </fieldset>
                                    <div>
                                        <Button type="submit" className="btn"> Signup </Button>
                                    </div>
                                </form>
                        </Col>
                        <Col lg = {3} md = {2} sm = {1}></Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}