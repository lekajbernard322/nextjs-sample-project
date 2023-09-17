import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/globals.css';
import {APP_NAME} from "../config/consts";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            {/* Head for setting up meta tags, title */}
            <Head>
                <title>{APP_NAME}</title>
            </Head>

            {/* Toolbar */}
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">{APP_NAME}</Navbar.Brand>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="my-4">
                <Row>
                    <Col>
                        {/* Here we render the actual page component */}
                        <Component {...pageProps} />
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4">
                <Container>
                    <p>&copy; 2023 My Company. All Rights Reserved.</p>
                </Container>
            </footer>
        </div>
    );
}

export default MyApp;