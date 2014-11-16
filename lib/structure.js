var glob = require('glob');
var fs = require('fs');
var path = require('path');
var parser = {};
var defaultRoot = './../projects';
var _ = require('lodash');

module.exports = function(root) {
  root = root || defaultRoot;

  function dirsByPath(path, mask) {
    mask = mask || '*';

    return glob
      .sync(path.join(path, mask))
      .map(function(dir) {
        var stats = fs.statSync(dir);
        if (!stats.isDirectory()) {
          return '';
        } else {
          return path.basename(dir);
        }
      })
      .filter(function(dir) { return dir; });
  }

  function filesByPath(path, mask) {
    mask = mask || '*';

    return glob
      .sync(path.join(path, mask))
      .map(function(file) {
        var stats = fs.statSync(file);
        if (stats.isDirectory()) {
          return path.basename(file);
        } else {
          return '';
        }
      })
      .filter(function(file) { return file; });
  }

  return {
    load: function load() {
      var projectNames = dirsByPath(root, '*');

      projectNames.forEach(function(name) {
        this.projects = {
          name: name,
          sections: this.getSections(name)
        };
      }.bind(this));
    },

    getSections: function getSection(projectName) {
      var sectionNames = dirsByPath(path.join(root, projectName));
      var sections = [];

      sectionNames.forEach(function(name) {
        sections.push({
          name: name,
          tests: this.getTests(name)
        });
      }.bind(this));

      return sections;
    },

    getTests: function getTests(sectionName) {
      var testNames = dirsByPath(path.join(root, projectName));

      return testNames;
    }
  }
};