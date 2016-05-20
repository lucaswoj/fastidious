// @flow

const React = require('react');
const renderMarkdown = require('marked');
const FS = require('fs');
const Babel = require('babel-core');
const vm = require('vm');
const Path = require('path');

module.exports = class MarkdownView extends React.Component {

    props: {
        value: string;
        enableX?: boolean;
    };

    state: void;

    render() {
        if (this.props.enableX) {
            const jsSource = Babel.transform(this.props.value, this.getBabelOptions()).code;
            return vm.runInNewContext(jsSource, this.getContext());

        } else {
            /* eslint-disable react/no-danger */
            return <div dangerouslySetInnerHTML={{__html: renderMarkdown(this.props.value)}} />;
            /* eslint-enable react/no-danger */
        }
    }

    getBabelOptions() {
        const file = Path.join(__dirname, '../../../.babelrc');
        return JSON.parse(FS.readFileSync(file, 'utf8'));
    }

    getContext() {
        return {
            React: require('react'),
            ListView: require('./ListView'),
            GitHubIssue: require('../../github/GitHubIssue'),
            GitHubIssueView: require('../../github/GitHubIssueView')
        };
    }

};