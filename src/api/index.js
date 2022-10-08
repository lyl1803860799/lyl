import request from '../utils/request';

const api = {
    getGit: (params) => request('git/list'),
    getTest: (params) => request('HistoryRecord/select'),
}

export default api;