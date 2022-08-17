import React from "react";
import "../landing_page/landingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoQuizLogo from "../../logo-quiz.png";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {saveGuest} from "../../services/GuestService";

function LandingPage() {
    let navigate = useNavigate();

    function handleShowLogIn() {
        navigate("/admin");
    }

    const formik = useFormik({
        initialValues: {
            username: ''

        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required')
        }),
        onSubmit: values => {
            let guest = {
                name: formik.values.username,
                score: 0
            }
            saveGuest(guest).then(res => {
                console.log(res.data);
                navigate("/list");
                localStorage.setItem("guest", res.data.id);
                if(localStorage.getItem("admin") !== null) {
                    localStorage.removeItem("admin");
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    })

    return(
        <div className="container-fluid bg-danger text-white">
            <div className="row">
                <br/>
            </div>
            <h1 className="text-center">Welcome to Logo Quiz!</h1>
            <div className="row text-center">
                <div className="col">
                    <p>You are an admin? Log in down below!</p>
                    <button className="btn btn-outline-warning" onClick={handleShowLogIn}>LOG IN AS ADMIN</button>
                </div>
            </div>
            <div className="row text-center">
                <br/>
            </div>
            <div className="row">
                <div className="col text-center">
                    <img src={LogoQuizLogo} />
                </div>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <div className="col">
                    <p>Enter a name and press the "GO!" button to play the game!</p>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="username"
                                   name = "username"
                                   value={formik.values.username}
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   placeholder={formik.touched.username && formik.errors.username ? "This field is required!" : null}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-light">GO!</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default LandingPage;
