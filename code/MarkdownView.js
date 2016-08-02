// @flow

const React = require('react');
const renderMarkdown = require('marked');
const FS = require('fs');
const Babel = require('babel-core');
const vm = require('vm');
const Path = require('path');

const babelOptions = JSON.parse(
    FS.readFileSync(Path.join(__dirname, '../.babelrc'), 'utf8')
);

module.exports = class MarkdownView extends React.Component {

    props: { value: string; };

    state: void;

    shouldComponentUpdate(nextProps: {value: string}) {
        return nextProps.value !== this.props.value;
    }

    render() {
        return vm.runInThisContext(
            Babel.transform(`
                const React = require('react');
                const GithubNotification = require('${Path.join(__dirname, 'GithubNotification')}');
                const PromiseView = require('${Path.join(__dirname, 'PromiseView')}');
                <div>${unescape(renderMarkdown(this.props.value))}</div>
            `, babelOptions).code
        );
    }

};

function unescape(string) {
    return string.replace(/&gt;/g, '>');
}
