import { CenterPageContent } from '../components/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <CenterPageContent>
        <h1>Home Page</h1>
      </CenterPageContent>
    </>
  );
};

export default HomePage;
