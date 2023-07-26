import { Component } from 'preact';
import withBaseComponent from '../../HOC/withBaseComponent';
import StorageErrorFallBackUI from '../../components/storageErrorFallBackUI';

class StorageError extends Component {
  pageKey = 'Incompatible Client';

  render() {
    return <StorageErrorFallBackUI />;
  }
}

export default withBaseComponent(StorageError);
