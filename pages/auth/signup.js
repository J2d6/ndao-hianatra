import { useFormik } from "formik";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineMailOutline, MdCall, MdPermIdentity, MdMailOutline , MdEnhancedEncryption } from "react-icons/md";
import { useState } from "react";
import { handleKeyDownNomLib, signupValidator, handleKeyDownDateNaissanceLib, nomValidation } from "@/lib/signupLib";



export default function SignUp ( params ) {
    const [nomIsValid, setNomIsValid] = useState(true);
    const [dateNaissanceIsValid, setDateNaissanceIsValid] = useState(true);
    const [typeCompteIsValid, setTypeCompteIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [contactIsValid, setContactlIsValid] = useState(true);
    const [loginIsValid, setLoginlIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const formik = useFormik({
        initialValues : {
            nom : "",
            prenom : "",
            dateNaissance : "",
            mail: "",
            contact : "",
            login : "",
            password : "",
            typeCompte : "eleve"
        },
        onSubmit : ( values ) => {
            alert(JSON.stringify(values))
        },
        validate : (values) => {
            const errors = signupValidator(values,
                setNomIsValid,
                setDateNaissanceIsValid,
                setTypeCompteIsValid,
                setEmailIsValid,
                setContactlIsValid,
                setLoginlIsValid,
                setPasswordIsValid    
            )

            return errors
        }
    })

    const handleKeyDownNom = e => {
        handleKeyDownNomLib(e, setNomIsValid)
    }
    const handleKeyDownDateNaissance = e => {
        handleKeyDownDateNaissanceLib(e, setNomIsValid)
    }

    return (
        <>
            <Head>
                <title> NH - Signup </title>
            </Head>
            <main>
                <h1 className="text-center mt-3 ">Créer un compte </h1>
                <Container>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mt-3 text-end">
                            <p className="form-text">
                                <a href="./login"> Vouz avez déjà un compte? Se connecter </a>
                            </p>
                        </div>
                        
                        <Row>
                            <Col  lg = {2} md = {2} sm = {1}></Col>
                            <Col lg = {8} md = {8} sm = {10}>
                            <fieldset className="mb-4 ">
                            <legend> A propos </legend>
                            <Row className=" g-3">
                                <Col lg = {6} md = {6} sm = {10} >
                                    <div className = {`input-group  mb-3 `}>
                                        <span className="input-group-text"> <MdPermIdentity /> </span>
                                        <input 
                                            className={`form-control ${ !nomIsValid && "is-invalid"}`}
                                            type="text"
                                            name="nom"
                                            placeholder="NOM *"
                                            {...formik.getFieldProps("nom")}

                                        />
                                    </div>
                                    {
                                            (formik.touched.nom && formik.errors.nom) ? (<div className="text-danger form-text"> {formik.errors.nom }</div>) : null
                                    }
                                </Col>
                                <Col lg = {6} md = {6} sm = {10}>
                                    <div className="input-group  mb-3">
                                        <span className="input-group-text"> <MdPermIdentity /> </span>
                                        <input 
                                            className="form-control"
                                            type="text"
                                            name="prenom"
                                            placeholder="Prenom"
                                            {...formik.getFieldProps("prenom")}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col lg = {6} md = {6} sm = {10}>
                                    <div className="input-group mt-3 mb-3">
                                        <span className="input-group-text"> <MdMailOutline /> </span>
                                        <input 
                                            className = {`form-control ${ !dateNaissanceIsValid && "is-invalid"}`}
                                            type = "date"
                                            name = "dateNaissance"
                                            placeholder = "Date de naissance"
                                            {...formik.getFieldProps("dateNaissance")}
                                        />
                                    </div>
                                    {
                                        (formik.touched.dateNaissance && formik.errors.dateNaissance) ? (<div className="from-text text-danger">{formik.errors.dateNaissance}</div>) : null
                                    }
                                </Col>
                                <Col lg = {6} md = {6} sm = {10} >
                                    <div className=" form-control input-group mt-3 mb-3" tabIndex={1}  > 
                                        <div class="form-check form-check-inline">
                                            <input className = {`form-check-input ${ !typeCompteIsValid && "is-invalid"}`} type="radio" name="typeCompte" id="compteEleve" value="eleve" {...formik.getFieldProps("typeCompte")}/>
                                            <label className = "form-check-label" htmlForor = "inlineRadio1">Mpianatra</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input className = {`form-check-input ${ !typeCompteIsValid && "is-invalid"}`} type="radio" name="typeCompte" id="compteProf" value="prof" {...formik.getFieldProps("typeCompte")} />
                                            <label className = "form-check-label" htmlFor="inlineRadio2">Mpampianatra</label>
                                        </div>
                                    </div>
                                    {
                                        (formik.touched.typeCompte && formik.errors.typeCompte) ? (<div className="from-text text-danger">{formik.errors.typeCompte}</div>) : null
                                    }
                                </Col>
                            </Row>
                        </fieldset>
                        <fieldset className="mt-3 mb-3">
                            <legend> Coordonnées </legend>
                            <Row g-3>
                                <Col lg = {6} md = {6} sm = {10} >
                                    <div className="input-group mt-3 mb-3">
                                        <span className="input-group-text"> <MdOutlineMailOutline /> </span>
                                        <input
                                            type="text"
                                            name="mail"
                                            placeholder="mail@service.com"
                                            className={`form-control ${ !emailIsValid && "is-invalid"}`}
                                            {...formik.getFieldProps("mail")}
                                        />
                                    </div>
                                    {
                                            (formik.touched.mail && formik.errors.mail) ? (<div className="text-danger form-text"> {formik.errors.mail }</div>) : null
                                    }
                                </Col>
                                <Col lg = {6} md = {6} sm = {10} >
                                    <div className="input-group mt-3 mb-3">
                                        <span className="input-group-text"> < MdCall /> </span>
                                        <input
                                            type="text"
                                            name="contact"
                                            placeholder="038 80 606 28"
                                            className={`form-control ${ !contactIsValid && "is-invalid"}`}
                                            {...formik.getFieldProps("contact")}
                                        />
                                    </div>
                                    {
                                            (formik.touched.contact && formik.errors.contact) ? (<div className="text-danger form-text"> {formik.errors.contact }</div>) : null
                                    }
                                </Col>
                            </Row>
                        </fieldset>
                        <fieldset className="mt-3 mb-3">
                            <legend> Logins </legend>
                            <Row className="g-3">
                                <Col>
                                    <div className="input-group mt-3 mb-3">
                                        <span className="input-group-text">@</span>
                                        <input 
                                            className = {`form-control ${ !loginIsValid && "is-invalid"}`}
                                            type="text"
                                            name="login"
                                            placeholder="Login"
                                            {...formik.getFieldProps("login")}
                                        />
                                    </div>
                                    {
                                            (formik.touched.login && formik.errors.login) ? (<div className="text-danger form-text"> {formik.errors.login }</div>) : null
                                    }
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col>
                                    <div className="input-group mt-3 mb-3">
                                        <span className="input-group-text">
                                            <MdEnhancedEncryption />
                                        </span>
                                        <input 
                                            className = {`form-control ${ !passwordIsValid && "is-invalid"}`}
                                            type="password"
                                            name="password"
                                            placeholder="Mot de passe"
                                            {...formik.getFieldProps("password")}
                                        />
                                    </div>
                                    {
                                            (formik.touched.password && formik.errors.password) ? (<div className="text-danger form-text"> {formik.errors.password }</div>) : null
                                    }
                                </Col>
                                    </Row>
                                </fieldset>
                            </Col>
                            <Col  lg = {2} md = {2} sm = {1}></Col>
                        </Row>
                        <Row>
                            <Col  lg = {2} md = {2} sm = {1}></Col>
                            <Col lg = {8} md = {8} sm = {10} >
                                <button className="w-100 btn btn-primary" type="submit"> S'inscrire </button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </main>
        </>
    )
}