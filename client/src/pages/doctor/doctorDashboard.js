import React, { useHistory, useContext, useState, useEffect } from "react";
import { AppContext } from "../../context api/Appcontext";
import { Card, Icon, Grid, GridColumn, Button } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const DoctorDashboard = (props) => {
  const { user } = useContext(AppContext);
  const [Docs, setDocs] = useState([]);
  const id = `/api/v1/requests/${user._id}`;
  console.log(id);
  const getDocs = async () => {
    if (user._id !== undefined) {
      try {
        const res = await axios.get(id);
        setDocs(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDocs();
  }, [user]);

  const joinMeet = async (data) => {
    const uid = uuidv4();
    try {
      await axios.put(`/api/v1/requests/${data.doc}`, {
        session: `/joincall/${uid}`,
        name: data.name,
        email2: data.email2,
      });
      props.history.push(`/joincall/${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const docsList = () =>
    Docs.map((doc) => {
      return (
        <div key={doc._id} style={{ margin: "5rem" }}>
          <Card fluid={true}>
            <Card.Content>
              <Card.Header content={doc.name} />
              <Card.Description content={doc.email2} />
              <div style={{ marginTop: "2px" }} className="ui" id="reqbtn">
                <Button
                  floated="right"
                  onClick={() =>
                    joinMeet({
                      doc: doc._id,
                      name: doc.name,
                      email2: doc.email2,
                    })
                  }
                  basic
                  color="green"
                >
                  Start Meeting
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    });

  return (
    <div>
      <h2 style={{ marginTop: "4rem", textAlign: "center" }}>Requests</h2>
      <div style={{ marginTop: "2rem" }}>{docsList()}</div>
    </div>
  );
};

export default DoctorDashboard;
