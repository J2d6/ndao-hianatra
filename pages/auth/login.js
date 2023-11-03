import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "@/styles/Home.module.css"
import {useFormik } from "formik";
import { loginValidation, passwordValidation } from "@/lib/signinLib";
import { useState } from "react";
import { MdLockOutline} from "react-icons/md";
import axios from "axios";
import { useRouter } from 'next/router';
import { accountNotFoundError, incorectPasswordError } from "@/config/configApp";






export default function loginPage ( params ) {

    const [loginIsValid, setLoginIsValid] = useState(false) // state for login input styling despite of it's validation
    const [passwordIsValid, setPasswordIsValid] = useState(false) // state for password input styling despite of it's validation
    const [loginAuthError, setLoginAuthError] = useState(null)
    const [passwordAuthError, setPasswordAuthError] = useState(null)
    const router = useRouter()

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
        onSubmit :  async (values)  => {
            setLoginIsValid(true)
            setPasswordIsValid(true)
            setLoginAuthError(null)
            setPasswordAuthError(null)

            try {

                let headersList = {
                    "Accept": "*/*",
                    "Content-Type": "application/json" 
                }

                let bodyContent = JSON.stringify({
                    "login": values.login,
                    "password" : values.password,
                    "path" : "/"
                });

                let reqOptions = {
                    url: `/api/auth/login`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                }

                let response = await axios.request(reqOptions);
                const data = response.data
                
                // message : if credentials problem , error if erros, redirect if succeded
                if (data.redirect) {
                    router.push(data.redirect)
                } else {
                    if (data.message) {
                        if (data.message == accountNotFoundError.message) {
                            setLoginIsValid(false)
                            setLoginAuthError("Aucun compte correspondant")
                        } 
                        if (data.message == incorectPasswordError.message) {
                            setPasswordIsValid(false)
                            setPasswordAuthError("Mot de passe incorrecte")
                        } 
                    }
                }
                throw new Error(data.error)
                
            } catch (error) {
                throw new Error(error.message)
            }

                
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
                    <h1 className="text-center mb-3"> 
                        <span className={`icon-border-rounded-dark `}>
                            <MdLockOutline />    
                        </span>
                        
                    </h1>
                    <Row>
                        <Col lg = {4} md = {3} sm = {1} ></Col>
                        <Col lg = {4} md = {6} sm = {10} >
                                <form 
                                    onSubmit={formik.handleSubmit}
                                >
                                    <fieldset>
                                        <div>
                                            <label className = "form-label mb-2"
                                                htmlFor="login"
                                            >
                                                Login
                                            </label>
                                            <input
                                                type="text"
                                                name = "login"
                                                id="login"
                                                className={`form-control ${ loginIsValid && "is-invalid" } mt-2 mb-3`}
                                                {...formik.getFieldProps("login")}
                                            />
                                            {
                                                formik.errors.login ? 
                                                (<div className="form-text text-danger"> {formik.errors.login} </div>) : null
                                            }
                                            {
                                                loginAuthError ? 
                                                (<div className="form-text text-danger"> {loginAuthError} </div>) : null
                                            }
                                        </div>
                                        <div>
                                            <label className="form-label mb-2" 
                                                htmlFor="password"
                                            >
                                                Mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                name = "password"
                                                id="password"
                                                className = {`form-control ${ passwordIsValid && "is-invalid" } mt-2 mb-3`}
                                                {...formik.getFieldProps("password")}
                                            />
                                            {
                                                formik.errors.password ? 
                                                (<div className="form-text text-danger"> {formik.errors.password} </div> ) : null
                                            }
                                            {
                                                passwordAuthError ? 
                                                (<div className="form-text text-danger"> {passwordAuthError} </div>) : null
                                            }
                                        </div>
                                    </fieldset>
                                    <div className="mb-2">
                                        <Button type="submit" className="btn mt-3 w-100"> Se connecter </Button>
                                    </div>
                                    <div className="mt-3">
                                        <p className="form-text">
                                            <a href="./signup"> Nouveau? Créez un compte</a>
                                        </p>
                                    </div>
                                </form>
                        </Col>
                        <Col lg = {4} md = {3} sm = {1} ></Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}