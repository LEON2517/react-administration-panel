import ENV from './env';

const {
  STATIC_DIR, DEV_STATIC_DIR, BUILD_DIR, NODE_ENV,
} = ENV;

/* cpy assets */
const CopyStatic = {
  from: STATIC_DIR,
  to: BUILD_DIR,
};

const CopyDevStatic = {
  from: DEV_STATIC_DIR,
  to: BUILD_DIR,
};

const copyPluginSettings = [
  CopyStatic,
];

if (NODE_ENV === 'development') {
  copyPluginSettings.push(CopyDevStatic);
}

export default copyPluginSettings;
