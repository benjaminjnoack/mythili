var Commander = function () {
	process.argv.forEach(function (val, index, arr){
		console.log(index, val);
	});
};

module.exports = Commander;