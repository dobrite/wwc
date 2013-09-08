var client = require('webdriverjs').remote({
    desiredCapabilities: {
        browserName: 'phantomjs'
    },
    //logLevel: 'silent'
});

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('Test example.com', function(){
    before(function(done) {
        client
            .init()
            .url('http://localhost:8080', function(){
                setTimeout(function () {
                    done();
                }, 1000);
            });
    });

    describe('Check homepage', function(){
        it('should see a #main div', function(done) {
            client
                .getText('#main', function(err, text) {
                    expect(err).to.be.null;
                    expect(text).to.be.equal("Stuff");
                    done();
                });
        });

        it('should see a #new div', function(done) {
            client
                .getText('#new', function(err, text) {
                    expect(err).to.be.null;
                    expect(text).to.be.equal("more stuff");
                }).call(done);
        });

    it('Github test',function(done) {
        client
            .url('https://github.com/')
            .getElementSize('.header-logo-wordmark', function(err, result) {
                expect(err).to.be.null;
                assert.strictEqual(result.height , 32);
                assert.strictEqual(result.width, 89);
            })
            .getTitle(function(err, title) {
                expect(err).to.be.null;
                assert.strictEqual(title,'GitHub · Build software better, together.');
            })
            .getElementCssProperty('class name','subheading', 'color', function(err, result){
                expect(err).to.be.null;
                assert.strictEqual(result, 'rgba(255,255,255,1)');
            })
            .call(done);
    });

    });

    after(function(done) {
        client.end();
        done();
    });
});
