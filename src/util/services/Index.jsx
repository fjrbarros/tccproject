import Api from '../api/Index';

export const TOKEN_KEY = '';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export function updateDefaultData(store) {
	Api.get('/dados')
	.then(resp => {
		store.dispatch({
            type: 'UPDATE_DATA_ENUM',
            data: resp.data
        });
	})
	.catch(error => {
		console.error(error.response.data.message);
	});
}