import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the item endpoints:', () => {
  it('It should create an item', (done) => {
    const item = {
      title: 'First Awesome item',
      description: 'This is the awesome item'
    };
    chai.request(app)
      .post('/api/v1/items')
      .set('Accept', 'application/json')
      .send(item)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: item.title,
          description: item.description
        });
        done();
      });
  });

  it('It should not create an item with incomplete parameters', (done) => {
    const item = {
      description: 'This is the awesome item'
    };
    chai.request(app)
      .post('/api/v1/items')
      .set('Accept', 'application/json')
      .send(item)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all items', (done) => {
    chai.request(app)
      .get('/api/v1/items')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('description');
        done();
      });
  });

  it('It should get a particular item', (done) => {
    const itemId = 1;
    chai.request(app)
      .get(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('description');
        done();
      });
  });

  it('It should not get a particular item with invalid id', (done) => {
    const itemId = 8888;
    chai.request(app)
      .get(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find Item with the id ${itemId}`);
        done();
      });
  });

  it('It should not get a particular item with non-numeric id', (done) => {
    const itemId = 'aaa';
    chai.request(app)
      .get(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update an item', (done) => {
    const itemId = 1;
    const updateditem = {
      id: itemId,
      title: 'Updated Awesome item',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .send(updateditem)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updateditem.id);
        expect(res.body.data.title).equal(updateditem.title);
        expect(res.body.data.description).equal(updateditem.description);
        done();
      });
  });

  it('It should not update an item with invalid id', (done) => {
    const itemId = '9999';
    const updateditem = {
      id: itemId,
      title: 'Updated Awesome item again',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .send(updateditem)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find Item with the id: ${itemId}`);
        done();
      });
  });

  it('It should not update an item with non-numeric id value', (done) => {
    const itemId = 'ggg';
    const updateditem = {
      id: itemId,
      title: 'Updated Awesome item again',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .send(updateditem)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete an item', (done) => {
    const itemId = 1;
    chai.request(app)
      .delete(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete an item with invalid id', (done) => {
    const itemId = 777;
    chai.request(app)
      .delete(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Item with the id ${itemId} cannot be found`);
        done();
      });
  });

  it('It should not delete a item with non-numeric id', (done) => {
    const itemId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/items/${itemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});