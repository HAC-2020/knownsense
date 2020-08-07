import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientDashboard = () => {
  const [docs, setDocs] = useState([]);

  const getDocs = async () => {
    try {
      const res = await axios.get("/api/v1/getdoctors");
      // console.log(res.data);
      setDocs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  console.log(docs);

  const doctorsList = () => {
    docs.map((doc) => {
      console.log("doc", doc);
      return (
        <div key={doc._id}>
          <h3>doc.name</h3>
        </div>
      );
    });
  };
  return (
    <div>
      <h2>Doctors</h2>
      <div>{doctorsList()}</div>
    </div>
  );
};

export default PatientDashboard;
