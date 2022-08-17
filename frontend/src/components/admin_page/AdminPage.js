import React, {useEffect, useState} from "react";
import "../admin_page/adminPage.css";
import LogoQuizLogo from "../../logo-quiz.png";
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import {getAdmin} from "../../services/AdminService";
import {saveNewLogo} from "../../services/CompanyService";
import {useNavigate} from "react-router-dom";

function AdminPage() {
    let navigate = useNavigate();

    const [showAddLogo, setShowAddLogo] = useState(false);
    const [fullImageUrl, setFullImageUrl] = useState(null);
    const [blurImageUrl, setBlurImageUrl] = useState(null);
    const [admin, setAdmin] = useState(null);

    const uploadFullImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "guess-logo");

        axios.post("https://api.cloudinary.com/v1_1/dw3duxdxo/image/upload", formData)
            .then(res => {
                setFullImageUrl(res.data.url);
            });
    }

    const uploadBlurImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "guess-logo");

        axios.post("https://api.cloudinary.com/v1_1/dw3duxdxo/image/upload", formData)
            .then(res => {
                setBlurImageUrl(res.data.url);
            });
    }

    function handleLogOut() {
        if(localStorage.getItem("admin") !== null) {
            localStorage.removeItem("admin");
        }
        navigate("/");
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            full_photo: '',
            blur_photo: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        }),
        onSubmit: values => {
            let logo = {
                name: formik.values.name,
                full_photo: fullImageUrl,
                blur_photo: blurImageUrl,
                description: formik.values.description
            }
            saveNewLogo(logo).then(res => {
                console.log(res.data);
                alert("New logo added!")
                navigate("/leaderboard");
            }).catch((err) => {
                console.log(err);
            })


        }
    })

    useEffect(() => {
        if(localStorage.getItem("admin") !== null) {
            getAdmin(localStorage.getItem("admin")).then(res => {
                setAdmin(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    return(
        <div className="container-fluid bg-danger text-white">
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                    <h1>Admin Page</h1>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <div className="col">
                    <img src={LogoQuizLogo} />
                </div>
                <div className="col">
                    {admin !== null ?
                        <h3>Admin: {admin.username}</h3> : <h3>You are not logged in!</h3>
                    }
                    {admin !== null ?
                        <h4>Email: {admin.email}</h4> : null
                    }
                    <br/>
                    {localStorage.getItem("admin") !== null ?
                    <button className="btn btn-warning text-white" onClick={() => {setShowAddLogo(true)}}>OPEN NEW LOGO FORM</button> : null }
                    <div className="row">
                        <br/>
                    </div>
                    {localStorage.getItem("admin") !== null ?
                        <button className="btn btn-warning text-white" onClick={handleLogOut}>LOG OUT</button>
                     : null }
                    {showAddLogo === true && localStorage.getItem("admin") !== null ?
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <br/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name"
                                               placeholder="Name"
                                               name = "name"
                                               value={formik.values.name}
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="row">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <input type="file" id="full_photo"
                                               className="form-control"
                                               name = "full_photo"
                                               //value={formik.values.full_photo}
                                               onChange={(event) => uploadFullImage(event.target.files)}
                                        />
                                    </div>
                                    <div className="row">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <input type="file" id="blur_photo"
                                               className="form-control"
                                               name = "blur_photo"
                                               //value={formik.values.blur_photo}
                                               onBlur={formik.handleBlur}
                                               onChange={(event) => uploadBlurImage(event.target.files)}
                                        />
                                    </div>
                                    <div className="row">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="description"
                                               placeholder="Description"
                                               name = "description"
                                               //value={formik.values.description}
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <button type="submit" className="btn btn-warning text-white">SUBMIT</button>
                                </div>
                            </div>
                            <div className="row">
                                <br/>
                            </div>
                        </form> : null }
                </div>
            </div>
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default AdminPage;
