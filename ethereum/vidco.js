import web3 from "./web3";
import Vidco from "./build/Vidco.json";

const instaance = new web3.eth.Contract(
  JSON.parse(Vidco.interface),
  "0x1f9DaA00e2CE607Fd6E98C4E5748b8D5B08030E9"
);

export default instaance;
