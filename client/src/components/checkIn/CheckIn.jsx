import "./checkIn.css";
import React from "react";
import { useForm } from "react-hook-form";

const CheckIn = () => {
  const { register, handleSubmit } = useForm();

  const handleData = (data) => console.log(data);

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">

        <div className="key-holder-section">

          <h2>Key Holder CheckIn/out</h2>

          <input className="checkIn-input" />

          <div className="button-group">
            <button className="checkIn-button">CheckIn</button>
            <button className="checkIn-button">CheckOut</button>
          </div>

          <hr />
        </div>

        <div className="non-key-holder-section">

          <h2>Non Key Holder CheckIn/out</h2>

          <form onSubmit={handleSubmit(handleData)}>

            <div className="form-group">
              <label>Name</label>
              <input className="checkIn-input" name="name" {...register("name")} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="checkIn-input" name="email" {...register("email")} />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="number" className="checkIn-input" name="phone_number" {...register("phone_number")} />
            </div>

            <div className="form-group">
              <label>Slack User</label>
              <input type="text" className="checkIn-input" name="slack_user" {...register("slack_user")} />
            </div>


            <button className="checkIn-button submit-btn">Submit</button>
          </form>

          <div className="key-holder-section">

            <input className="checkIn-input" />

            <div className="button-group">
              <button className="checkIn-button">CheckOut</button>
            </div>

            <hr />
          </div>

        </div>
        <hr />
      </div>
    </div>
  );
};

export default CheckIn;
