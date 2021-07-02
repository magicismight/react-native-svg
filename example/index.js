import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, { rootTag });
}
