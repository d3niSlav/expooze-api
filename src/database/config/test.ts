import { getConfig } from './index';

const testDatabaseConfig = getConfig('.env.test');

export default testDatabaseConfig;
