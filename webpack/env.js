/* eslint-disable */
import path from 'path';
import portfinderSync from 'portfinder-sync';

const PWD = process.cwd();

const startPort = 8080;
const openPort = portfinderSync.getPort(startPort);

const env = {
  // проверка на то что код только для браузера
  CLIENT: true,
  // подключение всяких штук для отладки
  DEBUG: false,
  // ??
  PROFILE: false,
  // для кармы запуск под ci server
  CI_ENV: false,
  // для кармы запуск реального chrome
  CHROME: false,
  // для добавления плагина в babel при запуске Storybook
  STORYBOOK: false,
  // очистка dist при сборке
  CLEAN_BUILD: false,
  // rood dir для проекта
  PWD,
  // окружение
  NODE_ENV: 'development',
  // тут исходники
  SRC_DIR: '',
  // тут папка сборки
  BUILD_DIR: '',
  // тут статические файлы которые перекидываются в сборку
  STATIC_DIR: '',
  // development static files, copied only in NODE_ENV == 'development'
  DEV_STATIC_DIR: '',
  // тут папка с шаблонами
  TEMPLATE_DIR: '',
  // тут папка для ковера
  COVERAGE_DIR: '',
  // папка с миксинами для  css
  MIXIN_DIR: '',
  // порт дев сервера
  DEV_PORT: openPort,
  // адрес api
  API_IP: 'localhost',
  // порт для api
  API_PORT: 8000,
  // пропуск минификации
  SKIP_MIN: false,
  // для генерации Source Map при минификации(Uglify по-умолчанию вырезает)
  SOURCEMAP_MIN: false,
  // попробовать сжать с prepack
  TRY_PREPACK: false,
};


function setEnv(key, realValue) {
  let value = realValue;
  if (!value) {
    value = '';
  }
  if (['CI_ENV', 'CHROME'].indexOf(key) !== -1) {
    env[key] = !!value;
    return;
  }
  env[key] = value;
}

function updateEnv(nextEnv) {
  Object.keys(env).forEach((key) => {
    if (key in nextEnv) {
      setEnv(key, nextEnv[key]);
    }
  });
}

let paths = {
  SRC_DIR: path.resolve(PWD, 'src'),
  BUILD_DIR: path.resolve(PWD, 'dist'),
  STATIC_DIR: path.resolve(PWD, 'static/'),
  DEV_STATIC_DIR: path.resolve(PWD, 'dev-static/'),
  TEMPLATE_DIR: path.resolve(PWD, 'html-templates'),
  COVERAGE_DIR: path.resolve(PWD, 'coverage'),
};
updateEnv(paths);

updateEnv(process.env);

paths = {
  MIXIN_DIR: path.resolve(env.SRC_DIR, 'styles'),
};
updateEnv(paths);

export default env;
