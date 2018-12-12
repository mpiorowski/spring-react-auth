export const PROFILE = process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev';
export const API_BASE_URL = PROFILE === 'dev' ? 'http://localhost:9000' : "http://ec2-18-184-206-176.eu-central-1.compute.amazonaws.com:9001";
export const ACCESS_TOKEN = 'jwtToken';