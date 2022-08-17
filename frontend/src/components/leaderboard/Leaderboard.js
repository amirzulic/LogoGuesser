import React, {useEffect, useState} from "react";
import "../leaderboard/leaderboard.css";
import LogoQuizLogo from "../../logo-quiz.png";
import {getAllGuests} from "../../services/GuestService";
import {useNavigate} from "react-router-dom";

function Leaderboard() {
    let navigate = useNavigate();

    const [guests, setGuests] = useState(null);

    function handleShowHome() {
        navigate("/");
    }

    useEffect(() => {
        getAllGuests().then(res => {
            setGuests(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return(
        <div className="container-fluid bg-danger text-white">
            <div className="row">
                <br/>
            </div>
            <h1 className="text-center">Scoreboard</h1>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                <h2 className="text-center">Below you can see the current Logo Quiz Scoreboard!</h2>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <div className="col"></div>
                <div className="col">
                    <img className="h-50 listLogoHover" src={LogoQuizLogo} onClick={handleShowHome}/>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                <div className="col"></div>
                <div className="col">
                    <h3>List of players and their scores</h3>
                </div>
                <div className="col"></div>
            </div>
            <div className="row text-center">
                <div className="col"><b>PLAYER</b></div>
                <div className="col"></div>
                <div className="col"><b>SCORE</b></div>
            </div>
            {guests !== null ? guests.map((guest, i) =>
                <div className="row text-center">
                    <hr/>
                    <div className="col">{guest.name}</div>
                    <div className="col"></div>
                    <div className="col">{guest.score}</div>
                </div> ) : null }
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default Leaderboard;
