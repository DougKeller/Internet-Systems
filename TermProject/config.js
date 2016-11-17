var dependencyPaths = [
  './config/views',
  './config/database',
  './config/routes',
  './config/logger',
  './config/parsers'
];

dependencyPaths.forEach(path => require(path));
