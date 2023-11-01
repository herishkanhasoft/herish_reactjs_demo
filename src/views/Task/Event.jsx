import React from "react";
import { Link, Outlet } from "react-router-dom";

const Event = () => {
  return (
    <>
      <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col text-center">
                        <h2>Events</h2>
                    </div>

                </div>
                <div className="row ">
                    <div className="col-lg-6">
                            <h3 className="text-center"><Link to="/event/eventcatagory">Event catagory</Link></h3>
                    </div>
                    <div className="col-lg-6">
                            <h3 className="text-center"><Link to="/event/eventList">Event list</Link></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <Outlet></Outlet>

                    </div>
                </div>
            </div>

        </div>
    </>
  );
};

export default Event;
