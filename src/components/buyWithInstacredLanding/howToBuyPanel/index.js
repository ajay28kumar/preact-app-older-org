// @flow
/** @jsx h */
import { h } from 'preact';
import ImagePanel from '../../imagePanel';
import { connect } from 'react-redux';

type Props = {
  title: string,
  desktopImgUrl: string,
  pageKey: string,
};

const HowToBuyPanel = ({ title, desktopImgUrl, pageKey }: Props) => {
  return (
    <ImagePanel
      pageKey={pageKey}
      id={'howToBuyPanel'}
      title={title}
      desktopImgUrl={desktopImgUrl}
    />
  );
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { home } = buyWithInstacred;
  const { howToBuy } = home;
  const { title, desktopImgUrl } = howToBuy;
  return {
    title,
    desktopImgUrl,
  };
};

export default connect(mapStateToProps)(HowToBuyPanel);
