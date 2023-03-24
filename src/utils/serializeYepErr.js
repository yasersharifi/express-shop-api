const serializeYupErr = (error) => {
	let errorsObject = undefined;
	if (error.name === 'ValidationError') {
		if (error && error.inner && error.inner.length) {
			errorsObject = error.inner.reduce((errors, currentValidation) => Object.assign(errors, {
				[currentValidation.path]: currentValidation.errors[0], //first error is enough for this demo
			}), {});
		}
	}
	
    return errorsObject;
};

module.exports = serializeYupErr;
