module.exports = () =>
    require('approvals')
        .configure({
            reporters: ['kdiff3']
        })
        .mocha('./test/approvals');
