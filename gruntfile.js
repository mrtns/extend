
module.exports = function exec(grunt) {
  const DEV_PATH  = 'auth0-extend/develop/docs/assets';
  const BASE_PATH = 'auth0-extend/docs/assets';

  grunt.initConfig({
    aws_s3: {
      options: {
        accessKeyId:     process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        bucket:          process.env.S3_BUCKET,
        region:          process.env.S3_REGION,
        uploadConcurrency: 5,
        params: {
          CacheControl: 'max-age=300'
        },
      },
      clean: {
        files: [    
          { action: 'delete', dest: `${BASE_PATH}/api/creating-webtask-tokens.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/inspecting-webtask-tokens.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/revoking-webtask-tokens.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/streaming-logs.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/webtask-cache.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/webtask-creation.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/webtask-deletion.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/webtask-listing.yml` },
          { action: 'delete', dest: `${BASE_PATH}/api/webtask-storage.yml` },
  
          { action: 'delete', dest: `${BASE_PATH}/img/postman-collection.png` },
          { action: 'delete', dest: `${BASE_PATH}/img/postman-environment.png` },
          { action: 'delete', dest: `${BASE_PATH}/img/postman-import.png` },
          { action: 'delete', dest: `${BASE_PATH}/img/postman-sample.png` },

          { action: 'delete', dest: `${BASE_PATH}/js/jquery.sticky.js` },
          { action: 'delete', dest: `${BASE_PATH}/js/materialize.js` },
          { action: 'delete', dest: `${BASE_PATH}/js/o2c.html` },
          { action: 'delete', dest: `${BASE_PATH}/js/oauth2-redirect.html` },
          { action: 'delete', dest: `${BASE_PATH}/js/swagger-ui-bundle.js` },
          { action: 'delete', dest: `${BASE_PATH}/js/swagger-ui-standalone-preset.js` },
          { action: 'delete', dest: `${BASE_PATH}/js/swagger-ui.js` },
          
          { action: 'delete', dest: `${BASE_PATH}/main.css` },
          { action: 'delete', dest: `${BASE_PATH}/swagger-ui.css` },

          { action: 'delete', dest: `${BASE_PATH}/webtask-collection.json` },      
        ]
      },
      publish: {
        files: [
          {
            expand: true,
            cwd:    'docs/_site/assets',
            src:    ['**', '!*.map'],
            dest:   `${BASE_PATH}`
          }
        ]
      },
      clean_dev: {
        files: [
          { action: 'delete', dest: `${DEV_PATH}/api/creating-webtask-tokens.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/inspecting-webtask-tokens.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/revoking-webtask-tokens.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/streaming-logs.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/webtask-cache.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/webtask-creation.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/webtask-deletion.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/webtask-listing.yml` },
          { action: 'delete', dest: `${DEV_PATH}/api/webtask-storage.yml` },
  
          { action: 'delete', dest: `${DEV_PATH}/img/postman-collection.png` },
          { action: 'delete', dest: `${DEV_PATH}/img/postman-environment.png` },
          { action: 'delete', dest: `${DEV_PATH}/img/postman-import.png` },
          { action: 'delete', dest: `${DEV_PATH}/img/postman-sample.png` },

          { action: 'delete', dest: `${DEV_PATH}/js/jquery.sticky.js` },
          { action: 'delete', dest: `${DEV_PATH}/js/materialize.js` },
          { action: 'delete', dest: `${DEV_PATH}/js/o2c.html` },
          { action: 'delete', dest: `${DEV_PATH}/js/oauth2-redirect.html` },
          { action: 'delete', dest: `${DEV_PATH}/js/swagger-ui-bundle.js` },
          { action: 'delete', dest: `${DEV_PATH}/js/swagger-ui-standalone-preset.js` },
          { action: 'delete', dest: `${DEV_PATH}/js/swagger-ui.js` },
          
          { action: 'delete', dest: `${DEV_PATH}/main.css` },
          { action: 'delete', dest: `${DEV_PATH}/swagger-ui.css` },

          { action: 'delete', dest: `${DEV_PATH}/webtask-collection.json` },  
        ]
      },
      publish_dev: {
        files: [
          {
            expand: true,
            cwd:    'docs/_site/assets',
            src:    ['**', '!*.map'],
            dest:   DEV_PATH
          }
        ]
      },
    },
    run: {
      bundle_install: {
        options: {
            cwd:  'docs'
        },
        exec: 'bundle install'
      },
      jekyll_build: {
        options: {
            cwd:  'docs'
        },
        exec: 'jekyll build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('generate-site', [
    'run:bundle_install',
    'run:jekyll_build',
  ]);

  grunt.registerTask('cdn', [
    'generate-site',
    'aws_s3:clean',
    'aws_s3:publish'
  ]);

  grunt.registerTask('cdn-dev', [
    'generate-site',
    'aws_s3:clean_dev',
    'aws_s3:publish_dev'
  ]);
};