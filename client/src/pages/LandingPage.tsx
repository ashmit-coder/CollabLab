import { isAuthenticated } from "../Controllers/TokenFuncitons";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar authenticated={isAuthenticated()} />
      Landing page
    </div>
  );
}
