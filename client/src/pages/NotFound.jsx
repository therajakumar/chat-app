import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="page_404 pt-5">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 mx-auto text-center">
              <div
                className="four_zero_four_bg bg-center h-96 bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://utfs.io/f/32822ada-b056-4a7d-84fd-df09a38da399-cyb3te.gif)",
                }}
              >
                <h1 className="text-center text-8xl ">404</h1>
              </div>
              <div className="contant_box_404 mt-10">
                <h3 className="text-4xl mbs-4">Look like you&apos;re lost</h3>
                <p className="mb-4">
                  The page you are looking for is not available!
                </p>
                <Link to="/">
                  <Button>Go to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
