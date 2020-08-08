import React, { useState, useEffect, useContext, useHistory } from "react";
import { Card, Icon, Grid, GridColumn, Button } from "semantic-ui-react";
import axios from "axios";
import { AppContext } from "../../context api/Appcontext";

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

  const docsList = () =>
    docs.map((doc) => {
      return (
        <div key={doc._id} style={{ marginTop: "4%" }}>
          <Grid>
            <Grid.Row>
              <GridColumn
                style={{ marginRight: "0px" }}
                floated="left"
                width={1}
              >
                <h3> {docs.indexOf(doc) + 1} </h3>
              </GridColumn>
              <Grid.Column floated="left" width={12}>
                <Card fluid={true}>
                  <Card.Content>
                    <Card.Header content={doc.name} />
                    <Card.Description content={doc.type} />
                    <div style={{ marginTop: "2px" }} className="ui">
                      <Button floated="right" basic color="green">
                        Request
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column width={3}>
                {doc.status ? (
                  <div>
                    <Icon color="green" name="circle" />
                  </div>
                ) : (
                    <div>
                      <Icon color="red" name="circle" />
                    </div>
                  )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    });

  return (
    <div>
      <h2 style={{ marginTop: "4rem", textAlign: "center" }}>Doctors</h2>
      <div style={{ marginTop: "2rem" }}>{docsList()}</div>
    </div>
  );
};

export default PatientDashboard;
