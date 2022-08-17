import React, {useEffect, useState} from "react";
import "../single_logo/singleLogo.css";
import LogoQuizLogo from "../../logo-quiz.png";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate, useParams} from "react-router-dom";
import {loadSingleCompany} from "../../services/CompanyService";
import {getGuest, updateGuestScore} from "../../services/GuestService";

function SingleLogo() {
    let {id} = useParams();

    let navigate = useNavigate();

    const [company, setCompany] = useState(null);
    const [guest, setGuest] = useState(null);
    const [correct, setCorrect] = useState(false);

    const formik = useFormik({
        initialValues: {
            logo: ''

        },
        validationSchema: Yup.object({

        }),
        onSubmit: values => {
            alert(formik.values.logo);
        }
    })

    function checkCompany(guess) {
        if(localStorage.getItem("guest") !== null)  {
            if(company !== null) {
                if(guess === company.name) {
                    alert("Correct! It is " + guess + "!" + "\n" + "Here is a fun fact...")
                    setCorrect(true);
                    if(guest !== null) {
                        let newScore = parseInt(guest.score) + 10
                        let newGuest = {
                            'name' : guest.name,
                            'score' : newScore.toString()
                        }
                        updateGuestScore(guest.id, newGuest).then(res => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(guest.id, newGuest, err);
                        })
                    }
                } else {
                    alert("Wrong!");
                }
            }
        } else {
            alert("You are not entered as a player!");
            navigate("/");
        }
    }

    useEffect(() => {
        loadSingleCompany(id).then(res => {
            setCompany(res.data);
        }).catch((err) => {
            console.log(err);
        })
        if(localStorage.getItem("guest") !== null) {
            getGuest(localStorage.getItem("guest")).then(res => {
                setGuest(res.data);
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
                {correct === false ?
                <h1 className="text-center">Give your best shot!</h1> :
                <h1 className="text-center">Congratulations! You guessed it right!</h1> }
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <div className="col"></div>
                {company !== null && correct === false ?
                    <div className="col text-center">
                        <img src={company.blur_photo} />
                    </div> : null }
                {company !== null && correct === true ?
                    <div className="col text-center">
                        <img src={company.full_photo} />
                        <br/>
                        <p>{company.description}</p>
                    </div> : null
                }
                <div className="col"></div>
            </div>
            <div className="row">
                <br/>
            </div>
            {correct === false ?
            <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                    <h5 className="text-uppercase">
                        Enter your guess below!
                    </h5>
                </div>
                <div className="col"></div>
            </div> : null }
            <div className="row">
                <br/>
            </div>
            {correct === false ?
            <form>
                <div className="row">
                    <div className="col"></div>
                    <div className="col text-center">
                        <input type="text" className="form-control"
                               id = "logo" name = "logo"
                               value={formik.values.logo}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col"></div>
                </div>
            </form> : null }
            <div className="row">
                <br/>
            </div>
            {correct === false ?
            <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                    <button type="button" className="btn btn-outline-light" onClick={() => {checkCompany(formik.values.logo)}}>TRY!</button>
                </div>
                <div className="col"></div>
            </div> :
                <div className="row">
                    <div className="col"></div>
                    <div className="col text-center">
                        <button type="button" className="btn btn-outline-light" onClick={() => {navigate("/list")}}>GO BACK TO GUESSING</button>
                    </div>
                    <div className="col"></div>
                </div> }
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default SingleLogo;
