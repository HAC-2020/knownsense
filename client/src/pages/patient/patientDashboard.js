import React, {
  useState,
  useEffect,
  useContext,
  useHistory,
  useCallback,
} from "react";
import { Card, Icon, Grid, GridColumn, Button } from "semantic-ui-react";
import axios from "axios";
import { AppContext } from "../../context api/Appcontext";
import vidco from "../../ethereum/vidco";
import web3 from "../../ethereum/web3";

const PatientDashboard = (props) => {
  const [docs, setDocs] = useState([]);
  const { user } = useContext(AppContext);

  const getDocs = async () => {
    try {
      const res = await axios.get("/api/v1/getdoctors");
      setDocs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  web3.eth.getAccounts().then(console.log);

  useEffect(() => {
    getDocs();
  }, []);

  const requestdoc = async (docId, publicAccount, I) => {
    try {
      console.log(user);
      const res = await axios.post(`/api/v1/requests/${docId}`, {
        name: user.name,
        email2: user.email,
        panic: user.panic,
        docId: docId,
      });
      console.log(res);
      document.getElementById(`reqbtn${I}`).style.display = "none";
      document.getElementById(`cancelbtn${I}`).style.display = "block";
      const join = document.getElementById(`joinbtn${I}`);
      var i;
      while (res.data._id === undefined) {
        console.log("waiting");
      }
      for (i = 0; i < 50; i++) {
        setTimeout(async () => {
          try {
            var newdata = await axios.get(`/api/v1/request/${res.data._id}`);
            if (newdata.data.session !== "NO") {
              join.style.display = "block";
              document.getElementById(`cancelbtn${I}`).style.display = "none";
              join.addEventListener("click", async () => {
                //Logic before joining meeting here ...
                const accounts = await web3.eth.getAccounts();
                await vidco.methods.pay(publicAccount).send({
                  from: accounts[0],
                  value: web3.utils.toWei("0.0061"), // 1hr Rs.180
                });
                //After Successfull execution run this code...
                props.history.push(newdata.data.session);
                join.style.display = "none";
                // document.getElementById(`reqbtn${I}`).style.display = "block";
              });
            }
          } catch (err) {
            console.log(err);
          }
        }, i * 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelreq = async (docId, I) => {
    try {
      await axios.delete(`/api/v1/requests/${docId}`);
      document.getElementById(`reqbtn${I}`).style.display = "block";
      document.getElementById(`cancelbtn${I}`).style.display = "none";
    } catch (error) {
      console.log(error);
    }
  };

  console.log(docs);

  const docsList = () =>
    docs.map((doc, i) => {
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
                      <div id={"reqbtn" + i}>
                        <Button
                          floated="right"
                          onClick={() =>
                            requestdoc(doc._id, doc.publicAccount, i)
                          }
                          basic
                          color="green"
                        >
                          Request
                        </Button>
                      </div>
                      <div id={"cancelbtn" + i} style={{ display: "none" }}>
                        <Button
                          floated="right"
                          onClick={() => cancelreq(doc._id, i)}
                          basic
                          color="red"
                        >
                          Cancel
                        </Button>
                      </div>
                      <div id={"joinbtn" + i} style={{ display: "none" }}>
                        <Button floated="right" basic color="blue">
                          Join
                        </Button>
                      </div>
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
