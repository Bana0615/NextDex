import { Container, Row, Col } from "react-bootstrap";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
//Helpers
import { generateGithubLink } from "@/helpers/_silabs/generateGithubLink";

export default function AboutPage() {
  const githubLink = generateGithubLink(
    process.env.NEXT_PUBLIC_APP_GITHUB_OWNER,
    process.env.NEXT_PUBLIC_APP_GITHUB_REPO,
    { template: "feature-request-template.md" }
  );
  return (
    <>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
            <h2 className="fw-bold mb-3 text-center">
              About {process.env.NEXT_PUBLIC_APP_NAME}
            </h2>
            <Col lg={8}>
              <p className="lead fs-6">About section</p>
              <h4>Tech used to build this site</h4>
              <div>
                <ul>
                  <li>
                    <a
                      href="https://github.com/SiloCityLabs/SiloCityPages"
                      target="_blank"
                    >
                      SiloCityPages
                    </a>
                    {" - "} A framework by SiloCityLabs leveraging Bootstrap,
                    React, and Next.js for efficient static site development.
                    Deploy seamlessly to GitHub Pages.
                  </li>
                  <li>
                    <a href="https://pokenode-ts.vercel.app/" target="_blank">
                      Pokenode-ts
                    </a>
                    {" - "} A powerful Node.js wrapper for the PokéAPI with
                    built-in types
                  </li>
                  <li>
                    <a href="https://pages.github.com/" target="_blank">
                      GitHub Pages
                    </a>
                  </li>
                  <li>
                    <a href="https://nextjs.org/" target="_blank">
                      NextJs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://react-bootstrap.netlify.app/"
                      target="_blank"
                    >
                      React Bootstrap
                    </a>
                  </li>
                  <li>
                    <a href="https://git-scm.com/" target="_blank">
                      Git
                    </a>
                    {" - "} Version control software
                  </li>
                </ul>
              </div>
              <h4>Non tech used to build this site</h4>
              <div>
                <p>
                  Even though this site is made primarily by{" "}
                  <a href="https://github.com/OneBuffaloLabs">OneBuffaloLabs</a>{" "}
                  we did leverage alot of other tech and sources to help bring
                  this site to you:
                </p>
                <ul>
                  <li>
                    The data for this site comes from{" "}
                    <a href="https://pokeapi.co/" target="_blank">
                      PokéApi
                    </a>
                  </li>
                  <li>
                    The Pokémon type icons come from{" "}
                    <a
                      href="https://github.com/partywhale/pokemon-type-icons"
                      target="_blank"
                    >
                      partywhale
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://github.com/duiker101/pokemon-type-svg-icons"
                      target="_blank"
                    >
                      duiker101
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <h4>Contact Us</h4>
              <p>
                Have you found a bug, an error or just havea cool feature we
                should add to the site? Create a ticket on our Github{" "}
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  here
                </a>{" "}
                and we will look into it!
              </p>
            </Col>
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
