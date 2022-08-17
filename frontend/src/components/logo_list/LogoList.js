import React, {useEffect, useState} from "react";
import "../logo_list/logoList.css";
import Logos from "../../logos.png";
import {useNavigate} from "react-router-dom";
import {loadCompanies} from "../../services/CompanyService";
import {getGuest} from "../../services/GuestService";

function LogoList() {
    let navigate = useNavigate();

    const [companies, setCompanies] = useState(null);
    const [guest, setGuest] = useState(null)

    function handleShowLogo(id) {
        navigate("/logo/" + id);
    }

    function handleGiveUp() {
        localStorage.removeItem("guest");
        navigate("/");
    }

    useEffect(() => {
        loadCompanies().then(res => {
            setCompanies(res.data);
            console.log(res.data);
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
                <h1 className="text-center">Tap on a Logo to start guessing it!</h1>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <button className="btn btn-outline-warning" onClick={handleGiveUp}>GIVE UP!</button>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <hr className="border-1" />
            </div>
            <div className="row text-center">
                <div className="col">
                    {guest !== null ?
                        <b>Name: <i>{guest.name}</i></b> : null }
                </div>
                <div className="col"></div>
                <div className="col">
                    {guest !== null ?
                        <b>Score: <i>{guest.score}</i></b> : null }
                </div>
            </div>
            <div className="row">
                <hr className="border-1" />
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                {companies !== null ? companies.map((company, i) =>
                <div className="col-3 pt-4">
                    <img className="listLogoHover card" onClick={() => {handleShowLogo(company.id)}} src={company.blur_photo}/>
                </div> ) : null }
            </div>
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default LogoList;
