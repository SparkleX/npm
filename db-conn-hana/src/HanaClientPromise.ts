
export function hanaPromiseConnect(client:any):Promise<void> {
	return new Promise((resolve, reject) =>
		client.connect(function (err) {
		if (err) {
			console.log('hanaPromiseConnect.error');
			reject(err);
		}else {
			resolve();
		}
	}));
}