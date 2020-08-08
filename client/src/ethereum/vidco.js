import web3 from "./web3";
import Vidco from "./build/Vidco.json";

const instaance = new web3.eth.Contract(
  JSON.parse(Vidco.interface),
  "0x38bE7F1D26DD3625D73b01b5CD3ebdc69D0cb6Cf"
);

export default instaance;
