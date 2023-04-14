import Calendar from "../components/Calendar";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO title="Calendar" />
      <Header />
      <Calendar />
    </>
  );
}
