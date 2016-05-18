// @flow

const React = require('react');
const FS = require('fs');
const MarkdownComponent = require('../core/components/MarkdownComponent');
const Path = require('path');
const {app} = require('electron').remote;

module.exports = class KallaxComponent extends React.Component {

    render() {
        const file = Path.join(app.getPath('appData'), 'Kallax', 'index.md');
        const value = FS.readFileSync(file, 'utf8').toString();
        return <div className='KallaxComponent'>
            <MarkdownComponent enableX value={value} />
        </div>;
    }

};