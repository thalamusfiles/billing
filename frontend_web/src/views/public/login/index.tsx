import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import bgRotate01 from '../../../assets/bg_rotate_01.jpeg';
import bgRotate02 from '../../../assets/bg_rotate_02.jpeg';
import bgRotate03 from '../../../assets/bg_rotate_03.jpeg';
import bgRotate04 from '../../../assets/bg_rotate_04.jpeg';
import { IconsDef } from '../../../commons/consts';
import { useI18N } from '../../../commons/i18';
import Footer from '../../../components/Footer';
import { LoginCtrl, LoginProvider } from './ctrl';
import { getLinkTo } from '../../../commons/route';

const bgImg = [bgRotate01, bgRotate02, bgRotate03, bgRotate04][Math.floor(Math.random() * 4)];

const LoginPage: React.FC = () => {
  const ctrl = new LoginCtrl();

  return (
    <LoginProvider value={ctrl}>
      <LoginPageProvided />
    </LoginProvider>
  );
};

const LoginPageProvided: React.FC = observer(() => {
  const __ = useI18N();

  return (
    <div style={{ backgroundImage: `url(${bgImg})` }} className="bgImageCover">
      <div style={{ backgroundColor: 'rgba(90,90,90,.8)', width: '100%', padding: 20 }} className="bgImageCover">
        <Row>
          <Col md={{ span: 4, offset: 4 }} sm={{ span: 6, offset: 3 }} className="text-center text-white mb-5 mt-5">
            <h2>{__('login.title')}</h2>
            <h4>{__('login.subtitle')}</h4>
          </Col>
        </Row>
        <Row>
          <Col xxl={{ span: 4, offset: 4 }} lg={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }} xs={12}>
            <Col xs={{ span: 10, offset: 1 }}>
              <Card id="login_card" border="info" className="cdShadow">
                <Card.Body>
                  <p>
                    <img src="/logo.png" alt="logo" id="logo" />
                    {__('login.cardindo')}
                  </p>
                  <Form></Form>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col sm={4}></Col>
                    <Col></Col>
                    <Col sm={4}>
                      <Button variant="primary" href={getLinkTo('login')}>
                        <FontAwesomeIcon icon={IconsDef.login} /> {__('login.action.login')}
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Col>
        </Row>
        <Footer center />
      </div>
    </div>
  );
});

export default LoginPage;
