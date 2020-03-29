import axios from 'axios';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { getUserToken, getClientId } from './utls'

const executeRequest = async (method: string, url: string, data?: any) => {
    return axios({
        method: method,
        url: url,
        data,
        headers: {
            user_token: getUserToken(),
            clientId: getClientId()
        }
    });
};

export function executeGet(url: string) {
    return executeRequest('GET', url);
}

export function executePut(url: string, inputData: any) {
    return executeRequest('PUT', url, inputData);
}

export function executePost(url: string, inputData: any) {
    return executeRequest('POST', url, inputData);
}

export function executeDelete(url: string, inputData: any) {
    return executeRequest('DELETE', url, inputData);
}

export function excuteAuthRequest(url: string, inputData: any) {
    return axios({
        method: 'POST',
        url: url,
        data: inputData,
        headers: {
            x_request_id: uuidv4()
        }
    });
}
