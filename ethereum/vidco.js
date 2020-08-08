import web3 from "./web3";
import Vidco from "./build/Vidco.json";

const instaance = new web3.eth.Contract(
  JSON.parse(Vidco.interface),
  "0xe77B0dcF8DD822D6c618EE502321Fce9ce9965d5"
);

export default instaance;
