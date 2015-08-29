module.exports = function* (next) {
  yield next;

  if (this.status !== 500) {
    return;
  }

  this.status = 500;

  switch (this.accepts('html', 'json')) {
    default:
    case 'html':
      this.type = 'html';
      yield this.render('500');
      break;

    case 'json':
      this.body = {
        message: 'Internal Server Error'
      };
      break;
  }
};
