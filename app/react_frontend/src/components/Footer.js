import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterComponent = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Footer
        style={{
          backgroundColor: "#001529",
          color: "#ffffff",
          padding: "40px 20px",
          textAlign: "left",
        }}
      >
        <Row gutter={[32, 32]}>
          {/* About Us Section */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff" }}>
              About Us
            </Title>
            <Text style={{ color: "#cccccc" }}>
              We are committed to delivering the best products and services to
              our customers.
            </Text>
            <br />
            <Text style={{ color: "#cccccc" }}>
              <Link href="#" style={{ color: "#40a9ff" }}>
                Learn more about us
              </Link>
            </Text>
          </Col>

          {/* Quick Links Section */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff" }}>
              Quick Links
            </Title>
            <ul style={{ padding: 0, listStyle: "none", color: "#cccccc" }}>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff" }}>
              Contact Us
            </Title>
            <Text style={{ color: "#cccccc" }}>Email: support@example.com</Text>
            <br />
            <Text style={{ color: "#cccccc" }}>Phone: +1 (123) 456-7890</Text>
            <br />
            <Text style={{ color: "#cccccc" }}>
              Address: 123 Main Street, City, Country
            </Text>
          </Col>

          {/* Social Media Section */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff" }}>
              Follow Us
            </Title>
            <ul style={{ padding: 0, listStyle: "none", color: "#cccccc" }}>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: "#40a9ff" }}>
                  LinkedIn
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: "#ffffff", opacity: 0.2 }} />
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Text style={{ color: "#cccccc" }}>
              © {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </Text>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};

export default FooterComponent;
