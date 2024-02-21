exports.install = function(){
  ROUTE('GET /', view_index);
  ROUTE('POST /', post_index);
  ROUTE('POST /login          *Users --> @login');
  ROUTE('POST /sign-up        *Users --> @sign-up');
  ROUTE('GET /logout          *Users --> @logout');
  ROUTE('POST /api/posts      *Posts --> @insert');
  ROUTE('GET /api/posts       *Posts --> @query');
}

function view_index(){
  let self = this;
  console.log(self.query);
  if (typeof self.query?.superpower == typeof '' && self?.query?.superpower != '' && self?.query?.superpower.length > 0) {
    let model = {
      superpower:  `Tu super poder es <br> <h2>${self.query.superpower}</h2>`
    }
    this.view('index', model);
  }else {
    this.view('index')
  }
}

function post_index(){
  let self = this;
  let model = {
    superheroeName:  `Bienvenido <br> <h2>${self.body.superheroeName}</h2>`
  }
  this.json(model);
}
