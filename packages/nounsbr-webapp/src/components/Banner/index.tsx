import classes from './Banner.module.css';
import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import nounsbr_banner from '../../assets/nounsbr_banner.jpg';
import NounBR from '../NounBR';
import { Trans } from '@lingui/macro';

const Banner = () => {
  return (
    <Section fullWidth={false} className={classes.bannerSection}>
      <Col lg={6}>
        <div className={classes.wrapper}>
          <h1>
            <Trans>ONE NOUNBR,</Trans>
            <br />
            <Trans>EVERY 15 MIN,</Trans>
            <br />
            <Trans>FOREVER.</Trans>
          </h1>
        </div>
      </Col>
      <Col lg={6}>
        <div style={{ padding: '2rem' }}>
          <NounBR imgPath={nounsbr_banner} alt="nounbr" />
        </div>
      </Col>
    </Section>
  );
};

export default Banner;
