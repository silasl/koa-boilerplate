module.exports = function* (next) {
  yield next;

  if (this.status !== 404) {
    return;
  }

  this.status = 404;

  switch (this.accepts('html', 'json')) {
    default:
    case 'html':
      this.type = 'html';
      yield this.render('404');
      break;

    case 'json':
      this.body = {
        message: 'Page Not Found'
      };
      break;
  }
};
