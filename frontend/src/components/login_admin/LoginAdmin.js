import React from "react";
import "../login_admin/loginAdmin.css";
import LogoQuizLogo from "../../logo-quiz.png";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {loginAdmin} from "../../services/AdminService";
import {useNavigate} from 'react-router-dom';

function LoginAdmin() {
    let navigate = useNavigate();

    function handleShowHome() {
        navigate("/");
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: values => {
            const adminData = new FormData;
            adminData.append('email', formik.values.email);
            adminData.append('password', formik.values.password);
            loginAdmin(adminData).then(res => {
                alert("Successfully logged in!");
                if(localStorage.getItem("guest") !== null) {
                    localStorage.removeItem("guest");
                }
                localStorage.setItem("admin", res.data.admin_id);
                navigate("/admin/logo");
            }).catch((err) => {
                alert("Wrong email or password. Try again!")
                console.log(err);
            })
        }
    })

    return(
        <div className="container-fluid bg-danger text-white">
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <h1>Login as Admin</h1>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <hr className="border-1"/>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <div className="col text-center">
                    <img className="opacity-25" src={LogoQuizLogo}/>
                </div>
                <div className="col">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email"
                                   name = "email"
                                   value={formik.values.email}
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                            />

                        </div>
                        <div className="row">
                            <br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password"
                                   name = "password"
                                   value={formik.values.password}
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                            />
                            {formik.touched.password && formik.errors.password ? <div className="text-warning">{formik.errors.password}</div> : null}
                        </div>
                        <div className="row">
                            <br/>
                        </div>
                        <button type="submit" className="btn btn-outline-light">SUBMIT</button>
                    </form>
                </div>
                <div className="col text-center">
                    <img className="opacity-25" src={LogoQuizLogo} />
                </div>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <button className="w-100 btn btn-light" onClick={handleShowHome}>HOME PAGE</button>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <hr className="border-1"/>
            </div>
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default LoginAdmin;
